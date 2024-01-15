//https://www.npmjs.com/package/react-script-tag

import { Component } from "react"; 
import Icons from './../options/icons';

import './../assets/css/admin.min.css'

class Dashboard extends Component {
     

    componentDidMount = () => {
        
    }

    render = () => {
        
        return (
            <>
                <header className="wrapper white-bg border-bottom plr-0">
                    <nav className="flexbox items-center offset-left offset-right plr-15 max-1150">
                        <ul className="inline-list left-p-30 main-nav font-13 bold-list">
                            <li>
                                <a href='#' className="flexbox items-center">
                                    <span className="flexbox items-center mr-5">
                                        {Icons.view}
                                    </span>
                                    <span>
                                        View Account
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

                            <li className="has-subitem">
                                <a href='#' className="flexbox items-center make-bg-hover">
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
                                                <span className="mr-5 flexbox">{Icons.articles}</span>    
                                                <span>My Articles</span>
                                            </a>
                                        </li>

                                        <li>
                                            <a href='#' className="flexbox items-center">
                                                <span className="mr-5 flexbox">{Icons.question}</span>    
                                                <span>My Questions</span>
                                            </a>
                                        </li>

                                        <li>
                                            <a href='#' className="flexbox items-center">
                                                <span className="mr-5 flexbox">{Icons.answer}</span>    
                                                <span>My Answers</span>
                                            </a>
                                        </li>

                                        <li>
                                            <a href='#' className="flexbox items-center">
                                                <span className="mr-5 flexbox">{Icons.setting}</span>    
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

                            
                        </ul>

                        

                    </nav>
                </header>
            </>
        );

    }
}


export {Dashboard};