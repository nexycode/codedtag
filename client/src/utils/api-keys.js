import { createContext, useEffect, useState } from "react";


// Creaste Context 
var ApiKeysContext = createContext({public: '',secret: ''});

// Wrap Context 
var ContextApiKeys = ({children}) => {

    // send request
    const [apiKey, setApiKey] = useState({public: '',secret: ''})
     
    useEffect(() =>{ 

        fetch(`/api/code`)
        .then((res) => {
            return res.json();
        })
        .then((response) => {
            if( !response.is_error ) {
                
                var keys = response.data.split("CODEDtag");
                
                setApiKey({
                    public:keys[1],
                    secret: keys[0]
                });

            }
             
        });


        

    },[]);
 
    return (
        <ApiKeysContext.Provider value={apiKey}>
            {children}
        </ApiKeysContext.Provider>
    );
}

export {ApiKeysContext, ContextApiKeys}