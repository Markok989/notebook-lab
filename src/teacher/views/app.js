import React from 'react';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Link } from 'react-router';

//import { connect } from 'react-redux';

class App extends React.Component {
    render() {
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
                            <li>Home</li>
                            <li>New Assignment</li>
                            <li>Help</li>
                            <li>Account</li>
                            <li>Logout</li>
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


export default connect()(App);