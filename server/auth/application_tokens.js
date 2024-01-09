const jwt = require('jsonwebtoken');
const conf = require("./../conf/configuration");
// CT-public-api-key => in header            
// Secret-codedtag-api-key => in body request     

const verifiy_google_capcha = (req,res, next) => {
    
    var obj = {
        is_error: true,
        data: "Please confirm that you are not a robot.",
        success: false
    }

    if( req.body.capcha === undefined || req.body.capcha == '' ) {
        obj.data = "Please confirm that you are not a robot.";
        return res.send(obj);
    }

    fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${conf.capcha.secret}&response=${req.body.capcha}`)
    .then((res) => {
        return res.json();
    })
    .then((response) => { 
        if(response.success) {
            next();
        }else {
            return res.send(obj);
        }
    });
 

};

const verify_api_keys = ( req, res, next ) => {

    var objx = {
        is_error: true,
        data: "Access Denied !",
        success: false
    };

    var publicKey = req.header("CT-public-api-key");
    var secretKey = req.body["Secret-codedtag-api-key"];

    var decodedPublic = null;
    var decodedSecret = null;

    if( secretKey === undefined || secretKey === "" || publicKey === undefined || publicKey === "" ) {
        objx.data = "Access Denied !";

        return res.status(401).send(objx);
    }

    try {

        decodedPublic = jwt.verify(publicKey, conf.server.keys.public.part);
        decodedSecret = jwt.verify(secretKey, conf.server.keys.secret.part);
 
    } catch(err) {
        return res.status(401).send(objx);
    }

    if( decodedPublic !== '' && decodedPublic.public === conf.server.keys.public.main && decodedSecret !== '' && decodedSecret.secret === conf.server.keys.secret.main  ) {
        next();
    } else {
        return res.status(401).send(objx);
    }
    

}

 


module.exports = { verify_api_keys, verifiy_google_capcha };