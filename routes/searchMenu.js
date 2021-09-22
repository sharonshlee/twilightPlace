const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/', (req, res) => {
    const templateVars = {dishes: req.session.searchResults};
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
