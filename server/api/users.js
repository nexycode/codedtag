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
  
const currentTimeStampInSeconds = () => Math.floor(Date.now() / 1000);

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
        email: sanitizer.sanitize(useremail),
        register_date: currentTimeStampInSeconds()
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

    try {
        
        var decoded = jwt.verify(code,'user-token-159752');
        if( decoded.token !== undefined ) {
            
            var user_id =  decoded.token.split("-")[0];
            var usr = await User.findOne({_id:user_id});
             
            if( usr !== null ) {
                
                if( usr.activated_account ) {
                    objx.data= "Your account has already been activated.";
                    return res.send(objx);
                   
                }
                var isModified = await User.updateOne({_id:user_id},{
                    activated_account: true
                });
                if(isModified.modifiedCount ) {
                    objx.is_error= false,
                    objx.data= "Your account has been activated.",
                    objx.success= true;
                    return res.send(objx);
                   
                }else {
                    objx.is_error= true,
                    objx.data= "Sorry for the problem. To fix it, just go back to the login page and send the activation link again. If you need help, feel free to contact us!",
                    objx.success= false;
                    return res.send(objx);
                   
                }
            }else {
                objx.is_error= true,
                objx.data= "Sorry for the problem. To fix it, just go back to the login page and send the activation link again. If you need help, feel free to contact us!",
                objx.success= false;
                return res.send(objx);
               
            }

        }

    } catch (error) {
        objx.is_error= true,
        objx.data= "Sorry for the problem. To fix it, just go back to the login page and send the activation link again. If you need help, feel free to contact us!",
        objx.success= false;
        return res.send(objx); 
       
    }
    

});


var sendResetPasswordLink = async (token, name, user_email, callback) => {

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

    var obj = {
        status_code: 0,
        data: "Something went wrong"
    };

    const transporter = nodemailer.createTransport(conf.email.settings);
    var link = conf.email.reset_password.reset_link.replace("[USER-TOKEN]", token);
    
    var headline1 = `<h1 style='${h1Style}'>Reset my Account Password</h1>`;
    var paragraph1 = `<p style='${pStyles}'>Hello ${name}</p>`;
    var paragraph2 = `<p style='${pStyles}'>Did you request to reset your password at CodedTag?</p>`
    var paragraph3 = `<p style='${pStyles}'>If yes, just click on the button below.</p>`
    var btnlink = `<a href="${link}" style="${aStyle}">Reset my Password</a>`;
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
        from: conf.email.reset_password.sender,
        to: user_email,
        subject: "CodedTag: Reset Your Password",
        //text: 'Please confirm your email',
        html:body
    };       
    
    
    transporter.sendMail(message, async function( error, info ){
        if (error) { 
            return callback({
                data: "Access to SMTP server denied!",
                status_code: 0
            })
        } else { 
            
            return callback({
                data: "We have sent a password reset link to your email. Kindly check your inbox.",
                status_code: 1
            });
        }
    }); 
    
};

// Forget Password 
userRouters.post("/user/forget-password", verify_api_keys, async(req, res) => {
    
    var objx = {
        is_error: true,
        data: "Something Went Wrong!",
        success: false
    };

    // Check capcha 
    if( !req.body.capcha || req.body.capcha === '' ) {
        objx.data = "Capcha is required";
        return res.send(objx);
    }
    

    if( !req.body.email_username || req.body.email_username === '' ) {
        objx.data = "Email or Username is required";
        return res.send(objx);
    }

    var usr_email = await User.findOne({email: req.body.email_username});
    var usr_username = await User.findOne({username: req.body.email_username});
    if( usr_username === null && usr_email === null ) {
        objx.data = "This email or username doesn't exist";
        return res.send(objx);       
    }


    var usr = usr_email ? usr_email: usr_username;
    
    var token = usr.token ? usr.token: ''; 
    
    if( !token || token == '') {
        // Generate a new token 
        
        try {
            
            var build = usr._id + '-' + usr.email + '-' + usr.username;
            token = await jwt.sign({token: build}, 'user-token-159752');
            
            var filter = usr_email?{email:usr_email.emai}: {username: usr_username.username};
             
            await User.updateOne(filter, {token:token});
            
            // Send the reset link here
            sendResetPasswordLink(token, usr.username, usr.email, (response) => {

                return res.send({
                    is_error: response.status_code?false:true,
                    data: response.data,
                    success: response.status_code?true:false,
                });
               

            });
              

        } catch (error) { }
    }

    if( token ) {

        // Send the reset link here
        sendResetPasswordLink(token, usr.username, usr.email, (response) => {
             

            return res.send({
                is_error: response.status_code?false:true,
                data: response.data,
                success: response.status_code?true:false,
            });
           
        }); 

    }
    

    
    
});

