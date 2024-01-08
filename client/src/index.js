// ===> For Dynamic Routes
// https://ktree.com/blog/creating-dynamic-routes-and-components-using-reactjs.html


import React from 'react';
import ReactDom from 'react-dom/client';

// Tempalte Parts 
import Header from './incs/header';
import Footer from './incs/footer';
import AnimatedSidebar from './incs/animated-sidebar'

// Pages
import Home from './components/Home';


let Component = (prop) => {
      return (
            <div>
                  {prop.elem}
            </div>
      );
}

let Components = () => {
      {
            var Page = [{
                  home: Home
            }];
      }
      return (
            <>
            <React.StrictMode>
                  <Header />
                  <AnimatedSidebar />
                  
                  <Component elem={Page[0].home} />
                  
                  <Footer />
            </React.StrictMode>
            </>
      );
}


const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<Components/>);