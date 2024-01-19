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
//---------------           Menus
//---------------------------------------------------------------
// Create Schema of DB 
let MenusSchema = new Schema({
      id: {
            type: mongoose.Schema.Types.ObjectId,
            // default: mongoose.Types.ObjectId
      },
      name:{
            type : String ,
            trim: true  
      },
      items:{
            type: [
                        {
                              id:  { type: mongoose.Schema.Types.ObjectId },
                              link: { type : String , trim :true }, 
                              text: { type : String , trim :true }, 
                              //classes: { type : String , trim :true }, 
                              svg: { type : String , trim :true }, 
                              router: { type : String , trim :true }, 
                              path: { type : String , trim :true }, 
                              component: { type : String , trim :true }, 
                              subitem: [
                                    {
                                          id:  { type: mongoose.Schema.Types.ObjectId },
                                          link: { type : String , trim :true }, 
                                          text: { type : String , trim :true }, 
                                          // classes: { type : String , trim :true }, 
                                          svg: { type : String , trim :true }, 
                                          router: { type : String , trim :true }, 
                                          path: { type : String , trim :true }, 
                                          component: { type : String , trim :true }, 
                                    }
                              ],  
                        }
            ]
      },
      
      created_by: {
            user_id: String,
            user_name: String,
            user_email: String,
      },
      last_update_by:  {
            user_id: String,
            user_name: String,
            user_email: String,
      },
      last_update_date: Date,
      date_made:Date

});

// Create Collection
var Menu = mongoose.model("menus" , MenusSchema );

module.exports = { Menu }


