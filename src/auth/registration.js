import React from 'react';
import {
    Router,
    Route,
    Link,
    IndexRoute,
    browserHistory,
    hashHistory
} from 'react-router';
import axios from 'axios';
//import { error } from 'util';

// component Registration
export default class Registration extends React.Component {

    constructor(props) {
        super(props);

        // state
        this.state = {};
    }


    /*
    - method handleTeacherSubmit with parameter e
        - log string "teacher button selected",
        - set the state:
            - role has value of string 'teacher'
    */
    handleTeacherSubmit(e) {
        console.log('teacher button selected');
        this.setState({
            role: 'teacher'
        })
    };

    /*
    - method handleTeacherSubmit with parameter e
       - log string "student button selected",
       - set the state:
           - role has value of string 'student'
    */
    handleStudentSubmit() {
        console.log('student button selected');
        this.setState({
            role: 'student'
        })
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
    - method handleStudentRegistration with parameter e
        - first, last, email, password, course belong to state of component Registration
        - condition if first and last and email and password and course
            - axios post has path '/student/register' and properties: first, last, email, password, course
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
    handleStudentRegistration(e) {
        const { first, last, email, password, course } = this.state;


        if (first && last && email && password && course) {

            axios.post('/student/register', {
                first, last, email, password, course
            })
                .then((res) => {

                    const data = res.data;

                    if (!data.success) {
                        error: true
                    } else {

                        location.replace('/');
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {

            //change aler to adding a <div> w/ error message
            alert('Something went wrong. Please try again.');
        }
    }

    /*
     - method handleStudentRegistration with parameter e
         - first, last, email, password, course belong to state of component Registration
         - condition if first and last and email and password and course
             - axios post has path '/teacher/register' and properties: first, last, email, password, course
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
    handleTeacherRegistration(e) {
        const { first, last, email, password, course } = this.state;


        if (first && last && email && password) {

            axios.post('/teacher/register', {
                first, last, email, password
            })
                .then((res) => {

                    const data = res.data;

                    if (!data.success) {
                        error: true
                    } else {

                        location.replace('/');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
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

                {/* onClick - use method handleStudentRegistration */}
                <button className="reg-button" onClick={(e) => this.handleStudentRegistration(e)}> Submit </button>
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

                {/* onClick - use method handleStudentRegistration */}
                <button className="reg-button" onClick={(e) => this.handleStudentRegistration(e)}> Submit </button>
            </div>
        )

        return (
            <div>

                <h3>Please select one of the following to register:</h3>

                {/* onClick - use method handleTeacherSubmit */}
                <button className="teacher-button" onClick={e => this.handleTeacherSubmit(e)}> TEACHER </button>

                {/* onClick - use method handleStudentSubmit */}
                <button className="teacher-button" onClick={e => this.handleStudentSubmit(e)}> STUDENT </button>

                {this.state.role == 'student' && studentRegistration}
                {this.state.role === 'teacher' && teacherRegistration}

                <div>If already a member, please<Link to="/login"> LOGIN</Link></div>

            </div>
        );
    }
}