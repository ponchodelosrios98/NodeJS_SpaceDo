const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    console.log(err);
    return console.log('Unable to connect to the server.');
  }
  console.log('Connected to MongoDB server');
  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false,
  }, (err, result) => {
    if (err) {
      return console.log(err)
    }

    console.log('Inserted', JSON.stringify(result.ops));
  });
  /*

  db.collection('Users').insertOne({
    name: 'Alfonso',
  }, (err, result) => {
    if (err) {
      return console.log(err)
    }

    console.log('Inserted', JSON.stringify(result.ops));
  });*/

  db.close();
});