const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    db.query(`
    SELECT id, name, description, price
    FROM foods
    WHERE id IN (${req.session.foods_id.join(', ')});`)
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
