const pool = require("./pool");

const addOrderDetails = (orderId, dishId, quantity) => {
  return pool
    .query(
      `INSERT INTO orders_details (order_id, dish_id, quantity)
       VALUES ($1, $2, $3);`,
      [orderId, dishId, quantity]
    )
    .catch((err) => console.log("addOrderDetails Error =>", err));
};

module.exports = { addOrderDetails };
