/*
 * All routes for Foods are defined here
 * Since this file is loaded in server.js into api/foods,
 *   these routes are mounted onto /foods
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { placeOrder } = require("./placeOrderHelper");

module.exports = (db) => {
  router.get("/", (req, res) => {
    req.session.cartItems = null;
    res.render("thankyou");
  });

  router.post("/", (req, res) => {
    const cartItems = req.session.cartItems;
    const dishes = [];
    const { quantity, dish_id } = cartItems;
    for (let i = 0; i < quantity.length; i++) {
      const q = quantity[i];
      if (q !== "" && q !== "0") {
        dishes.push({
          dishId: dish_id[i],
          quantity: quantity[i],
        });
      }
    }
    const { phone_number, email, name } = req.session.contactInfo;

    console.log('DISHES IS: ', dishes, "contact info: ", req.session.contactInfo);
    placeOrder(dishes, phone_number, name, email).then(() => {
      req.session.orderConfirmed = [];
      for (let i = 0; i < cartItems.quantity.length; i++) {
        let quantity = parseInt(cartItems.quantity[i]);
        let dishName = cartItems.dish_name[i];
        if (cartItems.quantity.length <= 1) {
          quantity = parseInt(cartItems.quantity);
          dishName = cartItems.dish_name;
        }
        db.query(`SELECT id FROM dishes WHERE name = $1`, [dishName])
          .then((item) => {
            console.log('ITEMS:', item.rows);
            const orderConfirmation = {
              name,
              dish_id: item.rows[0].id,
              quantity,
              phone_number,
              email,
            };
            req.session.orderConfirmed.push(orderConfirmation);
          })
      }
      res.redirect("/thankyou");
    });
  });

  // router.post("/", (req, res) => {
  //   const cartItems = req.session.cartItems;
  //   const dishes = [];
  //   const { quantity, dish_id } = cartItems;
  //   for (let i = 0; i < quantity.length; i++) {
  //     const q = quantity[i];
  //     if (q !== "" && q !== "0") {
  //       dishes.push({
  //         dishId: dish_id[i],
  //         quantity: quantity[i],
  //       });
  //     }
  //   }
  //   const { phone_number, email, name } = req.session.contactInfo;

  //   console.log('DISHES IS: ', dishes, "contact info: ", req.session.contactInfo);
  //   placeOrder(dishes, phone_number, name, email).then(() => {
  //     req.session.orderConfirmed = [];
  //     for (let i = 0; i < cartItems.quantity.length; i++) {
  //       const quantity = parseInt(cartItems.quantity[i]);
  //       const dishName = cartItems.dish_name[i];
  //       db.query(`SELECT id FROM dishes WHERE name = $1`, [dishName])
  //         .then((item) => {
  //           const orderConfirmation = {
  //             name,
  //             dish_id: item.rows[0].id,
  //             quantity,
  //             phone_number,
  //             email,
  //           };
  //           req.session.orderConfirmed.push(orderConfirmation);
  //         })
  //     }
  //     res.redirect("/thankyou");
  //   });
  // });

  return router;
};
