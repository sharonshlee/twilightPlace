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

const getRecommendations = (dishIds) => {
  const dishIdWhere = [];
  for (let i = 1; i <= dishIds.length; i++) {
    dishIdWhere.push(`$${i}`);
  }
  return pool
    .query(
      `SELECT d1.* FROM dishes d1 JOIN dishes d2 ON d2.category = d1.category WHERE d1.id NOT IN (${dishIdWhere.join(
        ","
      )}) AND d2.id IN (${dishIdWhere.join(",")}) `,
      dishIds
    )
    .then((data) => data.rows)
    .catch((err) => console.log("getRecommendations ERROR", err));
};
module.exports = { getTotalWaitTime, getRecommendations };
