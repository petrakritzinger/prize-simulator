import React from 'react';
import ReactDOM from 'react-dom';
import SimulateMonth from './SimulateMonth';

class App extends React.Component {

    render() {
        return (
            <div className="ui container" style={{ marginTop: '10px'}}>
                <SimulateMonth newUsersAmount='1000' monthAmount='1000'/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));