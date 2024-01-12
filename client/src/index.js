// ===> For Dynamic Routes
// https://ktree.com/blog/creating-dynamic-routes-and-components-using-reactjs.html


import React from 'react';
import ReactDom from 'react-dom/client';
import {BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './assets/css/main.min.css';

// Tempalte Parts 
import Header from './incs/header';
import Footer from './incs/footer';
import AnimatedSidebar from './incs/animated-sidebar'

import {ContextApiKeys} from './utils/api-keys';

// Components 
import {Register} from './components/register'; 
import {Login} from './components/login';
import {ForgetPassword} from './components/forget-password';
import {Home} from './components/home';

import ChangePassword from './components/change-password';
import ActivitingAccount from './components/activating-account';  

let Components = () => { 
      return (
            <>
            <React.StrictMode>
            <ContextApiKeys>
                  <BrowserRouter>
                        
                              <Header />
                              <AnimatedSidebar /> 
                              <Routes>
                                    
                                    <Route path="/signup" element={<Register />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/forget-password" element={<ForgetPassword />} />
                                    <Route path="/change-password/:code" element={<ChangePassword/>} />
                                    <Route path="/activating-account/:code" element={<ActivitingAccount/>} />
                                     
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