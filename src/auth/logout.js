import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';


// component Logout
export default class Logout extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        // state
        this.state = {};

        //binding
        this.logout = this.logout.bind(this);

    }

    // method logout
    // axios get with path '/logout', then with word "then" access 
    // to function with property browserHistory push to '/'
    logout() {
        axios.get('/logout').then(() => {
            browserHistory.push('/');
        });
    }

    // render method
    render() {

        return (
            <Link onClick={this.logout}>Logout</Link>
        );

    }

}