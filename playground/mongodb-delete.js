const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    console.log(err);
    return console.log('Unable to connect to the server.');
  }
  console.log('Connected to MongoDB server');
  
  /*
  DELETE MANY
  db.collection('Todos').deleteMany({ text: 'Something to do' }).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
  */

  /*
  DELETE ONE
  db.collection('Todos').deleteOne({ text: 'Something to do' }).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
  */

  /*
  FIND AND DELETE ONE 
  db.collection('Todos').findOneAndDelete({ text: 'Something to do' }).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
  */

  //db.close();
});