import React, { useState, useRef, useContext } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import siteKey from './../options/captcha';
import { Link } from "react-router-dom";
import { ApiKeysContext } from './../utils/api-keys';

let Login = () => {
    // Getting Key and secret key 
    var keys = useContext(ApiKeysContext);
    var user_name_or_email = useRef(); 
    var user_password = useRef();
    var result = useRef();
    var buttonSubmit = useRef();
    
    var changedCapcha = (value) => {
        result.current.innerHTML = "";
        result.current.classList.remove("show");
        setCaptch(value);
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

export { Login };
