const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req,res) => {
    const cartItems = req.session.cartItems;
    //redirect customer to menu page if cartItems cookie does not exist
    if (!cartItems) {
      return res.redirect("/");
    }

    const templateVars = {
      dishes: []
    };
    let orderTotal = 0;
    for (let i = 0; i < cartItems.quantity.length; i++) {
      const currQuantity = cartItems.quantity[i];
      // if quantity is 0, don't add it;
      if (currQuantity <= 0) {
        continue;
      }
      const currDishName = cartItems.dish_name[i];
      const currDishPrice = cartItems.dish_price[i];
      templateVars.dishes.push({
        dish_name: currDishName,
        quantity: currQuantity,
        dish_price: currDishPrice
      })
      orderTotal += currQuantity * currDishPrice;
    }
    templateVars.orderTotal = orderTotal;

    res.render('confirmation', templateVars);
  })

  router.post("/", (req, res) => {
    req.session.cartItems = req.body;
    res.redirect("/confirmation");
  });

  router.post("/:food_id", (req, res) => {

    const foods_id = req.params.food_id;
    req.session.foods_id.push(foods_id);
    res.redirect('/foods');

  })

  return router;
};
