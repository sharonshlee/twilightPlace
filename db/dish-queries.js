const db = require("./db");

const getDish = (id) =>
  db
    .query(`SELECT * FROM dishes WHERE id = $1;`, [id])
    .then((data) => data.rows[0]);

const getTotalWaitTime = (orderIds) => {
  const inClause = [];
  for (let i = 1; i <= orderIds.length; i++) {
    inClause.push(`$${i}`);
  }
  return db
    .query(
      `SELECT SUM(o.quantity * d.cooking_time) as total_wait_time FROM dishes d 
  JOIN orders o ON o.dish_id = d.id
  WHERE o.id IN (${inClause.join(",")})`,
      orderIds
    )
    .then((data) => data.rows[0].total_wait_time)
    .catch((err) => console.log("getTotalWaitTime ERROR", err));
};
module.exports = { getDish, getTotalWaitTime };
