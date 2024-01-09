// ===> For Dynamic Routes
// https://ktree.com/blog/creating-dynamic-routes-and-components-using-reactjs.html


import React from 'react';
import ReactDom from 'react-dom/client';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/css/main.min.css';

// Tempalte Parts 
import Header from './incs/header';
import Footer from './incs/footer';
import AnimatedSidebar from './incs/animated-sidebar'

import {ContextApiKeys} from './utils/api-keys.js';

// Components 
import {Register} from './components/register.js'; 
import {Login} from './components/login.js';
import {ActivitingAccount} from './components/activating-account.js';  



let Component = ({element}) => {
      return element();
}

let Components = () => { 
      return (
            <>
            <React.StrictMode>
                  <BrowserRouter>
                        <ContextApiKeys>
                              <Header />
                              <AnimatedSidebar /> 
                              <Routes>
                                    
                                    <Route path="login/" element={<Component element={Login} />} />
                                    <Route path="register/" element={<Component element={Register} />} />
                                    <Route path="activating-account/:code/" element={<Component element={ActivitingAccount} />} />

                              </Routes>
                              <Footer />
                        </ContextApiKeys>
                  </BrowserRouter>
            </React.StrictMode>
            </>
      );
}


const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<Components/>);