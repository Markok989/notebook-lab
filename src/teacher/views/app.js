import React from 'react';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';

import { connect } from 'react-redux';

class App extends React.Component {
    render() {

        return (
            <div>
                Hello World from Teacher App
                {
                    // shows property of chhildren components
                }
                {
                    //    { props.children }
                }
            </div>
        );

    };
}

export default connect()(App);