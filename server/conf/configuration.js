 

var conf = { 
      capcha: { 
            secret:'6LefOUopAAAAAKDP80U5BQ8v-U10T_H2IF0WCZ9P'
      },
      server: {
            api: "/api",
            devMode: true, 
            port: process.env.port || 5000,
            root: { 
                  client: "http://localhost:3000",
                  server: "localhost"
            },
            // think how to hide the secret one when send it to client
            keys: { 
                  session: 'cxczas[poiuuy12{C$RD#}$%&*()D_F+D)F(DD14vb^&*njfhj@#h*#$&^gj5dfg87',
                  secret: {
                        part: "++&&full-stack-developer&&++",
                        main: "CT@#$%^&*()_+}%%**Coded^^^^^Tag**%%+}{88**%%^^XX"
                  },
                  public: {
                        part: "Codedtag Tutorial Community",
                        main: "#12sdswe457vdsfkjsdn445qw42@#$%^&*()_+}{89%%$#@!@#{}66XCVBm"
                  }
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
                  confirmation_link: "[HOST-NAME]/activating-account/[USER-TOKEN]"
            },

            reset_password: {
                  sender: "moun2030@gmail.com",
                  // change this part only = https://example.com/activation-link
                  reset_link: "[HOST-NAME]/change-password/[USER-TOKEN]"
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

 
// Client Activation Link
conf.email.confirm_email.confirmation_link = conf.email.confirm_email.confirmation_link.replace("[HOST-NAME]", conf.server.root.client);
conf.email.reset_password.reset_link = conf.email.reset_password.reset_link.replace("[HOST-NAME]", conf.server.root.client);

// Database
conf.database.link = `${conf.database.host}:${conf.database.port}/${conf.database.name}` ;
 

module.exports = conf;