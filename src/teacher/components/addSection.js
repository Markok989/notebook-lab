import React from 'react';

// Add Section Component
export default class AddSection extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        // state
        // showAddSectionDialog has value false
        this.state = {
            showDialog: false
        }

        this.handleInput = this.handleInput.bind(this);
        this.toggleShowDialog = this.toggleShowDialog.bind(this);

    }

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
        }, () => {
            console.log('Add Section: handleInput state: ', this.state);
        });
    }

    // render method
    render() {

        // courseId is props of AddSection component
        const { courseId } = this.props;

        return (
            <div>
                {
                    /*
                    shows:
                    this(AddSection).state(state of AddSection in constructor).
                    showAddSectionDialog(has the value of false)

                    or

                    shows:
                    button element with property Add New Section
                    */
                }
                {this.state.showDialog || <button onClick={this.toggleShowDialog}>Add New Section</button>}

                {
                    /*
                    shows:
                    this(AddSection).state(state of AddSection in constructor).
                    showAddSectionDialog(has the value of false)

                    and

                    shows next elements:
                    input elements with attributes:
                        - type: text
                        - name- name of elements
                        - placeholder - default text on element
                        - onChange - use method handleInput
                    - button with property Save New Course
                    */
                }
                {this.state.showDialog &&
                    <div>
                        <input type="text" name="sectionName" placeholder="Section Name" onChange={this.handleInput} />
                        <input type="text" name="startDate" placeholder="Start Date (optional)" />
                        <input type="text" name="endDate" placeholder="End Date (optional)" />
                        <button>Save New Course</button>
                    </div>
                }
            </div>
        );
    }
}