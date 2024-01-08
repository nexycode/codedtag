const express = require("express");
const {mongoose} = require("./conf/connection");
const conf = require("./conf/configuration");
const bodyParser = require('body-parser');

// Routers
const {userRouters} = require("./api/users");
const {menuRouters} = require("./api/menus");
const {keyRouters} = require("./api/tokens");

var app = express();
 
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use( conf.server.api, keyRouters );
app.use( conf.server.api, menuRouters );
app.use( conf.server.api,  userRouters );




app.listen(conf.server.port, () => console.log(`The server is running on port ${conf.server.port}`));