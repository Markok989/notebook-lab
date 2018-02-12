import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Logout from '../../auth/logout';
import { getTeacherInfo } from '../actions';
import {
    Navbar,
    NavItem,
    Row,
    Col,
    MediaBox,
    Container,
    SideNav,
    SideNavItem,
    Button,
    Collection,
    CollectionItem
} from 'react-materialize';
//import { connect } from 'react-redux';

// TEACHER APP
class App extends React.Component {

    // component did mount: is invoked immediately after a component is mounted
    componentDidMount() {

        console.log('getting Teacher info');
        // access props via dispatch to getTeacherInfo (from actions)
        this.props.dispatch(getTeacherInfo())

    }


    render() {

        console.log('profesor');

        {
            // condition if is false,
            // return div with property Loadinig...
        }

        if (false) {

            return <div className='loading'>Loading...</div>;

        } else {

            {
                // else
            }
            // const children=React.cloneElement(this.props.children,{
            //    info:this.statem
            //    events: {
            //          updateProfile: this.updateProfile    
            //          handleInput: this.handleInput    
            //    }
            //
            //});

            return (

                <Container>

                    <Navbar className="indigo">
                    
                        <NavItem><MediaBox src="/images/Cloud_book_logo.png" caption="Logo" width="90px" /></NavItem>

                        <NavItem href="/teacher">Home</NavItem>
                        <NavItem>New Assignment</NavItem>
                        <NavItem>Help</NavItem>
                        <NavItem>Account</NavItem>
                        <NavItem><Logout /></NavItem>

                    </Navbar>

                    <Row>

                        <Col s={2} className='sidebar'>

                            <Collection>

                                <CollectionItem><Link to="/teacher/assignments">Assignments</Link></CollectionItem>
                                <CollectionItem><Link to="/teacher/courses">Courses</Link></CollectionItem>
                                <CollectionItem>Gradebook</CollectionItem>
                                <CollectionItem>Students</CollectionItem>
                                <CollectionItem>Messages</CollectionItem>

                            </Collection>

                        </Col>

                        <Col s={10} className='mainContainer'>
                            {this.props.children}
                        </Col>

                    </Row>

                </Container>

            );

        }

    };

}

// connect to store
var mapStateToProps = function (state) {

    return {
        teacherInfo: state.teachers.teacherInfo
    }

}


export default connect(mapStateToProps)(App);