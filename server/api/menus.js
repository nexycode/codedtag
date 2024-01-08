const {Menu} = require("./../models/menus");

const express = require("express"); 
var menuRouters = express.Router();
 
// Tokens and Api Keys
const { verify_api_keys } = require("./../auth/application_tokens.js");

// need another middlware for user privelage


// API urls
menuRouters.get("/menus", (res,req) => {

})

module.exports = {menuRouters};
