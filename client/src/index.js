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

import {ContextApiKeys} from './utils/api-keys';

// Components 
import {Register} from './components/register'; 
import {Login} from './components/login';
import {ActivitingAccount} from './components/activating-account';  
import {ForgetPassword} from './components/forget-password';
import {ChangePassword} from './components/change-password';
let Component = ({element}) => {
      return element();
}

let Components = () => { 
      return (
            <>
            <React.StrictMode>
            <ContextApiKeys>
                  <BrowserRouter>
                        
                              <Header />
                              <AnimatedSidebar /> 
                              <Routes>
                                    
                                    <Route path="/login" element={<Component element={Login} />} />
                                    <Route path="/signup" element={<Component element={Register} />} />
                                    <Route path="/forget-password" element={<Component element={ForgetPassword} />} /> 
                                    <Route path="/change-password/:code" element={<Component element={ChangePassword} />} />
                                    <Route path="/activating-account/:code" element={<Component element={ActivitingAccount} />} />
                                    
                                     
                              </Routes>
                              <Footer />
                  </BrowserRouter>
            </ContextApiKeys>
                  
            </React.StrictMode>
            </>
      );
}


const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<Components/>);