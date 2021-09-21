const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req,res) => {
    const { phone_number } = req.session.contactInfo;
    console.log("PHONE NUMBER: ", phone_number);
    db.query(`
      SELECT COUNT(phone_number) FROM orders WHERE phone_number = $1;
    `, [phone_number])
    .then((result) => res.json(result.rows[0]));
    })

  return router;
}
