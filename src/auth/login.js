import React from 'react';
import { Router, Route, Link, IndexRoute, browsweHistory, hashHistory } from 'react-router';
import axios from 'axios';
import { error } from 'util';

// Login Component
export default class Login extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        this.state = {};
    }

    // method handleChange with parameter e
    // set the state: e.target.name has value/path of e.target.value
    handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // method handleLogin with parameter e
    handleLogin(e) {

        // email and passwords are part of this.state
        const { email, password } = this.state;

        /*
        - condition if email had password, next line of code is working,
            - axios post has path /login with property email and password,
            - then with word "then" with parameter res we access next function
                - data has value of res.data,
                - condition if not data.success, next line of code is working,
                    - error has value true
                - else
                    - locations is replace with "/"
        - else 
            - alert: "The email or password are invalid"
         */
        if (email && password) {

            axios.post('/login', {
                email, password
            })
                .then((res) => {

                    const data = res.data;
                    if (!data.success) {
                        error: true
                    } else {
                        location.replace('/')
                    }
                })
        } else {
            alert('The email or password are invalid');
        }
    }

    render() {


        return (
            <div className="reg-input-container">
                {
                    /*
                    onChange use method handleChange with parametere e
                    */
                }
                <input
                    className="reg-input"
                    name="email"
                    placeholder="E-mail"
                    onChange={e => this.handleChange(e)}
                />
                {
                    /*
                    onChange use method handleChange with parametere e
                    */
                }
                <input
                    className="reg-input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={e => this.handleChange(e)}
                />
                {
                    /*
                    onChange use method handleLogin with parametere e
                    */
                }
                <button className="reg-button" onClick={e => this.handleLogin(e)}>
                    Login
                 </button>
                <Link className="wel-links" to='/'>Register</Link>
            </div>
        );
    }

}