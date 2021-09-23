const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req,res) => {
    const cartItems = req.session.cartItems;
    const templateVars = {
      dishes: []
    };
    let orderTotal = 0;
    for (let i = 0; i < cartItems.quantity.length; i++) {
      let currQuantity = cartItems.quantity[i];
      // if quantity is 0, don't add it;
      if (currQuantity <= 0) {
        continue;
      }
      let currDishName = cartItems.dish_name[i];
      let currDishPrice = cartItems.dish_price[i];
      if (cartItems.quantity.length <= 1) {
        currQuantity = cartItems.quantity;
        currDishName = cartItems.dish_name;
        currDishPrice = cartItems.dish_price;
      }
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

  return router;
};

