const {mongoose} = require("./../conf/connection");


// Create Schema 
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


 /* Subscriber:0, Contributer:1, Editor:2, Author:3, Admin:4 */
 /**
  * 
  * SubScribe: to save email in our database
  * Subscribers are the foundational members of your blog community. They have the privilege of receiving updates and notifications about new content. Subscribers can engage with your blog through comments and likes, fostering a sense of community.
  * 
  * 
  * Contributor
  * Contributors are individuals who can submit their content for review. They have the ability to create and edit their own posts, but these contributions are subject to approval by higher-ranking roles, ensuring content aligns with the blog's standards.
  * 
  * Editor
  * Editors hold a crucial role in maintaining the quality of content. They can review and modify both their own contributions and those of contributors. This role is pivotal for ensuring coherence and adhering to the blog's editorial guidelines.
  * 
  * Author
  * Authors are adept content creators with elevated privileges. They can write, edit, and publish their own posts without requiring approval from higher roles. This autonomy allows them to contribute actively and promptly to the blog.
  * 
  * Admin
  * Administrators have overarching control and authority. They can manage user roles, moderate content, and make crucial decisions about the blog's direction. Admins are responsible for maintaining the overall integrity and functionality of the blog.
  * 
  */
//---------------------------------------------------------------
//---------------           Users
//---------------------------------------------------------------
// Create Schema of DB 
let usersSchema = new Schema({
      _id: ObjectId,
      username:{
            type : String ,
            trim: true  
      },
      firstname: {
            type : String ,
            trim: true  
      },
      secondname: {
            type : String ,
            trim: true  
      },
      password: {
            type: String ,
            trim : true 
      },
      siteurl: {
            type: String ,
            trim : true 
      },
      image:{
            name: String,
            data: Buffer
      },
      email: {
            type: String ,
            trim : true ,
            required:[true , "Required !"],
            validate: {
                  validator: function validateEmail(email) {
                        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return re.test(email);
                  },
                  message: `Invalid Email`
            }
      },
      rule: Number , /* Subscriber:0, Contributer:1, Editor:2, Author:3, Admin:4 */
      about: { type : String , trim :true },
      social_links:{
            type: [
                  {
                        _id:  { type : ObjectId },
                        social_name: { type : String , trim :true },
                        social_link: { type : String , trim :true },
                  }
            ]
      },
      allow_appears_in_search_engine: Boolean,
      send_newsletter: Boolean,
      is_blocked: Boolean,
      is_deleted: Boolean, 
      register_date:Date,
      last_log:Date,
      activated_account: Boolean,
      application_id:  ObjectId,
});

// Create Collection
var User = mongoose.model("users" , usersSchema );



//---------------------------------------------------------------
//---------------           Application
//---------------------------------------------------------------
const ApplicationSchema = new Schema({
      _id: ObjectId,
      user_object: {
            user_id: ObjectId,
            user_email: String,
            user_fullname: String,
            user_mail: String,
      },
      links: [
            {
                  link: String,
                  description: String,
            }
      ],
      description: String,
      app_status: Number, /* Approve:1, in-review: 0: declined: -1 */

});


var Application = mongoose.model("applications" , ApplicationSchema );


module.exports = {User, Application};
