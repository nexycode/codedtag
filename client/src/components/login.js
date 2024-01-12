import React, {  Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import siteKey from './../options/captcha';
import { validateEmail } from './../utils/email'; 
import { Link } from "react-router-dom";
import axios from 'axios'; 
import { ApiKeysContext } from './../utils/api-keys';

class Login extends Component {
 
    static contextType = ApiKeysContext;

    constructor(props) {   

        super(props);
        
        // Initialize states 
        this.state = {
            inProgressRequest:false,
            captcha: null,
            usernameOrEmail: null,
            password: null  
        };

        var user_name_or_email = React.createRef(); 
        var user_password = React.createRef(); 
        this.buttonSubmit = React.createRef(); 
    }

    // Assign State Values
    setCaptcha = (captcha) => {
        this.setState({
            captcha: captcha
        })
    } 

    setEmailOrUser = (emailOrUser) => {
        this.setState({
            usernameOrEmail: emailOrUser
        })
    }

    setPassword = (password) => {
        this.setState({
            password: password
        })
    }

    setinProgressRequest = (in_progressRequest) => {
        this.setState({
            inProgressRequest: in_progressRequest
        })
    }
    
    truncateError = () => {
        this.result.current.innerHTML = "";
        this.result.current.classList.remove("show");
    }

    inProgressBtn = () => {
        this.setinProgressRequest(true)
        this.buttonSubmit.current.innerHTML='<span class="loader"></span>';
    }

    stopBtnProgress = () => {
        this.setinProgressRequest(false);
        this.buttonSubmit.current.innerHTML="Login";
    }
 

    changedCapcha = (value) => {
        this.result.current.innerHTML = "";
        this.result.current.classList.remove("show");
        this.setCaptcha(value);
    }
    
    onSubmit = (e) => {

        e.preventDefault(); 
        if( this.state.inProgressRequest ) { 
            return;
        }
        this.inProgressBtn();



    }

    // Render method for the Register component
    render() { 

        return (
            <form onSubmit={this.onSubmit} className="highlight-form custom-field-form text-center wrapper max-500 offset-left offset-right ptb-50 hero max-100-hidden plr-15">

                <h1 className='custom-headline lowercase section-head text-center'>
                    Login
                </h1>

                <input type="text" ref={this.user_name_or_email}   placeholder="Username or Email" name="username-email" />
                <input type="text" ref={this.user_password}  placeholder="Password" name="password" />
                <span className="forget-password">
                    Forgot your password? <Link to="/forget-password">Click here</Link>
                </span>

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
                    Login
                </button>

            </form>
        );
    }

}
 

// Export the Register component
export { Login };
