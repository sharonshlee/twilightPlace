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
    console.log('IT HIT THE FOOD PAGE!');
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

  router.get("/confirmation", (req,res) => {
    const cartItems = req.session.cartItems;
    const templateVars = {
      dishes: []
    };
    let orderTotal = 0;
    for (let i = 0; i < cartItems.quantity.length; i++) {
      const currQuantity = cartItems.quantity[i];
      const currDishName = cartItems.dish_name[i];
      const currDishPrice = cartItems.dish_price[i];
      templateVars.dishes.push({
        dish_name: currQuantity,
        quantity: currQuantity,
        dish_price: currDishPrice
      })
      orderTotal += currQuantity * currDishPrice;
    }
    templateVars.orderTotal = orderTotal;

    console.log('templateVars is:', templateVars );

    res.render('confirmation', templateVars);
  })

  router.post("/", (req, res) => {
    // const user_id = req.session.user.id
    // const currentTime = new Date();
    // db.query(`INSERT INTO orders (user_id, start_time, duration, gst) VALUES ($1, $2,$3, $4) RETURNING *`, [user_id, currentTime, 520, 999])
    //   .then(data => {
    //     const order = data.rows[0];
    //     req.session.order_id = order.id;
    //     return res.redirect(`foods/${order.id}`);
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
    req.session.cartItems = req.body;
    res.redirect("/foods/confirmation");
  });

  router.post("/:food_id", (req, res) => {

    const foods_id = req.params.food_id;
    req.session.foods_id.push(foods_id);
    res.redirect('/foods');

  })

  return router;
};
