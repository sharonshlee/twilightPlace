/*
 * All routes for Foods are defined here
 * Since this file is loaded in server.js into api/foods,
 *   these routes are mounted onto /foods
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    if (req.session.user) {
      db.query(`SELECT * FROM foods;`)
        .then(data => {
          const user = req.session.user
          const foods = data.rows;
          const templatevars = { foods, user }
          return res.render("seafood", templatevars);

        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    } else {
      db.query(`SELECT * FROM foods;`)
        .then(data => {
          const user = req.session.user
          const foods = data.rows;
          const templatevars = { foods, user }

          return res.render("seafood_noorder", templatevars);
        })

        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    }
  });

  router.post("/", (req, res) => {

    res.redirect(`foods`);

    const user_id = req.session.user.id
    const currentTime = new Date();
    db.query(`INSERT INTO orders (user_id, start_time, duration, gst) VALUES ($1, $2,$3, $4) RETURNING *`, [user_id, currentTime, 520, 999])
      .then(data => {
        const order = data.rows[0];
        req.session.order_id = order.id;
        return res.redirect(`foods/${order.id}`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:food_id", (req, res) => {

    const foods_id = req.params.food_id;
    req.session.foods_id.push(foods_id);
    res.redirect('/foods');

  })

  return router;
};
