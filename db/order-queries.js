const db = require("./db");

const addOrder = (
  quantity,
  dishId,
  orderType,
  placedAt,
  customerName,
  phoneNumber
) =>
  db
    .query(
      `INSERT INTO orders (quantity, dish_id, order_type, placed_at, customer_name, phone_number) 
VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`,
      [quantity, dishId, orderType, placedAt, customerName, phoneNumber]
    )
    .then((result) => result.rows)
    .catch((err) => console.log("addOrder Error =>", err));

module.exports = { addOrder };
