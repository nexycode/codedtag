import React, {Component} from "react"; 
import siteKey from './../options/captcha'; 
import { Link, useParams } from "react-router-dom";
import axios from 'axios'; 
import {ApiKeysContext} from './../utils/api-keys';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class ActivitingAccount extends Component {
    
    static contextType = ApiKeysContext;

    constructor(props) {
        
        super(props);

        // Init States 
        this.state = { 
            request: 0,
            resValue: "Currently it is verifying your account. Please wait a few moments, and you will be redirected to your account!" 
        }
        
        this.response = React.createRef();
        

    }
    
    setResValue = (value) => {
        this.setState({
            resValue: value
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
            url: '/api/user/verify-activation-link', 
            data:data,
            headers: {
                'CT-public-api-key': this.context.public
            }
        }); 

        request.then(function(resp){
            console.log(resp.data.data);
            setTimeout(()=>{
                     
                if(resp.data.is_error) { 
                    _this.response.current.classList.add("error");
                    _this.response.current.classList.add("show");                
                } else {
                    _this.response.current.classList.add("success");
                    _this.response.current.classList.add("show");    
                }
                
                _this.setResValue(resp.data.data);

                setTimeout(()=>{
                   window.location.href ="/login";
                }, 2000);
                
            }, 3000);

        }, function(err){}); 

        
    }
     

    render = () => {
        return (
            <div className='custom-field-form text-center wrapper max-960 offset-left offset-right ptb-50 hero  plr-15'>
                <div ref={this.response} className='highlighted-block response'>
                    {this.state.resValue}
                </div>
            </div>
        );
         
    };

}
 
export default withParams(ActivitingAccount);