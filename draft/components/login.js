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

let Login = () => {
    

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
                Login
            </h1> 
             
            <input type="text" ref={user_name_or_email}   placeholder="Username or Email" name="username-email" />
            <input type="text" ref={user_password}  placeholder="Password" name="password" />
            <span className="forget-password">
                  Forgot your password? <Link to="/forget-password">Click here</Link>
            </span>
            

            <div className="flexbox items-center flex-wrap mb-20 gap-20">
                <ReCAPTCHA
                    sitekey={siteKey.public}
                    onChange={changedCapcha} 
                />
            </div>

            <p>
            If you don't have an account <Link to="/signup">Sign Up</Link>
            </p>
             
            <div className="response" ref={result}></div>

            <button ref={buttonSubmit} type="submit" className='btn third-btn radius-5 custom-header-btn offset-left full-wide-btn xl ht-sign'>
                Login
            </button>

          </form>
    );
}


export {Login};