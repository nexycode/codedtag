import React, { Component } from "react"
import ReCAPTCHA from "react-google-recaptcha";
import siteKey from './../options/captcha';
import { ApiKeysContext } from "../utils/api-keys";
import { Link } from "react-router-dom";
import axios from 'axios';

class ForgetPassword extends Component {
    
    static contextType = ApiKeysContext;

    constructor(props){
        
        super(props);

        // init states 
        this.state = {
            inProgressRequest:false,
            captcha: null,
            usernameOrEmail: null 
        }

        this.user_name_or_email = React.createRef();
        this.buttonSubmit = React.createRef();
        this.result = React.createRef();
    }

    setUserNameEmail = (value) => {
        this.setState({
            usernameOrEmail: value
        })
    }

    // Assign State Values
    setCaptcha = (captcha) => {
        this.setState({
            captcha: captcha
        })
    }

    changedCapcha = (value) => {
        this.result.current.innerHTML = "";
        this.result.current.classList.remove("show");
        this.setCaptcha(value);
    }

    setinProgressRequest = (in_progressRequest) => {
        this.setState({
            inProgressRequest: in_progressRequest
        })
    }

    inProgressBtn = () => {
        this.setinProgressRequest(true)
        this.buttonSubmit.current.innerHTML='<span class="loader"></span>';
    }

    stopBtnProgress = () => {
        this.setinProgressRequest(false);
        this.buttonSubmit.current.innerHTML="Change Password";
    }

    removeHighlightedBorder = () => {
        this.user_name_or_email.current.classList.remove("highlighted-border");
    }
    
    onKeyUpDown = (e) => {
        this.result.current.innerHTML = "";
        this.result.current.classList.remove("show");
        this.result.current.classList.remove("error");
        this.result.current.classList.remove("success");
        this.removeHighlightedBorder();
    }

    onSubmit = (e) => {

        e.preventDefault(); 
        if( this.state.inProgressRequest ) { 
            return;
        }
        this.inProgressBtn();

        this.result.current.innerHTML = "";
        this.result.current.classList.remove("show");
        this.result.current.classList.remove("error");
        this.result.current.classList.remove("success");
 
        // Check Captcha
        if(this.state.captcha == null ) {
            this.result.current.classList.add("error");
            this.result.current.classList.add("show");
            this.result.current.innerHTML = "Captcha is Required";
            this.stopBtnProgress();
            return;
        }

        // check if username or email already not empty fields 
        if(this.state.usernameOrEmail == null || this.state.usernameOrEmail == '') {
            this.result.current.classList.add("error");
            this.result.current.classList.add("show");
            this.result.current.innerHTML = "Username or Email is Required!";
            this.user_name_or_email.current.classList.add("highlighted-border");
            this.stopBtnProgress();
            
            return;
        }

        


        // connect to server 
        var data = {

            capcha: this.state.captcha,
            email_username:  this.state.usernameOrEmail
            
        }
         
        data["Secret-codedtag-api-key"] = this.context.secret;

        var request = axios({
            method: 'post',
            url: '/api/user/forget-password', 
            data: data, 
            headers: {
                'CT-public-api-key': this.context.public
            }
        });

        const success = res => { 
            if( res.data.is_error ) {
                this.result.current.innerHTML = res.data.data;
                this.result.current.classList.add("error");
                this.result.current.classList.add("show");                
            } else {
                this.result.current.innerHTML = res.data.data;
                this.result.current.classList.add("success");
                this.result.current.classList.add("show");
            }
            
            this.stopBtnProgress();
        };

        const error = res => { 
            this.stopBtnProgress();
        };


        request.then(success, error);
    }

    render = () => {
        
        return (
            <form onSubmit={this.onSubmit} className="highlight-form custom-field-form text-center wrapper max-500 offset-left offset-right ptb-50 hero max-100-hidden plr-15">
            <h1 className='custom-headline lowercase section-head text-center'>
                Forget Password
            </h1> 
             
            <input type="text" onChange={(e) => this.setUserNameEmail(e.target.value)} ref={this.user_name_or_email} onKeyDown={(e) => this.onKeyUpDown(e)}  placeholder="Username or Email" name="username-email" />
             

            <div className="flexbox items-center flex-wrap mb-20 gap-20">
                <ReCAPTCHA
                    sitekey={siteKey.public}
                    onChange={this.changedCapcha} 
                />
            </div>

            <p>
            If you don't have an account <Link to="/signup">Sign Up</Link>
            </p>
             
            <div className="response" ref={this.result}></div>

            <button ref={this.buttonSubmit} type="submit" className='btn third-btn radius-5 custom-header-btn offset-left full-wide-btn xl ht-sign'>
                Change Password
            </button>

          </form>
        );

    }

}


export {ForgetPassword}