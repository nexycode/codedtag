const {Menu} = require("./../models/menus");

const express = require("express"); 
var menuRouters = express.Router();
 
// Tokens and Api Keys
const { verify_api_keys } = require("./../auth/application_tokens.js");

// need another middlware for user privelage


// API urls


// Add new menu 
menuRouters.post("/menu/add-and-update", (req, res) => {

    
    var response = {

    };

    var menu_id = req.body.menu_id;
    
    /*
        name
        items []
            link
            text
            svg
            router
            path
            component
            subitem
                link
                text
                svg
                router
                path
                component
        created_by {}
            user_id
            user_name
            user_email
        last_update_by
            user_id
            user_name
            user_email
        last_update_date
        date_made
    */

    // update
    if( menu_id ) {


        return res.send(response);
    }


    // Add new one 

});


// Remove Menu  

// Get menus or menu

module.exports = {menuRouters};
