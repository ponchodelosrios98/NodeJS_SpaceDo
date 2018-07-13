var { User } = require('../models');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    req.userProfile = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send({ message: 'Unauthorized'})
  })
};

module.exports = {authenticate};
