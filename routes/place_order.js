const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.post("/:id", (req, res) => {
    db.query(`
    INSERT INTO orders `)
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
