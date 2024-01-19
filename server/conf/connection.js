const mongoose = require('mongoose');
const conf = require("./configuration");

mongoose.connect(conf.database.link, {

      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 5000, // Adjust the timeout values as needed
      socketTimeoutMS: 45000,

});

mongoose.Promise = global.Promise;


module.exports = {mongoose};