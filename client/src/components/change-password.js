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
 

    render = () => {
        
        return (
            <h1>
                Change Password .. {this.code}
            </h1>
        );
    };

}
 
export default withParams(ChangePassword);