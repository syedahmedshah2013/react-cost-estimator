import React, { Component } from 'react';
import Estimator from './estimator';
import Header from './Header';

class App extends Component {
    render() {
        return (
            <div className="container-fluid">
                <Header />
                <div className="container">
                    <Estimator />
                </div>
            </div>
        );
    }
}

export default App;