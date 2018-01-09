import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router';

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
    // to function with property location replace with '/'
    logout() {
        axios.get('/logout').then(() => {
            location.replace('/');
        });
    }

    // render method
    render() {

        return (
            <Link onClick={this.logout}>Logout</Link>
        );

    }

}