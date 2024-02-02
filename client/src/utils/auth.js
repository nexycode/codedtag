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
        <AuthContext.Provider value={{isAdmin, setIsAdmin }}>
            { children }
        </AuthContext.Provider>
    );

}
var useAuth = () => useContext(AuthContext);


var SecurityContext = createContext();

var SecurityProvider = ({ children }) => {
    
    const session = JSON.parse(localStorage.getItem('session'));

    return (
        <SecurityContext.Provider value={{ session }}>
            {
                session == null || session.rule == 0 ?
                "" 
                : children
            }
        </SecurityContext.Provider>
    );
    
}

var useSecurity = () => useContext(SecurityContext);

export {
    
    AuthProvider,
    useAuth,

    SecurityProvider,
    useSecurity

};
