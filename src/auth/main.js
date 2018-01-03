import React from 'react';

// component Main
class Main extends React.Component {

    constructor(props) {
        super(props);

        // state
        this.state = {}
    }

    /*
    - handleTeacherSubmit method with parameter e
        - location/path replace with string/path '/register'
        - log: string "teacher button selected"
        - set the state
            - role has string "teacher"
                - then with anonymous function log state of handleTeacherSubmit
    */
    handleTeacherSubmit(e) {

        location.replace('/register');

        console.log('teacher button selected');
        this.setState({
            role: 'techer'
        }, () => {
            console.log(this.state);
        });

    }

    /*
    - handleStudentSubmit method with parameter e
        - location/path replace with string/path '/register'
        - log: string "student button selected"
        - set the state
            - role has string "student"
                - then with anonymous function log state of handleStudentSubmit
    */
    handleStudentSubmit() {

        location.replace('/register');
        console.log('student button selected');
        this.setState({
            role: 'student'
        }, () => {
            console.log(this.state);
        });

    }

    render() {

        return (
            <div>

                <h3>Please select one of the following:</h3>

                {/* on clik use method handleTeacherSubmit */}
                <button className={teacher - button} onClick={(e) => this.handleTeacherSubmit(e)}> TEACHER </button>

                {/* on clik use method handleStudentSubmit */}
                <button className={teacher - button} onClick={(e) => this.handleStudentSubmit(e)}> STUDENT </button>

            </div>
        );
    }
}


export default Main;