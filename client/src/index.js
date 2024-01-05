import React from 'react';
import ReactDom from 'react-dom/client';







let Components = () => {
      return (
            <h1>
                  Hello CodedTag Readers
            </h1>
      );
}


const root = ReactDom.createRoot(document.getElementById("root"));
root.render( <Components/>);