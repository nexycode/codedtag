import React, {useState, useRef, useContext, useEffect} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import siteKey from './../options/captcha';
import {validateEmail} from './../utils/email'; 
import { Link, useParams } from "react-router-dom";
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
    
    var {code} = useParams(); 
    
    // Getting Key and secret key 
    var keys = useContext(ApiKeysContext); 
     
    // Getting fields values  
    var [password, setPassword ] = useState(null);
    var [confirmPassword, setConfirmPassword ] = useState(null); 
    var [userExists, setUserExists] = useState(false);
    var [response, setResponse] = useState("Loading ...");

    useEffect(function(){
        if(keys.public != '' ) {
             
            var data = {
                code: code
            };

            data["Secret-codedtag-api-key"] = keys.secret;
            
            var request = axios({
                method: 'post',
                url: '/api/user/verify-token', 
                data:data,
                headers: {
                    'CT-public-api-key': keys.public
                }
            }); 

            request.then(function(resp){
                if( resp.data.is_error ) {
                    setResponse(resp.data.data);
                } else {
                    setUserExists(true);
                }
            }, function(err){}); 

        }

    },[keys.public]);
    
    var user_password = useRef(); 
    var user_confirm_password = useRef();
    
    var buttonSubmit = useRef();

    var result = useRef(); 
    
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
        buttonSubmit.current.innerHTML='<span class="loader"></span>';
    }

    const stopBtnProgress = () => { 
        buttonSubmit.current.innerHTML="Change My Password";
    }

    const onSubmit = (e) => {
        
        e.preventDefault();
        
        user_password.current.classList.remove("highlighted-border");
        user_confirm_password.current.classList.remove("highlighted-border");
        inProgressBtn();
        
        // Check if they empty 
        if( password === null || confirmPassword == null ) {

            result.current.classList.add("error");
            result.current.classList.add("show");
            result.current.innerHTML = "In the blank spaces provided, kindly enter your new password twice.";
            
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
        
        //-- 
        var data = {
            code: code,
            password: password
        };

        data["Secret-codedtag-api-key"] = keys.secret;
        
        var request = axios({
            method: 'post',
            url: '/api/user/change-password', 
            data:data,
            headers: {
                'CT-public-api-key': keys.public
            }
        }); 

        request.then(function(resp){
            stopBtnProgress();
            if( resp.data.is_error ) {
                setResponse(resp.data.data);
            } else {
                
                var objex = resp.data;
                if(objex.is_error) {
                    setResponse(objex.data);
                    
                } else {
                    setResponse(objex.data);
                    result.current.innerHTML = objex.data;
                    result.current.classList.add("success");
                    result.current.classList.add("show");

                    setTimeout(()=>{
                        window.location.href = "/login";
                    }, 2000);
                }

            }
        }, function(err){}); 
    }
      
    var render = (
        <div style={{background:'#ee', borderColor:"#eee"}} className="content-center items-center highlight-form custom-field-form text-center wrapper max-500 offset-left offset-right ptb-50 hero max-100-hidden plr-15">
            <p style={{padding: '0px', margin: '0px'}}> 
                {response}
            </p>
        </div>
    );

  if( userExists ) {
        render = (
            <form onSubmit={onSubmit} className="highlight-form custom-field-form text-center wrapper max-500 offset-left offset-right ptb-50 hero max-100-hidden plr-15">
            <h1 className='custom-headline lowercase section-head text-center'>
                Change Password
            </h1> 
            
            <input ref={user_password} onInput={onInputPasswords} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Your New Password" name="username-email" />
            <input ref={user_confirm_password} onInput={onInputPasswords} onChange={(e) => setConfirmPassword(e.target.value)} type="text" placeholder="Confirm the New Password" name="username-email" />
                
            <div className="response" ref={result}></div>

            <button ref={buttonSubmit} type="submit" className='btn third-btn radius-5 custom-header-btn offset-left full-wide-btn xl ht-sign'>
                Change My Password 
            </button>

            </form>
    );
  }
  
  return render;
}


export {ChangePassword};