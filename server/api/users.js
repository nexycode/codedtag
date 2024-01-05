const express = require("express");
var userRouters = express.Router();
 
// Models of DB 
const {User, Application} = require("./../models/users");

// Subscribe
userRouters.post("/subscribe", (req, res) => {
    
    /* name - email - username */
    res.send(req.body);
                             
});

// Login 

// change user rule

// Add new User

// Update user

// Get all users 

// Get a specific user

// delete user

// block user



module.exports = {userRouters}