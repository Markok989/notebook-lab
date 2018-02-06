import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { getStudentData, addNewClass, getAssignmentList } from './actions';
import AssignmentView from './components/AssignmentView';
import {
    MediaBox,
    Navbar,
    NavItem,
    Row,
    Col,
    Container,
    SideNav,
    SideNavItem,
    Button,
    Collapsible,
    CollapsibleItem,
    Modal,
    Input,
    Collection,
    CollectionItem
} from 'react-materialize';
import Logout from '../auth/logout';

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
        
        - log string 'new class event'
        - props dispatch to addNewClass(from actions) with property this.state.course

        - use method emptyField with parameter e
    */
    newClass(e) {

        e.preventDefault();

        console.log('new class event');
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
    
        - log e.target.id
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

        console.log('student');

        return (

            <Container>

                {/* student First name - student Last name */}
                {studentInfo.first_name} {studentInfo.last_name}

                <Navbar>

                    <NavItem><MediaBox src="/images/Cloud_book_logo.png" caption="Logo" width="90px" /></NavItem>

                    <NavItem><Link to='/student'>Home</Link></NavItem>
                    <NavItem>Courses</NavItem>
                    <NavItem>Gradebook</NavItem>
                    <NavItem>Account</NavItem>
                    <NavItem><Logout /></NavItem>

                </Navbar>

                <Row>

                    <Col s={12} m={3}>

                        <Collapsible>

                            {
                                /*
                                - studentInfo.course use .map with parameter course to access

                                    - CollapsibleItem element with property {course.course_name}

                                        - ul element with property
                                            - course.assignments AND course.assignments use .map
                                              with parameter assignment to access

                                                - li element with attribute onClick
                                                - e parmater use showAssignment with parameter e

                                                    - property of elementelement
                                                        - Link element with path {`/student/${course.course_id}/assignment/${assignment.assignment_id}`}
                                                          and property {assignment.assignment_name}
                                */
                            }
                            {studentInfo.courses.map(course => (

                                <CollapsibleItem header={course.course_name}>

                                    <ul>

                                        {course.assignments && course.assignments.map(assignment => (

                                            <li onClick={e => this.showAssignment(e)} id={assignment.assignment_id}>

                                                <Link to={`/student/${course.course_id}/assignment/${assignment.assignment_id}`} >
                                                    {assignment.assignment_name}
                                                </Link>

                                            </li>)
                                        )}

                                    </ul>

                                </CollapsibleItem>

                            ))}

                        </Collapsible>

                        {
                            /*
                            - element Modal with attributes
                                - header - "Add A Class"
                                - trigger - {<Button>Add A Class</Button>}
                                - actions 

                                    - element div

                                        - element Button with attributes 
                                            - modal - "close"
                                            - onClick - {e => this.newClass(e)}
                                            - actions - {'modal-close'}

                                        - element Button with attributes 
                                            - flat
                                            - modal - "close"
                                            - waves - "light"
                            */
                        }
                        <Modal header="Add A Class" trigger={<Button>Add A Class</Button>} actions={

                            <div>

                                <Button modal="close" onClick={e => this.newClass(e)} actions={'modal-close'}>
                                    Submit
                                </Button>

                                <Button flat modal="close" waves="light">
                                    Dismiss
                                </Button>

                            </div>

                        }>

                            {
                                /*
                                - Input element with attribute 
                                    - name
                                    - placeholder
                                    - onChange - with parmaeter e , use handleChange with parmeter e
                                    - onKeyPress - with parmaeter e , use emitMessage with parmeter e
                                */
                            }
                            <Input name="course" placeholder="Course Code"
                                onChange={e => this.handleChange(e)}
                                onKeyPress={e => this.emitMessage(e)} />

                        </Modal>

                    </Col>

                    <Col s={12} m={9}>

                        {
                            /*
                            - this is App component
                            - props as property
                            - children, show children components
                            */
                        }
                        {this.props.children}

                    </Col>

                </Row>

            </Container>

        ); // end return

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