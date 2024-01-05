 

var conf = { 

      server: {
            devMode: true, 
            port: process.env.port || 5000,
            root: {
                  dev: `http://localhost`, 
                  ip: ""
            } 
      }, 
      

      database: {
            link: '',
            name: "codedtag",
            host: "mongodb://localhost",
            port: "27017",
            options: {
                  useMongoClient : true
            }
      } 
 

};

// Configure Ip Addresses
conf.server.root.dev = `${conf.server.root.dev}:${conf.server.port}/` ;
conf.database.link = `${conf.database.host}:${conf.database.port}/${conf.database.name}` ;





module.exports = conf;