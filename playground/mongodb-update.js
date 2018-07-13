const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    console.log(err);
    return console.log('Unable to connect to the server.');
  }
  console.log('Connected to MongoDB server');
  
  db.collection('Todos').findOneAndUpdate({
    _id: '5a6eae1eff42cb6e757db15f',
  }, {
    $set: {
      completed: true,
    }
  }, {
    returnOriginal: false,
  }).then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }).catch((error) => {
    console.log(error);
  });

  //db.close();
});