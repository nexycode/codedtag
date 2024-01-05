const mongoose = require('mongoose');
const express = require("express");
var userRouters = express.Router();
 
// Models of DB 
const {User, Application} = require("./../models/users");

// Helper Functions 
const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
  
// Subscribe
userRouters.post("/subscribe", async (req, res) => {
    
    /* name - email - username */

    var objx = {
        is_error: true,
        data: "Something Went Wrong!"
    }

    var email = req.body.email?req.body.email: null; 
    var username =  req.body.username?req.body.username: null; 
    var name = req.body.name?req.body.name: ""; 

    if( email === null ) {
        objx.is_error = true; 
        objx.data = "Email is required"; 

        res.send(objx);
    }

    // validation 
    var validate = validateEmail(email);
    if( !validate ) {
        objx.is_error = true; 
        objx.data = "Invalid Email"; 
        res.send(objx);
    }

    // divide the email to parts 
    if( username === null ) {
        username = email.split("@")[0];
    }


    // Check if this email aready exists 
    var user = await User.findOne({email: email });
     
    if( user !== null ) {
        
        objx.is_error = true; 
        objx.data = "Email already exists"; 

        res.send(objx);
        res.end();
        return;
    }

    var newUser = await User.create({ 
        email: email,
        username: username
    });
    
    if( ! newUser ) {
        res.send(objx);
        res.end();

    }

    objx.data = newUser;
    objx.is_error = false;

    res.send(objx);
    res.end();

 
});

// Login 

// change user rule

// Add new User

// Update user

// Get all users 

// Get a specific user

// delete user

// block user

// Create Application


module.exports = {userRouters}