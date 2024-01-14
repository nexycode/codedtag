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
                                        Visit Site
                                    </span>
                                </a>
                            </li> 
                        </ul>

                        <ul className="inline-list left-p-30 main-nav font-13 bold-list offset-right">
                            <li className="has-subitem">
                                <a href='#' className="flexbox items-center make-bg-hover">
                                   <span className="flexbox items-center img-thumb-cover">
                                        <img src="https://webdeveloper.com/wp-content/uploads/2022/05/ManoelaIlic_Portrait-46x50.jpg" alt="Profile" />
                                   </span> 
                                </a>
                                <div className="subitem-bas-on-click right-position">
                                    <div>
                                        <span>
                                            Milicia David
                                        </span>
                                    </div>
                                    <ul>
                                        <li><a href='#'>Data</a></li>
                                    </ul>
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