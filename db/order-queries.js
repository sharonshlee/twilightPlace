const addOrder = (db, placedAt, customerName, phoneNumber, email) => {
  return db
    .query(
      `INSERT INTO orders (placed_at, customer_name, phone_number, email)
       VALUES ($1, $2, $3, $4) RETURNING id;`,
      [placedAt, customerName, phoneNumber, email]
    )
    .then((result) => result.rows[0])
    .catch((err) => console.log("addOrder Error =>", err));
};

module.exports = { addOrder };
