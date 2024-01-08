import React, {createRef} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import siteKey from './../options/captcha';

/*

    To Verify Capcha
    https://www.google.com/recaptcha/api/siteverify?secret=${SITE_SECRET}&response=${captchaValue}
    https://clerk.com/blog/implementing-recaptcha-in-react
    response: 
    {
        "success": false,
        "error-codes": [
            "timeout-or-duplicate"
        ]
    }
*/

let Register = () => {
    
    const capchaOnRef = React.createRef();

    var capchaOnChange = function(value) { 
        
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const recaptchaValue = capchaOnRef.current.getValue();
        console.log(recaptchaValue);
    }
      
    return (
          <form onSubmit={onSubmit} className="custom-field-form text-center wrapper max-500 offset-left offset-right ptb-50 hero  plr-15">
            <h1 className='custom-headline lowercase section-head text-center'>
                Sign up
            </h1> 
            <p>Come join us today and be part of making CodedTag.com even better for the future.</p>
            
            <input type="text" placeholder="Username" name="username" />
            <input type="text" placeholder="Your Full Name" name="username" />
            <input type="text" placeholder="You Email" name="username" />
            <input type="text" placeholder="Password" name="username" />
            <input type="text" placeholder="Confirm Password" name="username" />

            

            <div className="flexbox items-center flex-wrap mb-20 gap-20">
                <ReCAPTCHA
                    sitekey={siteKey.public}
                    onChange={capchaOnChange}
                    ref={capchaOnRef}
                />
            </div>

            <p>
            Or do you have an account? Login
            </p>
            <div className="response error">
            Error in capcha please confirm that you are not a robot Error in capcha please confirm that you are not a robot
            </div>
            <button type="submit" className='btn third-btn radius-5 custom-header-btn offset-left full-wide-btn xl'>
                Register
            </button>
          </form>
    );
}


export {Register};