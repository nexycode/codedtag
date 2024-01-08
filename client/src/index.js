// ===> For Dynamic Routes
// https://ktree.com/blog/creating-dynamic-routes-and-components-using-reactjs.html


import React from 'react';
import ReactDom from 'react-dom/client';

// Tempalte Parts 
import Header from './incs/header';
import Footer from './incs/footer';
import AnimatedSidebar from './incs/animated-sidebar'

// Pages 


let Home = () => {
      return (
            <h1>
                  Hello World !!
            </h1>
      );
}
let Component = ({element}) => {
      return element();
}

let Components = () => { 
      return (
            <>
            <React.StrictMode>
                  <Header />
                  <AnimatedSidebar /> 
                        <Component element={Home} />
                  <Footer />
            </React.StrictMode>
            </>
      );
}


const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<Components/>);