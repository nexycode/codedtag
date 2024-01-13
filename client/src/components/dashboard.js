const { Component } = require("react");

class Dashboard extends Component {

    render = () => {
        
        return (
            <ul>
                <li>My Answers</li>
                <li>My Questions</li>
                <li>Add Question</li>
                <li>Settings</li>
                <li>My Tutorials</li>
            </ul>
        );

    }
}


export {Dashboard};