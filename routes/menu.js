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
      db.query(`SELECT * FROM dishes;`)
        .then(data => {
          // const user = req.session.user;
          const dishes = data.rows;
          const templateVars = { dishes };
          return res.render("menu.ejs", templateVars);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });

  return router;
};
