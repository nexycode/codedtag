const mongoose = require('mongoose'); 
const express = require("express"); 
var userRouters = express.Router();
var sanitizer = require('sanitizer');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 

const nodemailer = require('nodemailer');

// Models of DB 
const {User, Application} = require("./../models/users");

// configuration 
const conf = require('./../conf/configuration');

// Tokens and Api Keys
const { verify_api_keys, verifiy_google_capcha } = require("./../auth/application_tokens.js");

// Helper Functions 
const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
  
// Subscribe
userRouters.post("/user/subscribe", verify_api_keys, async (req, res) => {
     
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
userRouters.post("/user/add", [verify_api_keys, verifiy_google_capcha], async (req, res) => {

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
    
    var usr = await User.updateOne({ _id: usrx._id, },{ token: token});
    
    if( usr.modifiedCount ) { 

        // attach token 
        usrx.token = token;
        sendActivationCode(usrx, function(obj){
            if ( ! obj.status_code) {
                
                objx.data = obj.data;
                return res.send(objx);
            } else {

                objx.is_error = false;
                objx.success = true;
                objx.data = obj.data;
                return res.send(objx);
            }
        });

    }
    
    

});


// Function of Send Activation Code 
var sendActivationCode = async (user, callback) => {

    const transporter = nodemailer.createTransport(conf.email.settings);

    var link = conf.email.confirm_email.confirmation_link.replace("[USER-TOKEN]", user.token);
    
    var h1Style = `color: #241c15;
    font-family: Georgia,Times,'Times New Roman',serif;
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    line-height: 42px;
    letter-spacing: normal;
    margin: 0;
    padding: 0;
    text-align: center;`;
    var pstyle =`color: #6a655f;
    font-family: 'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 42px;
    letter-spacing: normal;
    margin: 0;
    padding: 0;
    text-align: center;`;

    var pStyles = `color: #6a655f;
    font-family: 'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 42px;
    letter-spacing: normal;
    margin: 0;
    padding: 0;
    text-align: center;`;
    var aStyle = `color: white;
    background: #222;
    border-radius: 10px;
    padding: 7px 40px;
    font-weight: bold;
    margin: 0px 0;
    display: inline-block;
    text-decoration: none; 
    white-space: nowrap;`;

    var headline1 = `<h1 style='${h1Style}'>Please activate your CodedTag account</h1>`;
    var paragraph1 = `<p style='${pStyles}'>Hello ${user.email}</p>`;
    var paragraph2 = `<p style='${pStyles}'>Thank you for signing up with CodedTag™!</p>`
    var paragraph3 = `<p style='${pStyles}'>You will activate your account and start to be an author by clicking the button below.</p>`
    var btnlink = `<a href="${link}" style="${aStyle}">Activate Account</a>`;
    var paragraph4 = `<p style='${pStyles}'>Is the button not working? Please copy the following link and paste it into your browser:</p>`;
    var paragraph5 = `<p style='color:blue;'>${link}</p>`;

    var body = `${headline1}
                ${paragraph1}
                ${paragraph2}
                ${paragraph3}
                ${btnlink}
                ${paragraph4}
                ${paragraph5}`; 
    var message = {
        from: conf.email.confirm_email.sender,
        to: user.email,
        subject: "Confirm Your Email",
        //text: 'Please confirm your email',
        html:body
    }; 
    
    transporter.sendMail(message, async function( error, info ){
        if (error) {
            return callback({
                data: "Access to SMTP server denied!",
                status_code: 0
            }); 
        } else { 
            return callback({
                data: "Thank you for signing up! We've sent an activation link to your email. Please check your email and click on the link to complete the sign-up process.",
                status_code: 1
            });  
        }
    }); 
}

// Send Activation Link - verify_api_keys,
userRouters.post("/user/send-activation-link",verify_api_keys, async (req, res) => {
    // https://www.w3schools.com/nodejs/nodejs_email.asp
    // https://stackoverflow.com/questions/44853483/send-email-using-nodemailer-with-godaddy-hosted-email
    
    var objx = {
        is_error: true,
        data: "Something Went Wrong!",
        success: false
    } 

    // required id 
    if(!req.body.email) {
        objx.data = "email is required!";
        return res.send(objx);
    }

    let user = await User.findOne({email: req.body.email});

    if( user === null || user.token == '' || user.token == undefined ) {
        objx.data = "We couldn't find your email. Please try signing up again.";
        return res.send(objx);
    }
 
     
    sendActivationCode(user, function(obj){
        if ( ! obj.status_code) {
            objx.data = obj.data;
            return res.send(objx);
        } else {
            objx.data = obj.data;
            return res.send(objx);
        }
    });
    
});


// Activation Proccess 
userRouters.post("/user/verify-activation-link", verify_api_keys, async(req, res) => {
    
    var objx = {
        is_error: true,
        data: "Something Went Wrong!",
        success: false
    } 

    var code = req.body.code;
    if( code == undefined ) {
        objx.data = "Code field is required !";
        return res.send(objx);
    }
    
    var decoded = jwt.verify(code,'user-token-159752')
    if( decoded.token !== undefined ) {
        
        var user_id =  decoded.token.split("-")[0];
        var usr = await User.findById(user_id);
        if( usr !== null ) {

            if( usr.activated_account ) {
                objx.data= "Your account has already been activated.";
                return res.send(objx);
            }

            var isModified = await User.updateOne({_id:user_id},{
                activated_account: true
            });

            if(isModified.modifiedCount != undefined && isModified.modifiedCount > 0 ) {
                objx.is_error= false,
                objx.data= "Your account has been activated.",
                objx.success= true;
            }

            return res.send(isModified);
        }
         

    }
    return res.send(isModified);
    

     
});

// Login 
userRouters.post("/user/login", async(req, res) => {
    
    var objx = {
        is_error: true,
        data: "Something Went Wrong!",
        success: false
    };

    return res.send(objx);

    console.log("Login api is under building");
    
});

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