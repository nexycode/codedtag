const { Component } = require("react");
import {Styles} from './../assets/css/styles';

class Dashboard extends Component {

    render = () => {
        
        return (

            <div style={{...Styles.dashboardContainer}}>

                <div style={{...Styles.appContainer}}>
                    
                </div>

            </div>

            
        );

    }
}


export {Dashboard};