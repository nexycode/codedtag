// ===> For Dynamic Routes
// https://ktree.com/blog/creating-dynamic-routes-and-components-using-reactjs.html


import React from 'react';
import ReactDom from 'react-dom/client';

// Tempalte Parts 
import Header from './components/header';
import Footer from './components/footer';
import AnimatedSidebar from './components/animated-sidebar'





let Components = () => {
      return (
            <>
            <React.StrictMode>
                  <Header />
                  <AnimatedSidebar />
                  
                  <h1>
                        Hello CodedTag Readers ...
                  </h1>
                  
                  <Footer />
            </React.StrictMode>
            </>
      );
}


const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<Components/>);