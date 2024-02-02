import {Navs} from '../controller/navs';
import logo from './../assets/img/logo-3.png';
import {screens} from './../options/helpers.js'
import './../options/prototypes.js'
import { useState } from 'react';
import Icons from './../options/icons';
var Header = () => {


    var isAdmin = screens.existsPath(window.location.pathname);
    

    var defaultHeader = <header className="wrapper white-bg border-bottom plr-0">
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
        </header>;

        var [stateHeader, setStateHeader] = useState(defaultHeader);

        if( isAdmin ) {
            var adminHeader = <header className="wrapper white-bg border-bottom plr-0">
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
                    </header>;

            setStateHeader(adminHeader);
        }

    return ( 
        defaultHeader
    );

}


export default Header;