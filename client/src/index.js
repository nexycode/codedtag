// ===> For Dynamic Routes
// https://ktree.com/blog/creating-dynamic-routes-and-components-using-reactjs.html

// Import Helper Callbacks
import  './options/helpers.js'
import './assets/css/main.min.css';

import React,  { useState }  from 'react';
import ReactDom from 'react-dom/client';
import {BrowserRouter, Routes, Route } from 'react-router-dom';


// Tempalte Parts 
import Header from './incs/header';
import Footer from './incs/footer';  

import AdminHeader from './incs/admin-header';
import AdminFooter from './incs/admin-footer';

import AnimatedSidebar from './incs/animated-sidebar'

import {ContextApiKeys} from './utils/api-keys';
import {AuthProvider, SecurityProvider} from './utils/auth.js';

// Components 
import {Register} from './components/register'; 
import {ForgetPassword} from './components/forget-password';
import {Home} from './components/home';
import {NotFound} from './components/not-found';
// No Distruct
import ChangePassword from './components/change-password';
import ActivitingAccount from './components/activating-account';  
import Login from './components/login';

// Admin Panel
import {Dashboard } from './components/dashboard'; 



let Components = () => {
       
        
      return (
            <>
                  <React.StrictMode>
                        <ContextApiKeys>
                              <AuthProvider>
                                    <BrowserRouter>
                              
                                          <Header />
                                          <AnimatedSidebar />
                                                
                                                
                                                
                                                <Routes>


                                                      
                                                           
                                          
                                                      <Route path="/dashboard" element={<SecurityProvider><AdminHeader /> <Dashboard /><AdminFooter /></SecurityProvider>} />
                                                          
                                                           
                                                      

                                                

                                                      <Route path="/" element={<Home />} />
                                                      <Route path="/signup" element={<Register />} />
                                                      <Route path="/login" element={<Login />} />
                                                      <Route path="/forget-password" element={<ForgetPassword />} />
                                                      <Route path="/change-password/:code" element={<ChangePassword/>} />
                                                      <Route path="/activating-account/:code" element={<ActivitingAccount/>} />
                                                      <Route path="*" element={<NotFound/>} />

                                                </Routes>

                                                

                                          <Footer />

                                    </BrowserRouter>  
                              </AuthProvider>                
                        </ContextApiKeys>
                  </React.StrictMode>
            </>
      );
}


const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<Components/>);