// Verify user token 
userRouters.post("/user/verify-token", verify_api_keys, async(req, res) => {
    
    var objx = {
        is_error: true,
        data: "Something Went Wrong!",
        success: false
    };


    if( !req.body.code || req.body.code == '' ) {
        objx.data = "It appears there is an unauthorized request. To address this issue, please follow the designated authentication process or contact support for assistance.";
        return res.send(objx);
    }
    
    var code = req.body.code;

    var user = await User.findOne({token: code});

    if( user === null ) {
        objx.data = "This is an unauthorized request!, please follow the designated authentication process or contact support for assistance.";
        return res.send(objx);
    } else {
        objx.is_error = false;
        objx.data = "User exists!";
        objx.success = true;
        return res.send(objx);
    } 
    
});

// change password 
userRouters.post("/user/change-password", verify_api_keys, async(req, res) => {
    
    var objx = {
        is_error: true,
        data: "Something Went Wrong!",
        success: false
    };


    if( !req.body.code || req.body.code == '' || !req.body.password || req.body.password == '' ) {
        objx.data = "It appears there is an unauthorized request. To address this issue, please follow the designated authentication process or contact support for assistance.";
        return res.send(objx);
    }
    
    var code = req.body.code;
    var newPass = req.body.password;

    var user = await User.findOne({token: code});

    if( user === null ) {
        objx.data = "This is an unauthorized request!, please follow the designated authentication process or contact support for assistance.";
        return res.send(objx);
    } else { 
        user.password = await bcrypt.hash(newPass, 10);
        try {
            var responsed = await user.save(); 
            objx.is_error = false; 
            objx.data = "You have successfully saved your new password, you can use it to log into your account";
            objx.success = true; 
        } catch (error) {
            objx.data = "Something went wrong, please try later !";
            objx.is_error = true;
            objx.success = false;     
        }
        return res.send(objx);
    } 
    
});

// Login 
userRouters.post("/user/login", verify_api_keys, async(req, res) => {
    
    var objx = {
        is_error: true,
        data: "Something Went Wrong!",
        success: false
    };
    
    // Data Validation 
    var username_email = req.body.username_email;
    var user_password = req.body.user_password;
     
    if( username_email == null || username_email === undefined || user_password == null || user_password === undefined ) {
        objx.data = "Username or Email and Password are required !";
        return res.send(objx);
    }

    // is email or username ?
    var usr = await User.findOne({email: username_email});
    if( usr === null ) {
        usr = await User.findOne({username: username_email});
    }

    // user doesn't exists 
    if( usr === null ) {
        objx.data = "The username or email you entered does not exist. Please double-check your information and try again.";
        return res.send(objx);
    }

    // check password and email 
    try {
        
        var compare = await bcrypt.compare(user_password, usr.password);
        
        if( compare == false ) {
            objx.data = "The username or password entered is incorrect. Please check the information you entered and try again!";
            return res.send(objx);
        }

    } catch (e) {
        objx.data = "The username or password entered is incorrect. Please check the information you entered and try again!";
        return res.send(objx);
    }
    
    
    // User doesn't active his account 
    if(!usr.activated_account || usr.activated_account == undefined ) {
        
        // Send the activation link 
        sendActivationCode(usr, function(obj){

            if ( ! obj.status_code) {
                objx.data = obj.data;
            } else {
                objx.data = "Your account is not activated yet. We've sent an activation link to your email. Please check your inbox, click on the provided link, and then try logging in again.";
            }

            return res.send(objx);

        }); 
        
    } 

    // user is block 
    else if( usr.is_blocked && usr.is_blocked == true ) {
        objx.data = "Your account has been blocked. If you'd like to know the reasons for the account lock, please contact our support team for assistance.";
        return res.send(objx);
    }

    // user is deleted 
    else if( usr.is_deleted && usr.is_deleted == true ) {
        objx.data = "Your account has been deleted, indicating that you no longer use the CodedTag site. If you have any questions or concerns, feel free to reach out to our support team for further assistance.";
        return res.send(objx);
    } else {

        // if user exists add session to browser with his name, token, email, and id  
        req.session.user = {
            id: usr._id,
            username: usr.username,
            email: usr.email,
        };

        // update last login date 
        usr.last_log = currentTimeStampInSeconds();
        await usr.save();

        objx.is_error = false;
        objx.success = true;
        objx.data = "You've successfully logged in! The system will redirect you to your dashboard shortly.";
        objx.user = {
            username: usr.username,
            firstname: usr.firstname,
            secondname: usr.secondname,
            email: usr.email,
            rule: usr.rule
        }

        return res.send(objx);
    
    }
 
    
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