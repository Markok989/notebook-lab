import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getStudentData } from './actions';

// component Courses
class Courses extends React.Component {

    render() {

        // data belong to this.props
        const { data } = this.props;

        // -condition if not data
        //      - return null
        if (!data) {
            return null;
        }

        return (
          const courseList = (
            <div className="courses">
                {data.courses.map((course) => (
                    <li className="course-list">{course.name}</li>
                )
                )}
            </div>
        )
        );

    }
}