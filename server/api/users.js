const mongoose = require('mongoose'); 
const express = require("express");
var userRouters = express.Router();
var sanitizer = require('sanitizer');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Models of DB 
const {User, Application} = require("./../models/users");

// Tokens and Api Keys
const { verify_api_keys } = require("./../auth/application_tokens.js");

// Helper Functions 
const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
  
// Subscribe
userRouters.post("/subscribe", verify_api_keys, async (req, res) => {
    
    console.log("Middleware completed !")
    /* name - email - username */

    var objx = {
        is_error: true,
        data: "Something Went Wrong!",
        success: false
    }
 
    var email = req.body.email?req.body.email: null; 
    var username =  req.body.username?req.body.username: null; 
    var name = req.body.name?req.body.name: ""; 

    if( email === null ) {
        objx.is_error = true; 
        objx.success = false; 
        objx.data = "Email is required"; 

        return res.send(objx);
    }

    // validation 
    var validate = validateEmail(email);
    if( !validate ) {
        objx.is_error = true; 
        objx.success = false; 
        objx.data = "Invalid Email"; 
        return res.send(objx);
    }

    // divide the email to parts 
    if( username === null ) {
        username = email.split("@")[0];
    }


    // Check if this email aready exists 
    try {
        var user = await User.findOne({email: email });
     
        if( user !== null ) {
            
            objx.is_error = true; 
            objx.data = "Email already exists"; 
            objx.success = false; 
            return res.send(objx); 
        }

        var newUser = await User.create({ 
            email: sanitizer.sanitize(email),
            username: sanitizer.sanitize(username)
        });
        
        if( ! newUser ) {
            return res.send(objx); 
        }

        objx.data = "Awesome! Thanks for subscribing and joining our community.";
        objx.is_error = false;
        objx.success = true;  

    } catch (error) {
        objx.data = "Something went wrong, please try later";
        objx.is_error = true;
        objx.success = false;  
    }

    
    return res.send(objx); 

 
});

// Add new User
userRouters.post("/create", verify_api_keys, async (req, res) => {

    var objx = {
        is_error: true,
        data: "Something Went Wrong!",
        success: false
    } 
 

    // Data Validation  
    var username = req.body.username;
    var useremail = req.body.email;
    var full_name = req.body.full_name;
    var password= req.body.password;
    
    //- Validate inputs 
    if( username == '' || username == undefined || useremail == '' || useremail == undefined || full_name == '' || full_name == undefined || password == '' || password == undefined ) {
        objx.data = "Ensure you provide your name, email, username, and password for your account";

        return res.send(objx); 
    }

    // Validate Email
    var validate = validateEmail(useremail);
    if( !validate ) {
        objx.is_error = true; 
        objx.success = false; 
        objx.data = "Invalid Email"; 
        return res.send(objx);
    }

    //- Validate Username and email in database
    var email = await User.findOne({email: useremail});
    var is_username = await User.findOne({username: username});
    
    if( is_username !== null ) {
        objx.data = "Username already exists"; 
    }
     
    if( email !== null ) {
        objx.data = "Email already exists"; 
    }

    if( is_username !== null || email !== null) {
        return res.send(objx);
    }  

    var firstName = '';
    var lastName = '';

    // convert name to pieces 
    if(full_name.indexOf( ' ' ) !== -1 ) {
        var nameArray = full_name.split( ' ' );
        firstName = nameArray[0];
        lastName = nameArray[1];

        if( nameArray[2] !== undefined ) {
            lastName = lastName + ' ' + nameArray[2];
        }

        if( nameArray[3] !== undefined ) {
            lastName = lastName + ' ' + nameArray[3];
        }
    }
    
    if( firstName == '' ) {
        firstName = full_name;
    }

    var userObject = {
        username: sanitizer.sanitize(username),
        firstname: sanitizer.sanitize(firstName),
        secondname: sanitizer.sanitize(lastName),
        password: sanitizer.sanitize(password),
        email: sanitizer.sanitize(useremail)
    }

    userObject.password = await bcrypt.hash(userObject.password, 10);

    // Save Data
    var usrx = await User.create(userObject);
    var token = '';
    try {
        
        var build = usrx._id + '-' + usrx.email + '-' + usrx.username;
        token = jwt.sign({token: build}, 'user-token-159752');

    } catch (error) {
        
    }

    // Generate an Activation Token 
    
    var usr = await User.updateOne({
        _id: usrx._id,
        token: token
    })
    
    if( usr.modifiedCount ) {
        objx.is_error = false;
        objx.data = "registration has been successfully completed !";
        objx.user_id = usrx._id;
        objx.success = true;
    }
    
    res.send(objx); 

});

// Send Activation Link
userRouters.post("/send-activation-link", verify_api_keys, async (req, res) => {
    // https://www.w3schools.com/nodejs/nodejs_email.asp
    var 
});

// Activation Proccess 

// Login 

// Update user

// Forget Password 

// change user rule

// Get all users 

// Get a specific user

// delete user

// block user

// Create Application

// Delete Application

// Apply Application Status 

module.exports = {userRouters}