const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    console.log(err);
    return console.log('Unable to connect to the server.');
  }
  console.log('Connected to MongoDB server');
  
  db.collection('Todos').find({
    completed: false
  }).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }).catch((error) => {
    console.log(error);
  });

  db.collection('Todos').find({
    completed: true
  }).count().then((count) => {
    console.log('Todos');
    console.log(JSON.stringify(count, undefined, 2));
  }).catch((error) => {
    console.log(error);
  });

  //db.close();
});