import React, { useContext, Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import siteKey from './../options/captcha';
import { validateEmail } from './../utils/email'; 
import { Link } from "react-router-dom";
import axios from 'axios'; 
import { ApiKeysContext } from './../utils/api-keys';

class Register extends Component {
 
    static contextType = ApiKeysContext;

    constructor(props) {   

        super(props);

        // Initialize states 
        this.state = {
            captcha: null,
            username: null,
            fullname: null,
            email: null,
            password: null,
            confirmPassword: null,
            inProgressRequest: false
        };


        this.user_name  = React.createRef();
        this.full_name  = React.createRef();
        this.user_email = React.createRef();
        this.user_password  = React.createRef();
        this.user_confirm_password  = React.createRef();
        this.buttonSubmit = React.createRef();
        this.result = React.createRef();
        
       console.log(this.contextType);
    }

    // Assign State Values
    setCaptcha(captcha){
        this.setState({
            captcha: captcha
        })
    }

    setUserName(username){
        this.setState({
            username: username
        })
    }

    setFullName(fullname){
        this.setState({
            fullname: fullname
        })
    }

    setEmail(email){
        this.setState({
            email: email
        })
    }

    setPassword(password){
        this.setState({
            password: password
        })
    }

    setConfirmPassword(confirm_password){
        this.setState({
            confirmPassword: confirm_password
        })
    }

    setinProgressRequest(in_progressRequest){
        this.setState({
            inProgressRequest: in_progressRequest
        })
    }
     
    truncateError = () => {
        this.result.current.innerHTML = "";
        this.result.current.classList.remove("show");
    }

    changedCapcha = (value) => {
        this.result.current.innerHTML = "";
        this.result.current.classList.remove("show");
        this.setCaptcha(value);
    }

    removeHighlightedBorder = (e) => {
        e.target.classList.remove("highlighted-border");
    }

    onInputPasswords = (e) => {
        var pass = this.user_password.current.value;
        var confirmpass = this.user_confirm_password.current.value;
        if( confirmpass === pass ) {
            this.user_password.current.classList.remove("highlighted-border");
            this.user_confirm_password.current.classList.remove("highlighted-border");
            
            this.result.current.classList.remove("show");
            this.result.current.classList.remove("error");
            this.result.current.classList.remove("success");
        }
    }

    inProgressBtn = () => {
        this.setinProgressRequest(true)
        this.buttonSubmit.current.innerHTML='<span class="loader"></span>';
    }

    stopBtnProgress = () => {
        this.setinProgressRequest(false);
        this.buttonSubmit.current.innerHTML="Register";
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

        this.user_password.current.classList.remove("highlighted-border");
        this.user_confirm_password.current.classList.remove("highlighted-border");
        this.user_email.current.classList.remove("highlighted-border");
        this.user_name.current.classList.remove("highlighted-border");
        
        // Check Capcha
        if(this.state.captcha == null ) {
            this.result.current.classList.add("error");
            this.result.current.classList.add("show");
            this.result.current.innerHTML = "Captcha is Required";
            this.stopBtnProgress();
            return;
        }

        // Email Validation 
        var isEmail = validateEmail(this.state.email);
        if(!isEmail) {
            this.result.current.classList.add("error");
            this.result.current.classList.add("show");
            this.result.current.innerHTML = "Invalid Email";
            this.user_email.current.classList.add("highlighted-border");
            this.stopBtnProgress();
            return;
        }

        // Password confirm  
        if( this.state.password !== this.state.confirmPassword ) {
            this.result.current.classList.add("error");
            this.result.current.classList.add("show");
            this.result.current.innerHTML = "Passwords do not match. Please ensure that the passwords entered in both fields are identical";
            
            this.user_password.current.classList.add("highlighted-border");
            this.user_confirm_password.current.classList.add("highlighted-border");
            this.stopBtnProgress();
            return;
        }

        // connect to server 
        var data = {
            password: this.state.password, 
            username:this.state.username,
            email: this.state.email,
            full_name: this.state.fullname,
            capcha: this.state.captcha
        }
         
        data["Secret-codedtag-api-key"] = this.context.secret;

        var request = axios({
            method: 'post',
            url: '/api/user/add', 
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
    
    // Render method for the Register component
    render() { 

        return (
            <form onSubmit={this.onSubmit} className="highlight-form max-100-hidden custom-field-form text-center wrapper max-500 offset-left offset-right ptb-50 hero  plr-15">
                <h1 className='custom-headline lowercase section-head text-center'>
                    Sign up
                </h1> 
                <p>Come join us today and be part of making CodedTag.com even better for the future.</p>
                <input onFocus={this.truncateError} type="text" ref={this.user_name} onChange={(e) => this.setUserName(e.target.value)} onKeyDown={(e) => this.removeHighlightedBorder(e)} placeholder="Username" name="username" />
                <input onFocus={this.truncateError} type="text" ref={this.full_name} onChange={(e) => this.setFullName(e.target.value)} placeholder="Your Full Name" name="userfullname" />
                <input onFocus={this.truncateError} type="text" ref={this.user_email} onChange={(e) => this.setEmail(e.target.value)} onKeyDown={(e) => this.removeHighlightedBorder(e)} placeholder="You Email" name="useremail" />
                <input onFocus={this.truncateError} type="text" ref={this.user_password} onChange={(e) => this.setPassword(e.target.value)} placeholder="Password" onKeyDown={(e) => this.removeHighlightedBorder(e)} onInput={this.onInputPasswords} name="userpassword" />
                <input onFocus={this.truncateError} type="text" ref={this.user_confirm_password} onChange={(e) => this.setConfirmPassword(e.target.value)} onKeyDown={(e) => this.removeHighlightedBorder(e)} onInput={this.onInputPasswords} placeholder="Confirm Password" name="userconfirmpasswor" />
                <div className="flexbox items-center flex-wrap mb-20 gap-20">
                <ReCAPTCHA
                        sitekey={siteKey.public}
                        onChange={this.changedCapcha} 
                    />
                </div>
                <p>
                    Or do you have an account? <Link to="/login">Login</Link>
                </p>
                <div className="response" ref={this.result}></div>

                <button ref={this.buttonSubmit} type="submit" className='btn third-btn radius-5 custom-header-btn offset-left full-wide-btn xl ht-sign'>
                    Register
                </button>
            </form>
        );
    }

}
 

// Export the Register component
export { Register };
