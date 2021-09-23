/*
 * All routes for Foods are defined here
 * Since this file is loaded in server.js into api/foods,
 *   these routes are mounted onto /foods
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM dishes;`)
      .then((data) => {

        const dishes = data.rows;
        const templateVars = { dishes, cartItems: []}
        if (req.session.cartItems) {
          templateVars.cartItems = req.session.cartItems.quantity;
        }
        return res.render("menu.ejs", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const { phone_number, email, name } = req.body;
    req.session.contactInfo = { phone_number, email, name };
    res.redirect("/menu");
  });

  return router;
};
