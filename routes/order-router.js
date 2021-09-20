const express = require("express");
const router = express.Router();
const { notify } = require("../notification");
const { addOrder } = require("../db/order-queries");
const { getTotalWaitTime } = require("../db/dish-queries");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.post("/confirm", async (req, res) => {
  const { orders, phoneNumber, customerName } = req.body;
  const orderIds = [];
  const placedAt = new Date();
  for (const order of orders) {
    const { quantity, dishId, orderType } = order;
    const result = await addOrder(
      quantity,
      dishId,
      orderType,
      placedAt,
      customerName,
      phoneNumber
    );
    orderIds.push(result[0].id);
  }
  const ownerPhoneNumber = process.env.OWNER_PHONE;
  // Notify owner
  await notify(
    `New order(s) ${orderIds.join(",")} had been placed.`,
    ownerPhoneNumber
  ).catch((err) => console.log(err));

  const totalWaitTime = (await getTotalWaitTime(orderIds)) * 1.2;

  await notify(
    `Your order will be ready in ${totalWaitTime} minute(s)`,
    phoneNumber
  ).catch((err) => console.log(err));
  setTimeout(async () => {
    await notify(`Your order is ready for pick up!`, phoneNumber).catch((err) =>
      console.log(err)
    );
    res.end();
  }, (totalWaitTime * 60 * 1000) / 1000); // Minutes * 60s * 1000ms / 1000 for testing only
});

module.exports = router;
