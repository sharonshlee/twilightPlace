const express = require("express");
const bodyParser = require("body-parser");
const { notifyBySMS, notifyByEmail } = require("../notification");
const { addOrder } = require("../db/order-queries");
const { addOrderDetails } = require("../db/order_details-queries");
const { getTotalWaitTime, getRecommendations } = require("../db/dish-queries");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/confirm", async (req, res) => {
  const { dishes, phoneNumber, customerName, customerEmail } = req.body;
  const placedAt = new Date();

  const orderResult = await addOrder(
    placedAt,
    customerName,
    phoneNumber,
    customerEmail
  );
  const orderId = orderResult.id;
  const dishIds = [];
  for (const dish of dishes) {
    const { dishId, quantity } = dish;
    dishIds.push(dishId);
    await addOrderDetails(orderId, dishId, quantity);
  }

  const ownerPhoneNumber = process.env.OWNER_PHONE;
  // Notify owner an order(s) has been placed from the same customer.
  await notifyBySMS(
    `Order ID - ${orderId} has been placed.`,
    ownerPhoneNumber
  ).catch((err) => console.log(err));

  const totalWaitTime = (await getTotalWaitTime(orderId)) * 1.2; //+20% cooking time

  // Notify customer the wait time for pick up.
  await notifyBySMS(
    `Your food will be ready in ${totalWaitTime} minute(s)`,
    phoneNumber
  ).catch((err) => console.log(err));

  // Notify customer automatically after wait time + 20% buffer time when the food is ready.
  setTimeout(async () => {
    await notifyBySMS(`Your food is ready for pick up!`, phoneNumber).catch(
      (err) => console.log(err)
    );
    res.end();
  }, (totalWaitTime * 60 * 1000) / 1000); // Minutes * 60s * 1000ms(/ 1000 for testing only)

  if (customerEmail) {
    const subject = "Thank you for you order from Twilight Place";
    let message = `<p>Hello ${customerName},</p><p>Thank you for your order with Twilight Place and we hope to see you again!</p> 
<p>Please check out our recommendations for your future visit.</p>
<p>Thanks again and do visit soon!</p>`;

    const recommendations = await getRecommendations(dishIds);
    message += "<ul>";
    for (const recommendation of recommendations) {
      message += `<li style='list-style:none;'><div><b>${recommendation.name}</b></div><img src='${recommendation.img_url}' width='320' /></li>`;
    }
    message += "</ul>";
    //send thank you email to customer for future food recommendations if email is not null.
    await notifyByEmail(customerEmail, subject, message).catch((err) =>
      console.log(err)
    );
  }
});

module.exports = router;
