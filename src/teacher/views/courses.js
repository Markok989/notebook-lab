// This will have 2 sections
// A make a new course section
// A list of current courses and sections

import React from 'react';
import { connect } from 'react-redux';
import { saveNewCourse } from '../actions';

// component TeacherCourses
class TeacherCourses extends React.Component {

    constructor(props) {
        super(props);

        this.handleInput = this.handleInput.bind(this);
        this.submit = this.submit.bind(this);

    }

    // method for input,
    // [e.target.name] takes value of path e.target.value
    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            // log for state of this(TeacherCourses) component
            console.log('COURSES: handleInput state', this.state);
        });
    }

    // method submit,
    // take props.dispatch, than use action saveNewCourse,
   
    submit() {
        this.props.dispatch(saveNewCourse(this.state.courseName));
    }

    render() {

        return (
            <div>
                <header>
                    Make a new course
                </header>
                <input type="text" placeholder="Name of course" />
                <button type="submit">Save new course</button>
                <input type="text" name="courseName" placeholder="Name of course" onChange={this.handleInput} />
               
                <button type="submit" onClick={this.submit}>Save new course</button>
            </div>
        );
    }
}

{/********* CONNECTED COMPONENT ********/ }

// conect component with store and take state(state.sections)
const mapStateToProps = function (state) {
    return {
        sections: state.sections
    };
}
// conect can combine component with mapStateToProps
export default connect(mapStateToProps)(TeacherCourses);