const { ObjectID } = require('mongodb');
const _ = require('lodash');

const { Task } = require('../models');

module.exports.postTask = (req, res) => {
  var task = new Task({
    text: req.body.text,
    _creators: [{ idUser: req.userProfile._id }]
  });
  task.save().then((result) => {
    res.status(200).send({ data: result});
  }).catch((error) => {
    res.status(400).send(error);
  });
}

module.exports.updateTask = (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
    
  if (!ObjectID.isValid(id)) {
    return res.status(400).send({ data: null, message: "ID is not valid"});
  }

  if (_.isBoolean(body.completed)) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Task.findOneAndUpdate({
    _id: id,
    '_creators.idUser': req.userProfile._id
  }, {
    $set: body
  }, { new: true }).then((result) => {
    if (!result) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.send({ data: result })
  }).catch((error) => {
    res.status(400).send({ error });
  });
}

module.exports.deleteTask =  (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send({ data: null, message: "ID is not valid"});
  }

  Task.findByIdAndRemove({
    _id: id,
    '_creators.idUser': req.userProfile.id,
  }).then((result) => {
    if (!result) {
      return res.status(404).send({ data: null, message: "Task not found" });
    }
    res.status(200).send({ data: result});
  }).catch((error) => {
    res.status(400).send(error);
  });
};

module.exports.getAllTasks = (req, res) => {
  Task.find({
    '_creators.idUser': req.userProfile.id
  }).then((result) => {
    res.status(200).send({ data: result});
  }).catch((error) => {
    res.status(400).send(error);
  });
};

module.exports.getOneTask = (req, res) => {
  const id = req.params.id;
  
  if (!ObjectID.isValid(id)) {
    return res.status(400).send({ data: null, message: "ID is not valid"});
  }

  Task.findById({
    _id: id,
    '_creators.idUser': req.userProfile.id
  }).then((result) => {
    if (!result) {
      return res.status(404).send({ data: null, message: "Task not found" });
    }
    res.status(200).send({ data: result});
  }).catch((error) => {
    res.status(400).send(error);
  });
}