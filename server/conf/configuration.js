 

var conf = { 

      server: {
            api: "/api",
            // think how to hide the secret one when send it to client
            keys: { 
                  secret: {
                        part: "++&&full-stack-developer&&++",
                        main: "CT@#$%^&*()_+}%%**Coded^^^^^Tag**%%+}{88**%%^^XX"
                  },
                  public: {
                        part: "Codedtag Tutorial Community",
                        main: "#12sdswe457vdsfkjsdn445qw42@#$%^&*()_+}{89%%$#@!@#{}66XCVBm"
                  }
            },
            devMode: true, 
            port: process.env.port || 5000,
            root: {
                  dev: `http://localhost`, 
                  ip: "https://codedtag.com"
            } 
      }, 
      
      email: {

            settings: {
                  service: 'gmail',
                  auth: {
                    user: 'moun2030@gmail.com',
                    pass: 'xufikrbklofqvrkb'
                  }
            },
            
            
            confirm_email: { 
                  sender: "moun2030@gmail.com",
                  // change this part only = https://example.com/activation-link
                  confirmation_link: "https://example.com/activation-link?code=[USER-TOKEN]"
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


//console.log(conf.database.link);


module.exports = conf;