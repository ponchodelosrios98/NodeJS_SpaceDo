const config = require('../config.json');
const mongoose = require('mongoose');

const url = process.env.NODE_ENV === config["env"]["production"]["name"] ? config["env"]["production"]["host"] : config["env"]["development"]["host"];

mongoose.Promise = global.Promise;
mongoose.connect(`${url}/${config.database}`);

module.exports = {
  mongoose,
};