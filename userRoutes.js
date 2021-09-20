const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { getUserWithName } = require('./midterm');

module.exports = function(midterm) {

  /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password encrypted
   */
  const login =  function(name, password) {
    return getUserWithName(name)
    .then(user => {

      if(password === user.password) {
        return user;
      }
      return null;
    });
  }
  exports.login = login;

  router.post('/login', (req, res) => {

    const {name, password} = req.body;
    login(name, password)
      .then(user => {

        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.user = user;
        req.session.foods_id = [];

        res.redirect('/');
      })
      .catch(e => res.send(e));
  });

  router.post('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
  });

  return router;
}
