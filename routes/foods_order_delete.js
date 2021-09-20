const express = require('express');
const router  = express.Router();

module.exports = () => {
  router.post("/:foods_id", (req, res) => {
    const foods_id = req.session.foods_id.filter(id => id !== req.params.foods_id);
    req.session.foods_id = foods_id;
    if (req.session.foods_id.length > 0) {
      res.redirect("/checkout");
      return;
    }
    res.redirect("/");
  });
  return router;
};
