/*
 * All routes for Foods are defined here
 * Since this file is loaded in server.js into api/foods,
 *   these routes are mounted onto /foods
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/', (req, res) => {
    res.render('thankyou');
  });


  router.post('/', (req, res) => {
    const cartItems = req.session.cartItems;
    const { phone_number, email, name } = req.session.contactInfo;
    req.session.orderConfirmed = [];
    for (let i = 0; i < cartItems.quantity.length; i++) {
      const quantity = parseInt(cartItems.quantity[i]);
      const dishName = cartItems.dish_name[i];
      db.query(`SELECT id FROM dishes WHERE name = $1`, [dishName])
      .then(item => {
        const orderConfirmation = {
          name,
          dish_id: item.rows[0].id,
          quantity,
          phone_number,
          email
        }
        req.session.orderConfirmed.push(orderConfirmation);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    }
    res.redirect('/thankyou')
  })

  return router;
};

