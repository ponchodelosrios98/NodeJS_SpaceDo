const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { mongoose } = require('./db/mongoose');
const { authenticate } = require('./middleware');
const { taskController, userController }  = require('./controllers');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.get('/', () => "Spacedo API Powered by Spaceshot Capital");

app.post('/task', authenticate, taskController.postTask);
app.put('/task/:id', authenticate, taskController.updateTask);
app.delete('/task/:id', authenticate, taskController.deleteTask);
app.get('/task', authenticate, taskController.getAllTasks);
app.get('/task/:id', authenticate, taskController.getOneTask);

app.post('/user', userController.postUser);
app.post('/user/login', userController.login);
app.delete('/user/logout', authenticate, userController.logout);
app.get('/user', authenticate, userController.getProfile);

app.listen(PORT, () => {
  console.log('Spacedo running on port ' + PORT);
});

module.exports = {
  app,
};