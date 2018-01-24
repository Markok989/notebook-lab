import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { getStudentData, addNewClass, getAssignmentList } from './actions';
import AssignmentView from './components/AssignmentView';

// component App (for student) STUDENT APP
class App extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        // state
        this.state = {};

    }

    // componentDidMount is invoked immediately after a component is mounted,
    // props dipsatch to getStudentData
    componentDidMount() {
        this.props.dispatch(getStudentData());
        // this.props.dispatch(getAssignmentList())
    }


    /*
    - method handleChange with parameter e
        - set the state
            -  [e.target.name] has value/path e.target.value
    */
    handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        });

    }

    /*
    - method newClass with parameter e
        - e.preventDefault (The preventDefault() method cancels the event if it is cancelable,
          meaning that the default action that belongs to the event will not occur.)
        
        - props dispatch to addNewClass(from actions) with property this.state.course

        - use method emptyField with parameter e
    */
    newClass(e) {

        e.preventDefault();

        this.props.dispatch(addNewClass(this.state.course));

        this.emptyField(e);

    }

    /*
    -method emitMessage wiht parameter e
        - condtition if e.key strictly the same as 'Enter'
            - e.preventDefault (The preventDefault() method cancels the event if it is cancelable,
              meaning that the default action that belongs to the event will not occur.)

            - props dispatch to addNewClass(from actions) with property this.state.course

            - use method emptyField with parameter e
    */
    emitMessage(e) {

        if (e.key === 'Enter') {

            e.preventDefault();

            this.props.dispatch(addNewClass(this.state.course));


            this.emptyField(e);

        }
    }

    /*
    - method emptyField with parameter e
        - e.target.value has value of empty string
        - log string 'e' 
    */
    emptyField(e) {

        e.target.value = '';
        console.log('e');

    }

    /*
    - method showAssignment
        - set the state
            - assignmentVisible has value true

            -log this.state.assignmentVisible
    */
    showAssignment(e) {

        console.log(e.target.id);

        this.setState({

            assignmentVisible: true
            
        });

    }


    render() {

        // studentInfo belong to this.props
        const { studentInfo } = this.props;

        // condition if not studentInfo, return null
        if (!studentInfo) {
            return null
        }

        console.log('ucenik');

        return (
            <div>
                {/* student First name - student Last name */}
                {studentInfo.first_name} {studentInfo.last_name}

                <nav>
                    <ul>
                        <Link to="/student"><li>Home</li></Link>
                        <li>Courses</li>
                        <li>Gradebookrysjlktd</li>
                        <li>Account</li>
                        <li>Logout</li>
                    </ul>
                </nav>

                <sidebar>

                    <header>
                        Menu
                    </header>

                    <div>

                        <ul>

                            {
                                /*
                                - studentInfo.course use .map with parameter course to access
                                    - li element with property {course.course_name}
                                        - ul element with property course.assignments use .map with parameter assignment to access
                                            - li element with attribute onClick
                                                - e parmater use showAssignment with parameter e
                                                - property of elementelement
                                                    - Link element with path {`/student/assignment/${assignment.assignment_id}`}
                                                      and property {assignment.assignment_name}
                                */
                            }
                            {studentInfo.courses.map(course => (

                                <li>{course.course_name}
                                    
                                    <ul>

                                        {course.assignments && course.assignments.map(assignment => (

                                            <li
                                                onClick={e => this.showAssignment(e)}
                                                id={assignment.assignment_id}>

                                                <Link
                                                    to={`/student/assignment/${assignment.assignment_id}`} >
                                                    {assignment.assignment_name}
                                                </Link>

                                            </li>

                                        )
                                        )}

                                    </ul>

                                </li>

                            ))}

                        </ul>

                    </div>
                    
                </sidebar>

                {
                    /*
                    - input element with attribute 
                       - className
                       - name
                       - placeholder
                       - onChange - with parmaeter e , use handleChange with parmeter e
                       - onKeyPress - with parmaeter e , use emitMessage with parmeter e
                    */
                }

                <input className="reg-input" name="course" placeholder="Course Code"
                    onChange={e => this.handleChange(e)}
                    onKeyPress={e => this.emitMessage(e)} />

                {
                    /*
                    - button element with attribute 
                        - onClick - with parmaeter e , use newClass with parmeter e
                    */
                }
                <button className="new-class-button" onClick={e => this.newClass(e)}> Submit </button>

                {
                    /*
                    - this is App component
                    - props as property
                    - children, show children components
                    */
                }
                {this.props.children}

                {
                    /*
                    - {this.state.assignmentVisible and component AssignmentView}
                    */
                }


            </div>
        );

    }

}


// connected component
const mapStateToProps = function (state) {

    // log 'mapStateToProps'
    console.log('mapStateToProps', state);

    // return studentInfo with state.students.studentInfo
    return {
        studentInfo: state.students.studentInfo
    }
}

export default connect(mapStateToProps)(App);