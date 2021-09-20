const users = require("../../routes/users");

$(document).ready(function() {

  const user = () => {
    $.ajax({
      url: '/api/users',
      method: 'get'
    }).then((result) => {
      return result.users;
    });
  };

  const users = user();

  const getUser = function(name, database) {
    let user;
    const keys = Object.keys(users);
    for (let key of keys) {
      if (database[key].name === name) {
        user = key;
      }
    }
    return user;
  };


});

module.exports = getUser;
