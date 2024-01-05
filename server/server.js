const express = require("express");
const {mongoose} = require("./conf/connection");
const conf = require("./conf/configuration");


// Models
const user = require("./models/users");
 

var app = express();

app.get("/api", (req, res) => {
      res.json({
            "project": "CodedTag",
            "Developer": "Montasser Mossallem",
            "type": "Community"
      });
});



app.listen(conf.server.port, () => console.log(`The server is running on port ${conf.server.port}`));