import React from 'react';
import { connect } from 'react-redux';
import { saveNewSection } from '../actions';
import { Row, Col, Card, Modal, Button, Input } from 'react-materialize';

// Add Section Component
class AddSection extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        // state
        // showDialog has value false
        this.state = {
            showDialog: false
        }

        // binding
        this.handleInput = this.handleInput.bind(this);
        this.toggleShowDialog = this.toggleShowDialog.bind(this);
        this.submit = this.submit.bind(this);

    }

    // method toggleShowDialog 
    // set the state
    //      - showDialog is not this.state.showDialog
    toggleShowDialog() {

        this.setState({
            showDialog: !this.state.showDialog
        });

    }

    // handleInput method with parameter e
    // set the state of AddSection
    // [e.target.name] has the value/path  e.target.value
    // log string "Add Section: handleInput state: " and state of AddSection component
    handleInput(e) {

        this.setState({
            [e.target.name]: e.target.value
        });

    }

    // method submit
    // via dispatch access saveNewSection (function form actions)
    // and take as props courseId, as state take: sectionName, startDate, endDate  
    // this.sectionNameInput.value has value of empty string
    // this.startDateInput.value has value of empty string
    // this.endDateInput.value has value of empty string
    // this method has mathod (call) toggleShowDialog
    submit() {

        this.props.dispatch(saveNewSection(
            this.props.courseId,
            this.state.sectionName,
            this.state.startDate,
            this.state.endDate
        ));

        this.sectionNameInput.value = '';
        this.startDateInput.value = '';
        this.endDateInput.value = '';
        this.toggleShowDialog();

    }


    // render method
    render() {

        // courseId is props of AddSection component
        const { courseId, error } = this.props;

        return (
            <div>

                {
                    /*
                    - error and show paragraph element with property {error}
                    */
                }
                {error && <p>{error}</p>}

                <Modal header="Add New Section"
                    trigger={<Button onClick={this.toggleShowDialog}>Add New Section</Button>}
                >

                    <Input
                        s={12}
                        type="text"
                        name="sectionName"
                        placeholder="Section Name"
                        onChange={this.handleInput}
                        ref={el => this.sectionNameInput = el}
                    />

                    <Input
                        s={6}
                        type="text"
                        name="startDate"
                        placeholder="Start Date (optional)"
                        onChange={this.handleInput}
                        ref={el => this.startDateInput = el}
                    />

                    <Input
                        s={6}
                        type="text"
                        name="endDate"
                        placeholder="End Date (optional)"
                        onChange={this.handleInput}
                        ref={el => this.endDateInput = el}
                    />

                    <Button onClick={this.submit}>Save New Course</Button>

                </Modal>

            </div>
        );
    }
}

const mapStateToProps = function (state) {

    return {
        error: state.teachers.error
    };
    
}

/********* CONNECTED COMPONENT ********/
export default connect(mapStateToProps)(AddSection);