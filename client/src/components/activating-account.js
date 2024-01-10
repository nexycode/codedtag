import { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useHistory, Link  } from 'react-router-dom';
import {ApiKeysContext} from './../utils/api-keys';
import axios from 'axios'; 

var ActivitingAccount = () => {

    var keys = useContext(ApiKeysContext);
    const {code} = useParams();
    const [codeValue, setCodeValue] = useState(code); 
    const result = useRef(0);
    {
         

        var verifyUserAccount = () => {
            alert();
            var data = {
                code: codeValue
            };
        
            data["Secret-codedtag-api-key"] = keys.secret;
        
            var request = axios({
                method: 'post',
                url: '/api/user/verify-activation-link', 
                data:data,
                headers: {
                    'CT-public-api-key': keys.public
                }
            });
        
            const success = res => {  
                if( res.data.is_error ) {
                    
                    result.current.classList.add("error");
                    result.current.classList.add("show");                
                } else {
                    
                    result.current.classList.add("success");
                    result.current.classList.add("show");
                } 
            };
        
            const error = res => {
                if(res.response.data.is_error) {
                    
                    result.current.classList.add("error");
                    result.current.classList.add("show");               
                }
            };
        
            
            request.then(success, error)
        };

    }

    // Verify user
    return (
        <div className='custom-field-form text-center wrapper max-960 offset-left offset-right ptb-50 hero  plr-15'>
            <div onLoad={e => console.log("Loaded")} ref={result} className='highlighted-block response'>
                Currently it is verifying your account. Please wait a few moments, and you will be redirected to your account!
            </div>
        </div>
    );

}


export {ActivitingAccount};