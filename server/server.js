const express = require("express");
const {mongoose} = require("./conf/connection");
const conf = require("./conf/configuration");
const bodyParser = require('body-parser');
const path = require("path");
const session = require('express-session');
 

// Routers
const {userRouters} = require("./api/users");
const {menuRouters} = require("./api/menus");
const {keyRouters} = require("./api/tokens");
 

var app = express();
 
app.use(session({
    secret: conf.server.keys.session, 
    resave: false,
    saveUninitialized: true,
}));


//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

/*
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE'); // => OPTIONS, PUT,
    res.header('Access-Control-Allow-Headers', 'Content-Type , ct-public-api-key, X-api-keys , X-api-app-name , X-app-token'); // X-Requested-With
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
*/

app.use( conf.server.api, keyRouters );
app.use( conf.server.api, menuRouters );
app.use( conf.server.api,  userRouters );
 
 

app.listen(conf.server.port, () => console.log(`The server is running on port ${conf.server.port}`));