const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/', (req, res) => {
    console.log("IT HIT THE GET");
    console.log("req.sess is :", req.session.searchResults);
    const templateVars = {dishes: req.session.searchResults};
    console.log("THESE ARE THE SEARCH RESULTS", templateVars);
    res.render('menu', templateVars);
  })

  router.post('/', (req, res) => {
    const { searchInput } = req.body;
    db.query(`
      SELECT * FROM dishes WHERE category LIKE '%${searchInput}%';
      `)
    .then(result => {
      req.session.searchResults = result.rows;
      res.redirect('/searchMenu')
    })
  })

  return router;
}
