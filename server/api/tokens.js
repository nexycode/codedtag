const conf = require("./../conf/configuration");
const express = require("express");
const jwt = require('jsonwebtoken');
var keyRouters = express.Router();


keyRouters.get("/code", (req, res) => {
    
    var objx = {
        is_error: true,
        data: "Something Went Wrong!",
        success: false
    };

    var publicToken = null;
    var secretToken = null;
    try {

        publicToken = jwt.sign({ public: conf.server.keys.public.main },  conf.server.keys.public.part);
        secretToken = jwt.sign({ secret: conf.server.keys.secret.main },  conf.server.keys.secret.part);
    
    } catch( error ) {
        return res.send(objx); 
    }
    
    if( secretToken == null || publicToken == null ) {
        return res.send(objx); 
    }

    objx.is_error = false;
    // extract it in client
    objx.data = `${secretToken}CODEDtag${publicToken}`;
    objx.success = true; 

    return res.send(objx); 
});


module.exports = {keyRouters};




