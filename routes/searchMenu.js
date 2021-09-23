const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/', (req, res) => {
    const templateVars = {dishes: req.session.searchResults};
    res.render('menu', templateVars);
  })

  router.post('/', (req, res) => {
    const { searchInput } = req.body;
    const removeSpaces = searchInput.trim();
    console.log("REMOVED SPACES: ", removeSpaces)
    db.query(`
      SELECT * FROM dishes
      WHERE category LIKE $1
      OR name LIKE $1;
      `, [`%${removeSpaces}%`])
    // db.query(`
    // SELECT * FROM dishes
    // WHERE category LIKE '%${removeSpaces}%'
    // OR name LIKE '%${removeSpaces}%';
    // `)
    .then(result => {
      console.log('result is: ', result.rows);
      req.session.searchResults = result.rows;
      res.redirect('/searchMenu')
    })
  })

  return router;
}
