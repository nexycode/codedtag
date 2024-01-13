import React, {  Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import siteKey from './../options/captcha';
import { validateEmail } from './../utils/email'; 
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; 
import { ApiKeysContext } from './../utils/api-keys';
 

function withNavigate(Component) {
    return props => <Component navHook={useNavigate()} />;
}

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

        this.user_name_or_email = React.createRef(); 
        this.user_password = React.createRef(); 
        this.buttonSubmit = React.createRef(); 
        this.result = React.createRef();

        
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
    
    removeHighlightedErrors = () => {
        this.user_password.current.classList.remove("highlighted-border");
        this.user_name_or_email.current.classList.remove("highlighted-border"); 
        this.result.current.innerHTML = "";
        this.result.current.classList.remove("show"); 
    }

    onSubmit = (e) => {

        e.preventDefault(); 
        if( this.state.inProgressRequest ) { 
            return;
        }
        this.inProgressBtn();

        // Check Capcha
        if(this.state.captcha == null ) {
            this.result.current.classList.add("error");
            this.result.current.classList.add("show");
            this.result.current.classList.remove("success");
            this.result.current.innerHTML = "Captcha is Required";
            this.stopBtnProgress();
            return;
        }

        // Check if username or password are empty 
        if( this.state.usernameOrEmail === null || this.state.usernameOrEmail === '' || this.state.password === null || this.state.password === '' ) {
            
            this.user_name_or_email.current.classList.add("highlighted-border");
            this.user_password.current.classList.add("highlighted-border");
            this.result.current.classList.add("show");
            this.result.current.classList.add("error");
            this.result.current.classList.remove("success");
            this.result.current.innerHTML = "Email or Username and Password are required !";
            this.stopBtnProgress();
            return;
        }
        
        var data = {
            username_email: this.state.usernameOrEmail,
            user_password: this.state.password,
            capcha: this.state.captcha
        };

        data["Secret-codedtag-api-key"] = this.context.secret;

        var request = axios({
            method: 'post',
            url: '/api/user/login', 
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
                this.result.current.classList.remove("success");              
            } else {
                this.result.current.innerHTML = res.data.data;
                this.result.current.classList.add("success");
                this.result.current.classList.add("show");
                 
                
                setTimeout(() => { 
                    this.props.navHook('/dashboard');
                }, 2000)
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
            <form onSubmit={this.onSubmit} className="highlight-form custom-field-form text-center wrapper max-500 offset-left offset-right ptb-50 hero max-100-hidden plr-15">

                <h1 className='custom-headline lowercase section-head text-center'>
                    Login
                </h1>

                <input onFocus={this.removeHighlightedErrors} onChange={(e) => this.setEmailOrUser(e.target.value)} type="text" ref={this.user_name_or_email}   placeholder="Username or Email" name="username-email" />
                <input onFocus={this.removeHighlightedErrors} onChange={(e) => this.setPassword(e.target.value)} type="text" ref={this.user_password}  placeholder="Password" name="password" />
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
export default withNavigate(Login); 
