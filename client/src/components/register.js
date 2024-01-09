import React, {useState, useRef, useContext} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import siteKey from './../options/captcha';
import {validateEmail} from './../utils/email'; 

import axios from 'axios'; 
import {ApiKeysContext} from './../utils/api-keys';

/*

    To Verify Capcha
    https://www.google.com/recaptcha/api/siteverify?secret=${SITE_SECRET}&response=${captchaValue}
    https://clerk.com/blog/implementing-recaptcha-in-react
    response: 
    {
        "success": false,
        "error-codes": [
            "timeout-or-duplicate"
        ]
    }
*/

let Register = () => {
    

    // Getting Key and secret key 
    var keys = useContext(ApiKeysContext);
    
    
    // Getting fields values 
    var [capcha, setCaptch ] = useState(null);
    var [username, setUsername ] = useState(null);
    var [fullname, setFullName ] = useState(null);
    var [email, setEmail ] = useState(null);
    var [password, setPassword ] = useState(null);
    var [confirmPassword, setConfirmPassword ] = useState(null); 
    
    
    var user_name = useRef(); 
    var full_name = useRef(); 
    var user_email = useRef(); 
    var user_password = useRef(); 
    var user_confirm_password = useRef();
    var buttonSubmit = useRef();

    var result = useRef();
    var inProgressRequest = false;

    var truncateError = () => {
        result.current.innerHTML = "";
        result.current.classList.remove("show");
    }

    var changedCapcha = (value) => {
        result.current.innerHTML = "";
        result.current.classList.remove("show");
        setCaptch(value);
    }
    
    var removeHighlightedBorder = (e) => {
        e.target.classList.remove("highlighted-border");
    };
    
    const onInputPasswords = (e) => {
        var pass = user_password.current.value;
        var confirmpass = user_confirm_password.current.value;
        if( confirmpass === pass ) {
            user_password.current.classList.remove("highlighted-border");
            user_confirm_password.current.classList.remove("highlighted-border");
            
            result.current.classList.remove("show");
            result.current.classList.remove("error");
            result.current.classList.remove("success");
        }
    }

    // Loading in button and pause btn loading 
    const inProgressBtn = () => {
        inProgressRequest = true;
        buttonSubmit.current.innerHTML='<span class="loader"></span>';
    }

    const stopBtnProgress = () => {
        inProgressRequest = false;
        buttonSubmit.current.innerHTML="Register";
    }

    const onSubmit = (e) => {
        
        e.preventDefault(); 

        if( inProgressRequest ) { 
            return;
        }

        inProgressBtn(); 

        result.current.innerHTML = "";
        result.current.classList.remove("show");
        result.current.classList.remove("error");
        result.current.classList.remove("success");

        user_password.current.classList.remove("highlighted-border");
        user_confirm_password.current.classList.remove("highlighted-border");
        user_email.current.classList.remove("highlighted-border");
        user_name.current.classList.remove("highlighted-border");

        // Check Capcha
        if(capcha == null ) {
            result.current.classList.add("error");
            result.current.classList.add("show");
            result.current.innerHTML = "Captcha is Required";
            stopBtnProgress();
            return;
        }
        
        // Email Validation 
        var isEmail = validateEmail(email);
        if(!isEmail) {
            result.current.classList.add("error");
            result.current.classList.add("show");
            result.current.innerHTML = "Invalid Email";
            user_email.current.classList.add("highlighted-border");
            stopBtnProgress();
            return;
        }

        // Password confirm  
        if( password !== confirmPassword ) {
            result.current.classList.add("error");
            result.current.classList.add("show");
            result.current.innerHTML = "Passwords do not match. Please ensure that the passwords entered in both fields are identical";
            
            user_password.current.classList.add("highlighted-border");
            user_confirm_password.current.classList.add("highlighted-border");
            stopBtnProgress();
            return;
        }

        

        // connect to server 
        var data = {
            password: password, 
            username:username,
            email: email,
            full_name: fullname,
            capcha: capcha
        }

        data["Secret-codedtag-api-key"] = keys.secret;
        
        // keys.public;
        // keys.secret;

        var request = axios({
            method: 'post',
            url: '/api/user/add', 
            data: data, 
            headers: {
                'CT-public-api-key': keys.public
            }
        });
         
        
        const success = res => { 
            if( res.data.is_error ) {
                result.current.innerHTML = res.data.data;
                result.current.classList.add("error");
                result.current.classList.add("show");                
            } else {
                result.current.innerHTML = res.data.data;
                result.current.classList.add("success");
                result.current.classList.add("show");
            }
            
            stopBtnProgress();
        };

        const error = res => {
            console.log(res);
            stopBtnProgress();
        };


        request.then(success, error);



    }
      
    return (
          <form onSubmit={onSubmit} className="custom-field-form text-center wrapper max-500 offset-left offset-right ptb-50 hero  plr-15">
            <h1 className='custom-headline lowercase section-head text-center'>
                Sign up
            </h1> 
            <p>Come join us today and be part of making CodedTag.com even better for the future.</p>
            
            <input onFocus={truncateError} type="text" ref={user_name} onChange={(e) => setUsername(e.target.value)} onKeyDown={(e) => removeHighlightedBorder(e)} placeholder="Username" name="username" />
            <input onFocus={truncateError} type="text" ref={full_name} onChange={(e) => setFullName(e.target.value)} placeholder="Your Full Name" name="userfullname" />
            <input onFocus={truncateError} type="text" ref={user_email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => removeHighlightedBorder(e)} placeholder="You Email" name="useremail" />
            <input onFocus={truncateError} type="text" ref={user_password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" onKeyDown={(e) => removeHighlightedBorder(e)} onInput={onInputPasswords} name="userpassword" />
            <input onFocus={truncateError} type="text" ref={user_confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} onKeyDown={(e) => removeHighlightedBorder(e)} onInput={onInputPasswords} placeholder="Confirm Password" name="userconfirmpasswor" />
 

            <div className="flexbox items-center flex-wrap mb-20 gap-20">
                <ReCAPTCHA
                    sitekey={siteKey.public}
                    onChange={changedCapcha} 
                />
            </div>

            <p>
            Or do you have an account? Login
            </p>
             
            <div className="response" ref={result}></div>

            <button ref={buttonSubmit} type="submit" className='btn third-btn radius-5 custom-header-btn offset-left full-wide-btn xl ht-sign'>
                Register
            </button>

          </form>
    );
}


export {Register};