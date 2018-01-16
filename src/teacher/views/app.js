import React from 'react';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Link } from 'react-router';
import Logout from '../../auth/logout';
import { getTeacherInfo } from '../actions';

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
            // if is false,
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
                <div>
                    <nav>
                        <ul>
                            <li><Link to="/teacher">Home</Link></li>
                            <li>New Assignment</li>
                            <li>Help</li>
                            <li>Account</li>
                            <li><Logout /></li>
                        </ul>
                    </nav>
                    <sidebar>
                        <header>
                            Menu
                    </header>
                        <ul>
                            <li>Assignments</li>
                            <li><Link to="/teacher/assignments">Assignments</Link></li>
                            <li><Link to="/teacher/courses">Courses</Link></li>
                            <li>Gradebook</li>
                            <li>Students</li>
                            <li>Messages</li>
                        </ul>
                    </sidebar>
                    {this.props.children}
                </div>
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