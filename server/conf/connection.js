const mongoose = require('mongoose');
const conf = require("./configuration");

mongoose.connect(conf.database.link);

mongoose.Promise = global.Promise;


module.exports = {mongoose};