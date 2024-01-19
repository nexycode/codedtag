import {Navs} from '../controller/navs';
import logo from './../assets/img/logo-3.png';

var Header = () => {

    return ( 
        <header className="wrapper white-bg border-bottom plr-0">
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
        </header>
    );

}


export default Header;