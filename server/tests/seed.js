const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const { Task, User } = require('../models');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const todos = [{
  _id: new ObjectID(),
  text: 'Test todo text',
  _creators: [{
    idUser: userOneId
  }]
}, {
  _id: new ObjectID(),
  text: 'slslslls',
  _creators: [{
    idUser: userTwoId,
  }]
}];

const users = [{
  _id: userOneId,
  email: 'alfonso@lookatmobile.com',
  password: 'userpassword',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'spaceDoShot')
  }]
}, {
  _id: userTwoId,
  email: 'alfonso.delosrios@lookatmobile.com',
  password: 'userpassword',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, 'spaceDoShot')
  }]
}];

const populateTodos = (done) => {
  Task.remove({}).then(() => {
    return Task.insertMany(todos);
  }).then(() => done());
}

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwoId])
  }).then(() => done());
}

module.exports = {
  users,
  todos,
  populateTodos,
  populateUsers,
}