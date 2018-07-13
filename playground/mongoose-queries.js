const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Task } = require('../server/models');

const id = '5a6ff451c8f7dddb47b5f7d2';

if (!ObjectID.isValid(id)) {
  console.log('id is not valid');
} else {
  Task.find({
    _id: id
  }).then((result) => {
    console.log('Todos', result);
  });
  
  Task.findOne({
    _id: id,
  }).then((result) => {
    console.log('Taskes', result);
  });
  
  Task.findById(id).then((result) => {
    if (!result) {
      return console.log('Id not found')
    }
    return console.log('result');
  }).catch((error) => {
    console.log(error);
  });
}