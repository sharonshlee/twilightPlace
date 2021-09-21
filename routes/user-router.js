/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// const express = require('express');
// const router = express.Router();
const { getUsers, getUserById } = require('../db/user-queries');
const router = require('./order-router');

// router.post("/login")
module.exports = (db) => {
router.get("/", (req, res) => {
  getUsers(db)
    .then(users => res.json(users))
    .catch(err => { res.status(500).json({ error: err.message }) });
});

router.get("/:user_id", (req, res) => {
  getUserById(req.params.user_id)
    .then(user => res.json(user))
    .catch(err => { res.status(500).json({ error: err.message }) });
})

return router;
}


// const express = require('express');
// const router = express.Router();

// module.exports = (db) => {
//   router.get("/", (req, res) => {
//       console.log('IT HIT THIS SPOT!');
//       const {phone_number, email, name } = req.body;
//       req.session.conactInfo = {phone_number, email, name};
//       console.log('THE USER INFO WAS SAVED: ', req.session.contactInfo);
//       db.query(`SELECT * FROM dishes;`)
//         .then(data => {
//           // const user = req.session.user;
//           const dishes = data.rows;
//           const templateVars = { dishes };
//           return res.render("menu.ejs", templateVars);
//         })
//         .catch(err => {
//           res
//             .status(500)
//             .json({ error: err.message });
//         });
//     });

//   return router;
// };
