import { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useHistory, Link, useNavigate  } from 'react-router-dom';
import {ApiKeysContext} from './../utils/api-keys';
import axios from 'axios'; 

var ActivitingAccount = () => {

    let keys = useContext(ApiKeysContext);
     
    let {code} = useParams();
    let response = useRef();
    let [codeValue, setCodeValue] = useState(code); 
    let [resValue, setResValue] = useState({
        data: "Currently it is verifying your account. Please wait a few moments, and you will be redirected to your account!" 
    });

     

    useEffect(() => {
 
        if(keys.public !== '') {

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
    

            request.then(function(resp){
                setTimeout(()=>{
                     
                    if(resp.data.is_error) { 
                        response.current.classList.add("error");
                        response.current.classList.add("show");                
                    } else {
                        response.current.classList.add("success");
                        response.current.classList.add("show");    
                    }

                    setResValue(resp.data);

                    setTimeout(()=>{
                        window.location.href ="/login";
                    }, 2000);
                    
                }, 3000);
            }, function(err){}); 

        }
    },[keys.public]);

    

    // Verify user
    return (
        <div className='custom-field-form text-center wrapper max-960 offset-left offset-right ptb-50 hero  plr-15'>
            <div ref={response} className='highlighted-block response'>
                {resValue.data}
            </div>
        </div>
    );

}


export {ActivitingAccount};