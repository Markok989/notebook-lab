import React from 'react';
import { Router, Route, Link, IndexRoute, browsweHistory, hashHistory } from 'react-router';
import axios from 'axios';
import { Row, Col, Input, Button, Card } from 'react-materialize';

// Login Component
export default class Login extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        // state
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
                    - log data.role,
                    - condition if data.role is the same as 'student'
                        - location is rpelaced with '/student'
                    - else
                        - location is rpelaced with '/teacher'
        - else 
            - alert: "The email or password are invalid"
         */
        if (email && password) {

            axios.post('/api/login', {
                email, password
            })
                .then((res) => {

                    console.log(res, res.data);

                    const data = res.data;

                    if (!data.success) {
                        error: true
                    } else {
                        console.log(data.role);

                        if (data.role == 'student') {
                            location.replace('/student');
                        } else {
                            location.replace('/teacher');
                        }
                    }
                });
        } else {
            alert('The email or password are invalid');
        }
    }

    render() {


        return (

            <Row className="reg-input-container">

                <Col m={8} s={12}>

                    <Card title='Login'>

                        {
                            /*
                            onChange use method handleChange with parametere e
                            */
                        }
                        <Input s={6} className="reg-input" name="email" placeholder="E-mail"
                            label="E-mail" onChange={e => this.handleChange(e)} />

                        {
                            /*
                            onChange use method handleChange with parametere e
                            */
                        }
                        <Input s={6} className="reg-input" name="password" placeholder="Password"
                            type="password" label="Password" onChange={e => this.handleChange(e)} />

                        {
                            /*
                            onChange use method handleLogin with parametere e
                            */
                        }
                        <Button className="reg-button" onClick={e => this.handleLogin(e)}> Login </Button>

                    </Card>

                    <Link className="wel-links" to='/' >Register a New Account</Link>

                </Col>
            </Row>
        );
    }

}