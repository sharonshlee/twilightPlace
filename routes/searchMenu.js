const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/', (req, res) => {
    const templateVars = {dishes: req.session.searchResults, cartItems:[]};

    if (req.session.cartItems) {
      templateVars.cartItems = req.session.cartItems.quantity;
    }
    res.render('menu', templateVars);
  })

  router.post('/', (req, res) => {
    const { searchInput } = req.body;
    const removeSpaces = searchInput.trim();
    db.query(`
      SELECT * FROM dishes
      WHERE category LIKE $1
      OR name LIKE $1;
      `, [`%${removeSpaces}%`])
    .then(result => {
      req.session.searchResults = result.rows;
      res.redirect('/searchMenu')
    })
  })

  return router;
}


