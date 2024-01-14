const { Component } = require("react");
import {appendStylesheets} from './../assets/css/styles';

class Dashboard extends Component {
     

    componentDidMount = () => {
        
        // Append Dashboard Styles
        appendStylesheets();
        
    }

    render = () => {
        
        return (
            <h1>
                Dashboard
            </h1>
        );

    }
}


export {Dashboard};