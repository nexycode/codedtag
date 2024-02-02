import "./../options/prototypes";
import { createContext, useContext, useState, useEffect } from "react";
import {screens} from './../options/helpers.js';


 
var AuthContext = createContext();

var AuthProvider = ({ children }) => {
    
    const [isAdmin, setIsAdmin] = useState(false);
    

    // Getting current screen status
    useEffect(() => {
        
        var current = window.location.pathname;
        var isAdminScreen = screens.existsPath(current); 
        setIsAdmin(isAdminScreen);

    }, []);

    return (
        <AuthContext.Provider value={{isAdmin, setIsAdmin}}>
            { children }
        </AuthContext.Provider>
    );

}

var useAuth = () => useContext(AuthContext);

export {
    
    AuthProvider,
    useAuth

};
