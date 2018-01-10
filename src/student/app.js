import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { getStudentData } from './actions';

// component App (for student)
class App extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        // state
        this.state = {};

        // binding
        this.dispatch = this.props.dispatch.bind(this);
    }

    // componentDidMount is invoked immediately after a component is mounted,
    // props dipsatch to getStudentData
    // log string "DATA" and this.props.data
    componentDidMount() {
        this.props.dispatch(getStudentData());
        console.log("DATA: ", this.props.data);
    }

    render() {

        // data belong to this.props
        const { data } = this.props;

        // if(!data) {
        //     return null
        // }

        return (
            <div>

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

                    <ul>
                        <li>Assignments</li>
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

}


// connected component
const mapStateToProps = function (state) {

    // log 'mapStateToProps'
    console.log('mapStateToProps');

    // return data with state.data
    return {
        data: state.data
    }
}

export default connect(mapStateToProps)(App);