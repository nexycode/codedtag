import { createContext, useEffect, useState } from "react";


// Creaste Context 
var ApiKeysContext = createContext({public: '',secret: ''});

// Wrap Context 
var ContextApiKeys = ({children}) => {

    // send request
    const [apiKey, setApiKey] = useState({public: '',secret: ''})

    useEffect(() =>{
        
        setApiKey({
            public: "CodedTag Public Key",
            secret: "CodedTag Secret Key"
        })
    },[]);
 
    return (
        <ApiKeysContext.Provider value={apiKey}>
            {children}
        </ApiKeysContext.Provider>
    );
}

export {ApiKeysContext, ContextApiKeys}