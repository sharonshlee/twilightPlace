const express = require("express");
const bodyParser = require("body-parser");
const { notify } = require("../notification");
const { addOrder } = require("../db/order-queries");
const { addOrderDetails } = require("../db/order_details-queries");
const { getTotalWaitTime } = require("../db/dish-queries");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/confirm", async (req, res) => {
  const { dishes, phoneNumber, customerName, email } = req.body;
  const placedAt = new Date();

  const orderResult = await addOrder(
    placedAt,
    customerName,
    phoneNumber,
    email
  );
  const orderId = orderResult.id;

  for (const dish of dishes) {
    const { dishId, quantity } = dish;
    await addOrderDetails(orderId, dishId, quantity); // only insert into DB
  }

  const ownerPhoneNumber = process.env.OWNER_PHONE;
  // Notify owner an order(s) has been placed from the same customer.
  await notify(
    `Order ID - ${orderId} has been placed.`,
    ownerPhoneNumber
  ).catch((err) => console.log(err));

  const totalWaitTime = (await getTotalWaitTime(orderId)) * 1.2; //+20% cooking time

  // Notify customer the wait time for pick up.
  await notify(
    `Your food will be ready in ${totalWaitTime} minute(s)`,
    phoneNumber
  ).catch((err) => console.log(err));

  // Notify customer automatically after wait time + 20% buffer time when the food is ready.
  setTimeout(async () => {
    await notify(`Your food is ready for pick up!`, phoneNumber).catch((err) =>
      console.log(err)
    );
    res.end();
  }, (totalWaitTime * 60 * 1000) / 1000); // Minutes * 60s * 1000ms(/ 1000 for testing only)
});

module.exports = router;
