import React, {useState, useRef, useContext} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import siteKey from './../options/captcha';
import {validateEmail} from './../utils/email'; 
import { Link } from "react-router-dom";
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

let ChangePassword = () => {
    

    // Getting Key and secret key 
    var keys = useContext(ApiKeysContext);
    
    
    // Getting fields values 
    var [capcha, setCaptch ] = useState(null);
    var [username, setUsername ] = useState(null);
    var [fullname, setFullName ] = useState(null);
    var [email, setEmail ] = useState(null);
    var [password, setPassword ] = useState(null);
    var [confirmPassword, setConfirmPassword ] = useState(null); 
    
    
    var user_name_or_email = useRef(); 
    var user_password = useRef(); 
    var user_email = useRef(); 
    var user_password = useRef(); 
    var user_confirm_password = useRef();
    var buttonSubmit = useRef();

    var result = useRef();
    var inProgressRequest = false;
 

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
        buttonSubmit.current.innerHTML="Login";
    }

    const onSubmit = (e) => {
         
    }
      
    return (
          <form onSubmit={onSubmit} className="highlight-form custom-field-form text-center wrapper max-500 offset-left offset-right ptb-50 hero max-100-hidden plr-15">
            <h1 className='custom-headline lowercase section-head text-center'>
                Change Password
            </h1> 
             
            <input type="text" placeholder="Your New Password" name="username-email" />
            <input type="text" placeholder="Confirm the New Password" name="username-email" />
             
             
             
            <div className="response" ref={result}></div>

            <button ref={buttonSubmit} type="submit" className='btn third-btn radius-5 custom-header-btn offset-left full-wide-btn xl ht-sign'>
                Change My Password 
            </button>

          </form>
    );
}


export {ChangePassword};