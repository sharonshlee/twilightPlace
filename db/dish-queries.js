const pool = require("./db");

const getTotalWaitTime = (orderId) => {
  return pool
    .query(
      `SELECT SUM(od.quantity * d.cooking_time) as total_wait_time 
       FROM dishes d JOIN orders_details od ON od.dish_id = d.id
       WHERE od.order_id = $1`,
      [orderId]
    )
    .then((data) => data.rows[0].total_wait_time)
    .catch((err) => console.log("getTotalWaitTime ERROR", err));
};
module.exports = { getTotalWaitTime };
