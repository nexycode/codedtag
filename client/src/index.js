// ===> For Dynamic Routes
// https://ktree.com/blog/creating-dynamic-routes-and-components-using-reactjs.html

// Import Helper Callbacks
import  './options/helpers.js'
import './assets/css/main.min.css';

import React from 'react';
import ReactDom from 'react-dom/client';
import {BrowserRouter, Routes, Route } from 'react-router-dom';


// Tempalte Parts 
import Header from './incs/header';
import Footer from './incs/footer';
import {AdminHeader} from './incs/admin-header';
import {AdminFooter} from './incs/admin-footer';

import AnimatedSidebar from './incs/animated-sidebar'

import {ContextApiKeys} from './utils/api-keys';

// Components 
import {Register} from './components/register'; 
import {ForgetPassword} from './components/forget-password';
import {Home} from './components/home';

// No Distruct
import ChangePassword from './components/change-password';
import ActivitingAccount from './components/activating-account';  
import Login from './components/login';

// Admin Panel
import {Dashboard } from './components/dashboard';



let Components = () => {
      
      var admin = [
            "/dashboard",
            "/menu"
      ];
      
      var isScreen = admin.existsPath(window.location.pathname);

      return (
            <>
                  <React.StrictMode>
                        <ContextApiKeys>
                              <BrowserRouter>

                                    {isScreen ? null: <Header />} 
                                    {/*isScreen ? <AdminHeader /> : null */} 
                                    {isScreen ? null: <AnimatedSidebar />} 
                                          <Routes>
                                                <Route path="/signup" element={<Register />} />
                                                <Route path="/login" element={<Login />} />
                                                <Route path="/forget-password" element={<ForgetPassword />} />
                                                <Route path="/change-password/:code" element={<ChangePassword/>} />
                                                <Route path="/activating-account/:code" element={<ActivitingAccount/>} />
                                          </Routes>

                                          <Routes>
                                                <Route path="/dashboard" element={<Dashboard />} />
                                          </Routes>

                                    {isScreen ? null: <Footer />} 
                                    {/* {isScreen ? <AdminFooter /> : null */ } 
                              </BrowserRouter>                  
                        </ContextApiKeys>
                  </React.StrictMode>
            </>
      );
}


const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<Components/>);