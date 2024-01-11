import React, {useContext, useState, useRef, useEffect,} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import siteKey from './../options/captcha'; 
import axios from 'axios'; 
import {ApiKeysContext} from './../utils/api-keys';




let ForgetPassword = function(){
    

    // Getting Key and secret key 
    var keys = useContext(ApiKeysContext);  
    
    
    var [capcha, setCaptch ] = useState(null); 
    var [email, setEmail ] = useState(null);  

    var user_name_or_email = useRef(); 
    var buttonSubmit = useRef();  
    var result= useRef();  
    
    // Ensure hooks are called in the correct order and unconditionally
    const [state, setState] = useState(null);

    useEffect(() => {
        setState("data");
    }, [state])

    var changedCapcha = (value) => {
        result.current.innerHTML = "";
        result.current.classList.remove("show");
        setCaptch(value);
    }
      

    // Loading in button and pause btn loading 
    const inProgressBtn = () => { 
        buttonSubmit.current.innerHTML='<span class="loader"></span>';
    }

    const stopBtnProgress = () => { 
        buttonSubmit.current.innerHTML="Reset my Password";
    }

    const removeBorder = () => {
        user_name_or_email.current.classList.remove("highlighted-border")
        result.current.classList.remove("error")
        result.current.classList.remove("success")
        result.current.classList.remove("show")
        result.current.classList.innerHTML = "";
    }

    const onSubmit = (e) => {
        e.preventDefault();
        inProgressBtn();
        result.current.innerHTML = "";
        result.current.classList.remove("error");
        result.current.classList.remove("success");
        result.current.classList.remove("show");

        // Check Capcha
        if(capcha == null ) {
            result.current.classList.add("error");
            result.current.classList.add("show");
            result.current.innerHTML = "Captcha is Required";
            stopBtnProgress();
            return;
        }
          
        if( email == null || email == '' ) {
            user_name_or_email.current.classList.add("highlighted-border");
            result.current.innerHTML = "Email or username is required!";
            result.current.classList.add("error");
            result.current.classList.add("show");
            stopBtnProgress();
            return;
        }
        var data = {
            email_username: email,
            capcha: capcha
        };

        data["Secret-codedtag-api-key"] = keys.secret;

        var request = axios({
            url: "/api/user/forget-password",
            method: "POST",
            data:data,
            headers: {
                'CT-public-api-key': keys.public
            }
        });

        request.then(function(resp){
            if( resp.data.is_error ) {
                result.current.innerHTML = resp.data.data;
                result.current.classList.add("error");
                result.current.classList.add("show");
                stopBtnProgress();
            } else {
                result.current.innerHTML = resp.data.data;
                result.current.classList.add("success");
                result.current.classList.add("show");
                stopBtnProgress();
            }
        }, function(err){}); 


    }
      
    return (
          <form onSubmit={onSubmit} className="highlight-form custom-field-form text-center wrapper max-500 offset-left offset-right ptb-50 hero max-100-hidden plr-15">
            <h1 className='custom-headline lowercase section-head text-center'>
                Reset Password
            </h1> 
             
            <input type="text" onFocus={removeBorder} onChange={(e)=>setEmail(e.target.value)} ref={user_name_or_email} placeholder="Username or Email" name="username-email" />
               
            <div className="flexbox items-center flex-wrap mb-20 gap-20">
                <ReCAPTCHA
                    sitekey={siteKey.public}
                    onChange={changedCapcha} 
                />
            </div> 
             
            <div className="response" ref={result}></div>

            <button ref={buttonSubmit} type="submit" className='btn third-btn radius-5 custom-header-btn offset-left full-wide-btn xl ht-sign'>
                Reset my Password
            </button>

          </form>
    );
}

 
export {ForgetPassword};


