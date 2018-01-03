import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { error } from 'util';

// component Registration
class Registration extends React.Component {

    constructor(props) {
        super(props);

        // state
        this.state = {};
    }

    /*
    - method handleChange with parameter e
        - set the state:
            - [e.target.name] has value of e.target.value
    */
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    /*
    - method handleSubmit with parameter e
        - first, last, email, password, course belong to state of component Registration
        - condition if state of Registration.role has strict same value as 'student'
            - axios post has path '/student/register' and properties: first, last, email, password, course
            - then with word "then" access function with parameter res
                - data has value of  res.data
                - condition if not data.success
                    - error has value of true
                - else location is replace with "/"
            - catch use function with parameter err
                - log parameter err;

        - else condition if state of Registration.role has strict same value as 'teacher'
            - axios post has path '/student/register' and properties: first, last, email, password
            - then with word "then" access function with parameter res
                - data has value of  res.data
                - condition if not data.success
                    - error has value of true
                - else location is replace with "/"
            - catch use function with parameter err
                - log parameter err;

        - else 
            - alert string "Something went wrong. Please try again."
    */
    handleSubmit(e) {
        const { first, last, email, password, course } = this.state;

        if (this.state.role === 'student') {
            axios.post('/student/register', {
                first, last, email, password, course
            }).
                then((res) => {
                    const data = res.data;

                    if (!data.success) {
                        error: true
                    } else {
                        location.replace('/');
                    }
                }).catch((err) => {
                    console.log(err);
                })

        } else if (this.state.role === 'teacher') {
            axios.post('/teaher/register', {
                first, last, email, password
            }).then((res) => {

                const data = res.data;

                if (!data.success) {
                    error: true
                } else {
                    location.replace('/');
                }
            }).catch((err) => {
                console.log(err);
            });
        } else {
            // change aler to adding a <div> w/ error message
            alert('Something went wrong. Please try again.');
        }
    }

    // render method
    render() {

        const studentRegistration = (
            <div>
                <h3 className="singup-title">PLEASE SING UP</h3>
                {/* onChange - use method handleChange */}
                <input className="reg-input" name="first" placeholder="First Name" onChange={(e) => this.handleChange(e)} />
                <input className="reg-input" name="last" placeholder="Last Name" onChange={(e) => this.handleChange(e)} />
                <input className="reg-input" name="email" placeholder="E-mail" onChange={(e) => this.handleChange(e)} />
                <input className="reg-input" name="password" placeholder="Password" type="password" onChange={(e) => this.handleChange(e)} />
                <input className="reg-input" name="course" placeholder="Course Code" onChange={(e) => this.handleChange(e)} />

                {/* onClick - use method handleSubmit */}
                <button className="reg-button" onClick={(e) => this.handleSubmit(e)}> Submit </button>
            </div>
        );

        const teacherRegistration = (
            <div>

                <h3 className="singup-title">PLEASE SING UP</h3>
                {/* onChange - use method handleChange */}
                <input className="reg-input" name="first" placeholder="First Name" onChange={(e) => this.handleChange(e)} />
                <input className="reg-input" name="last" placeholder="Last Name" onChange={(e) => this.handleChange(e)} />
                <input className="reg-input" name="email" placeholder="E-mail" onChange={(e) => this.handleChange(e)} />
                <input className="reg-input" name="password" placeholder="Password" type="password" onChange={(e) => this.handleChange(e)} />

                {/* onClick - use method handleSubmit */}
                <button className="reg-button" onClick={(e) => this.handleSubmit(e)}> Submit </button>
            </div>
        )

        return (
            <div>
                HELLO
            </div>
        );

    }

}

export default Registration;