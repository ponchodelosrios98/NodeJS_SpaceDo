const _ = require('lodash');

const { User } = require('../models');

module.exports.postUser = (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save()
    .then((result) => {
      var preload = user.generateAuthToken();
      return preload;
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((error) => {
      res.status(400).send(error);
    });
}

module.exports.login = (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((error) => {
    res.status(401).send({ message: 'Unauthorized' });
  })
}

module.exports.logout = (req, res) => {
  req.userProfile.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  }); 
 }

 module.exports.getProfile = (req, res) => {
  res.send(req.userProfile);
}