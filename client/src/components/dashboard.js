//https://www.npmjs.com/package/react-script-tag

import { Component } from "react"; 


import './../assets/css/admin.min.css'

class Dashboard extends Component {
     

    componentDidMount = () => {
        
    }

    render = () => {
         
       
        return (
            <> 
                <div>
                    Hello World
                </div>
            </>
        );

    }
}


export {Dashboard};



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