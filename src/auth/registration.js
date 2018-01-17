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
import { Row, Col, Input, Button, Card, Container } from 'react-materialize';

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

    };

    /*
    - method handleChange with parameter e
        - set the state:
            - [e.target.name] has value of e.target.value
    */
    handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        });

    };

    /*
    - method handleStudentRegistration with parameter e
        - first_name, last_name, email, password, course belong to state of component Registration
        - condition if first_name and last_name and email and password and course
            - axios post has path '/student/register' and properties: first_name, last_name, email, password, course
            - then with word "then" access function with parameter res
                - data has value of  res.data
                - condition if not data.success
                    - error has value of true
                - else location.replace('/student');
            - catch use function with parameter err
                - log parameter err;
        - else 
            - alert string "Something went wrong. Please try again."
    */
    // problem
    handleStudentRegistration(e) {

        const { first_name, last_name, email, password, course } = this.state;


        if (first_name && last_name && email && password && course) {

            axios.post('/api/student/register', {
                first_name, last_name, email, password, course
            })
                .then((res) => {

                    const data = res.data;

                    if (!data.success) {
                        error: true
                    } else {

                        location.replace('/student');
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
         - first_name, last_name, email, password, course belong to state of component Registration
         - condition if first_name and last_name and email and password and course
             - axios post has path '/teacher/register' and properties: first_name, last_name, email, password, course
             - then with word "then" access function with parameter res
                 - data has value of  res.data
                 - condition if not data.success
                     - error has value of true
                 - else location.replace('/teacher');
             - catch use function with parameter err
                 - log parameter err;
         - else 
             - alert string "Something went wrong. Please try again."
    */
    handleTeacherRegistration(e) {

        const { first_name, last_name, email, password, course } = this.state;


        if (first_name && last_name && email && password) {

            axios.post('/api/teacher/register', {
                first_name, last_name, email, password
            })
                .then((res) => {

                    const data = res.data;

                    if (!data.success) {
                        error: true
                    } else {

                        location.replace('/teacher');
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

            <Card s={12} m={4} title='Create a New Student Account'>

                {/* onChange - use method handleChange */}
                <input className="reg-input" name="first_name" placeholder="First Name" onChange={e => this.handleChange(e)} />
                <input className="reg-input" name="last_name" placeholder="Last Name" onChange={e => this.handleChange(e)} />
                <input className="reg-input" name="email" placeholder="E-mail" onChange={e => this.handleChange(e)} />
                <input className="reg-input" name="password" placeholder="Password" type="password" onChange={e => this.handleChange(e)} />
                <input className="reg-input" name="course" placeholder="Course Code" onChange={e => this.handleChange(e)} />

                {/* onClick - use method handleStudentRegistration */}
                <Button className="reg-button" onClick={e => this.handleStudentRegistration(e)}> Submit </Button >
            </Card>

        );


        const teacherRegistration = (

            <Card title='Create a New Teacher Account'>

                {/* onChange - use method handleChange */}
                <input className="reg-input" name="first_name" placeholder="First Name" onChange={(e) => this.handleChange(e)} />
                <input className="reg-input" name="last_name" placeholder="Last Name" onChange={(e) => this.handleChange(e)} />
                <input className="reg-input" name="email" placeholder="E-mail" onChange={(e) => this.handleChange(e)} />
                <input className="reg-input" name="password" placeholder="Password" type="password" onChange={(e) => this.handleChange(e)} />

                {/* onClick - use method handleStudentRegistration */}
                <Button onClick={e => this.handleTeacherRegistration(e)}> Submit </Button>

            </Card>

        );

        console.log(this.handleStudentRegistration);

        return (

            <Container>

                <Card className="darken-1" title="Please select one of the following to register">

                    <Row>

                        {/* onClick - use method handleTeacherSubmit */}
                        <Col s={2} >
                            <Button
                                waves='red'
                                className="teacher-button"
                                onClick={e => this.handleTeacherSubmit(e)}
                            >
                                TEACHER
                                </Button>
                        </Col>

                        {'       '}

                        {/* onClick - use method handleStudentSubmit */}
                        <Col s={4}>
                            <Button
                                className="teacher-button"
                                onClick={e => this.handleStudentSubmit(e)}
                            >
                                STUDENT
                             </Button>
                        </Col>


                    </Row>

                </Card>

                {this.state.role == 'student' && studentRegistration}

                {this.state.role === 'teacher' && teacherRegistration}

                <br />
                <br />

                <div>If already a member, please<Link to="/login"> LOGIN</Link></div>


            </Container>

        );
    }
}

var btnStyle = {
    paddingRight: '10px'
}