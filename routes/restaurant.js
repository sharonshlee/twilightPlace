const express = require('express');
const router = express.Router();
const { sendMessage } = require("../public/scripts/sms");


module.exports = (db) => {

  router.get("/", (req, res) => {
    order_id = req.session.order_id;
    db.query(`
    SELECT quantity, name, description, price, note
    FROM orders JOIN foods_orders ON orders.id = foods_orders.order_id
    JOIN foods ON foods.id = foods_orders.food_id
    WHERE orders.id = ${order_id};`)
      .then(data => {
        const foods_orders = data.rows;
        res.json({ foods_orders });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });
  return router;
};
