import {Navs} from '../controller/navs';
import logo from './../assets/img/logo-3.png';
import {screens} from './../options/helpers.js'
import './../options/prototypes.js'
import { useState } from 'react';
import Icons from './../options/icons';
import {useAuth} from './../utils/auth.js'


var BasicHeader = () => {
    return (<header className="wrapper white-bg border-bottom plr-0">
                <nav className="flexbox items-center offset-left offset-right plr-15 max-1150">
                    
                    <a className="site-logo" href="#">
                        <img src={logo} alt="Logo Site" width="135" height="36" />
                    </a>

                    <Navs 
                        position="" 

                        outerSpaceLeft=""
                        outerSpaceRight=""
                        outerSpaceBoth="" 

                        innerSpaceLeft="left-p-30"  
                        innerSpaceRight=""  
                        innerSpaceBoth=""  

                        navName="inline-list main-nav" 
                    />


                    <Navs 
                        position="right" 
                        
                        outerSpaceLeft=""
                        outerSpaceRight=""
                        outerSpaceBoth="mlr--15" 

                        innerSpaceLeft="left-p-30"  
                        innerSpaceRight=""  
                        innerSpaceBoth=""  

                        navName="inline-list" 
                    />

                </nav>
            </header>);
}

var AdminHeader = () => {
    return (
        <header className="wrapper white-bg border-bottom plr-0">
            <nav className="flexbox items-center offset-left offset-right plr-15 max-1150">
                
                <ul className="inline-list left-p-30 main-nav font-13 bold-list">
                    <li>
                        <a href='#' className="flexbox items-center">
                            <span className="flexbox items-center mr-5">
                                {Icons.view}
                            </span>
                            <span>
                                View Site
                            </span>
                        </a>
                    </li> 
                </ul>

                <ul className="inline-list left-p-30 main-nav font-13 bold-list offset-right">
                    <li className="has-icon-only has-label">
                        <a href="#">
                            <span className="flexbox items-center">
                                {Icons.notification}
                            </span>
                            <span className="flexbox items-center content-center">10</span>
                        </a>
                    </li>                             
                </ul>

                

            </nav>
        </header>
    );
}

var Header = () => {
    
    var {isAdmin} = useAuth(); 
    // isAdmin? <AdminHeader/>: 
    return <BasicHeader/>
}


export default Header;




 /* 
        
        <li className="has-subitem">
                                <a href='#' className="flexbox items-center make-bg-hover">
                                   <span>
                                    Lilian Micha'el 
                                   </span>
                                   <span className="flexbox items-center img-thumb-cover">
                                        <img src="https://webdeveloper.com/wp-content/uploads/2022/05/ManoelaIlic_Portrait-46x50.jpg" alt="Profile" />
                                   </span> 
                                </a>
                                <div className="user-menu right-position">
                                    <div className="user-name flexbox column-direction content-center">
                                        <a href="#">
                                            Lilian Micha'el
                                        </a>
                                        <span>
                                            @lilian
                                        </span>
                                    </div>
                                    <ul>

                                        <li>
                                            <a href='#' className="flexbox items-center">
                                                <span className="mr-5 flexbox icon-x35">{Icons.articles}</span>    
                                                <span>My Articles</span>
                                            </a>
                                        </li>

                                        <li>
                                            <a href='#' className="flexbox items-center">
                                                <span className="mr-5 flexbox icon-x35">{Icons.question}</span>    
                                                <span>My Questions</span>
                                            </a>
                                        </li>

                                        <li>
                                            <a href='#' className="flexbox items-center">
                                                <span className="mr-5 flexbox icon-x35">{Icons.answer}</span>    
                                                <span>My Answers</span>
                                            </a>
                                        </li>

                                        <li>
                                            <a href='#' className="flexbox items-center">
                                                <span className="mr-5 flexbox icon-x35">{Icons.setting}</span>    
                                                <span>Account Settings</span>
                                            </a>
                                        </li> 
                                    </ul>

                                    <div className="flexbox pt-xsdsd logout-in-menu">
                                        <a>
                                            Logout
                                        </a>
                                    </div>

                                </div>

                                
                            </li> 
        */