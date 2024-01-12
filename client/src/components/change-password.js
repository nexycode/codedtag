import React, {Component} from "react"; 
import siteKey from './../options/captcha'; 
import { Link, useParams } from "react-router-dom";
import axios from 'axios'; 
import {ApiKeysContext} from './../utils/api-keys';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class ChangePassword extends Component {
    
    static contextType = ApiKeysContext;

    constructor(props) {
        
        super(props);

        // Init States 
        this.state = {
            request: 0,
            password: null,
            confirmPassword: null,
            userExists: null,
            response: "Loading ..."
        }
        
        // Use Refs
        this.user_password = React.createRef(); 
        this.user_confirm_password = React.createRef(); 
        this.buttonSubmit = React.createRef(); 
        this.result = React.createRef(); 




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
        this.buttonSubmit.current.innerHTML='<span class="loader"></span>';
    }

    stopBtnProgress = () => { 
        this.buttonSubmit.current.innerHTML="Change my Password";
    }
    
    setResponse = (value) => {
        this.setState({
            response: value
        })
    }

    setPassword = (value) => {
        this.setState({
            password: value
        })
    }

    setConfirmPassword = (value) => {
        this.setState({
            confirmPassword: value
        })
    }

    setUserExists = (value) => {
        this.setState({
            userExists: value
        })
    }

    componentDidUpdate = () => {
        
        var _this = this;

        this.state.request++;
        if( this.state.request > 1 ) {
            return; 
        }
        
        let { code } = this.props.params;

        var data = {
            code: code
        };

        data["Secret-codedtag-api-key"] = this.context.secret;

        var request = axios({
            method: 'post',
            url: '/api/user/verify-token', 
            data:data,
            headers: {
                'CT-public-api-key': this.context.public
            }
        }); 

        request.then(function(resp){
             
            if( resp.data.is_error ) {
                
                _this.setResponse(resp.data.data);
            } else { 
                _this.setUserExists(true);
            }
        }, function(err){}); 

        
    }
     /*
    componentDidUpdate = () => {
        console.log('Component updated');
    }
   */
    
    inProgressBtn = () => { 
        this.buttonSubmit.current.innerHTML='<span class="loader"></span>';
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        this.user_password.current.classList.remove("highlighted-border");
        this.user_confirm_password.current.classList.remove("highlighted-border");
        this.inProgressBtn();

        // Check if they empty 
        if( this.state.password === null || this.state.confirmPassword == null ) {

            this.result.current.classList.add("error");
            this.result.current.classList.add("show");
            this.result.current.innerHTML = "In the blank spaces provided, kindly enter your new password twice.";
            
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

        let { code } = this.props.params;

        var data = {
            code: code,
            password: this.state.password
        };

        data["Secret-codedtag-api-key"] = this.context.secret;

        var request = axios({
            method: 'post',
            url: '/api/user/change-password', 
            data:data,
            headers: {
                'CT-public-api-key': this.context.public
            }
        }); 
        var _this = this;

        request.then(function(resp){
            _this.stopBtnProgress();
            if( resp.data.is_error ) {
                _this.setResponse(resp.data.data);
            } else {
                
                var objex = resp.data;
                if(objex.is_error) {
                    _this.setResponse(objex.data);
                    
                } else {
                    _this.setResponse(objex.data);
                    _this.result.current.innerHTML = objex.data;
                    _this.result.current.classList.add("success");
                    _this.result.current.classList.add("show");

                    setTimeout(()=>{
                        window.location.href = "/login";
                    }, 2000);
                }

            }
        }, function(err){}); 

    }

    render = () => {
        
        let render = (<div style={{background:'#ee', borderColor:"#eee"}} className="content-center items-center highlight-form custom-field-form text-center wrapper max-500 offset-left offset-right ptb-50 hero max-100-hidden plr-15">
            <p style={{padding: '0px', margin: '0px'}}> 
                {this.state.response}
            </p>
        </div>);

        if( this.state.userExists ) { 
            render = (<form onSubmit={this.onSubmit} className="highlight-form custom-field-form text-center wrapper max-500 offset-left offset-right ptb-50 hero max-100-hidden plr-15">
            <h1 className='custom-headline lowercase section-head text-center'>
                Change Password
            </h1> 
            
            <input ref={this.user_password} onInput={this.onInputPasswords} onChange={(e) => this.setPassword(e.target.value)} type="text" placeholder="Your New Password" name="username-email" />
            <input ref={this.user_confirm_password} onInput={this.onInputPasswords} onChange={(e) => this.setConfirmPassword(e.target.value)} type="text" placeholder="Confirm the New Password" name="username-email" />
                
            <div className="response" ref={this.result}></div>

            <button ref={this.buttonSubmit} type="submit" className='btn third-btn radius-5 custom-header-btn offset-left full-wide-btn xl ht-sign'>
                Change My Password 
            </button>

            </form>);
        }

        return render;
    };

}
 
export default withParams(ChangePassword);