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

  //// SMS
  // Notify owner an order(s) has been placed from the same customer.
  await notifyBySMS(
    `Order ID: ${orderId} has been placed.`,
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
  //// End SMS

  //// EMAIL
  // Send thank you email to customer and food recommendations if email is not null.
  if (customerEmail) {
    const subject = "Thank you for you order from Twilight Place";
    let message = `<div style="text-align: center; background-color:powderblue;">
                  <h1>Hello <b>${customerName}</b>,</h1>
                  <p>Thank you for ordering with Twilight Place and we hope to see you again!</p> 
                  <p>Please check out our menu recommendations for your future visit.</p>
                  <p>Thanks again and do visit soon!</p>
                  <p>~Twilight Place</p>
                  <p>For your next order, we recommend :</p>`;

    const recommendations = await getRecommendations(dishIds);
    message += "<ul>";
    for (const recommendation of recommendations) {
      message += `<li style='list-style:none;'>
<h1>${recommendation.name}</h1>
<div><img src='${recommendation.img_url}' width='500' height='500' />
<p>${recommendation.description}</p></div></li>
`;
    }
    message += "</ul>";
    message += `<hr style='border-top: 2px solid gray'/>
                <footer style='font-size: 10px; color: "gray"'>&copy;2021 Twilight Place | website: http://www.twilightPlace.ca | tel: +16395759 | address: Twilight Street, 5C9M4W, Toronto, ON, Canada</footer> 
                </div>`;

    await notifyByEmail(customerEmail, subject, message).catch((err) =>
      console.log(err)
    );
  }
  // END EMAIL
});

module.exports = router;
