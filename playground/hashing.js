const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

var password = '123nhfjd';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

/*
var data = {
  id: 10,
};

var message = 'I am user #3';
var hashed = SHA256(message).toString();

console.log('Hashed', hashed);

var data = {
  id: 4,
};

var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'secret').toString(),
};

var resultHash = SHA256(JSON.stringify(token.data) + 'secret').toString();
if (resultHash === token.hash) {
  console.log('Data was not changed');
} else {
  console.log('Data was changed')
}