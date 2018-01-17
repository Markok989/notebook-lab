import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllSections, saveNewAssignment } from '../actions';
import { Row, Col, Button, Input, Card, Collection, CollectionItem } from 'react-materialize';

// TeacherNewAssignment component
class TeacherNewAssignment extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        // state
        this.state = {
            sections: [],
            include: {
                title: false,
                question: false,
                abstract: false,
                hypothesis: false,
                variables: false,
                materials: false,
                procedures: false,
                data: false,
                calculations: false,
                discussion: false
            },
            editable: {},
            shared: {},
            defaults: {
                defaults_title: "",
                defaults_question: "",
                defaults_abstract: "",
                defaults_hypothesis: "",
                defaults_variables: "",
                defaults_materials: "",
                defaults_procedures: "",
                defaults_data: "",
                defaults_calculations: "",
                defaults_discussion: "",
            }
        }

        // binding methodes
        this.handleInput = this.handleInput.bind(this);
        this.submit = this.submit.bind(this);
        this.handleSectionInput = this.handleSectionInput.bind(this);
        this.handleIncludeInput = this.handleIncludeInput.bind(this);
        this.handleDefaults = this.handleDefaults.bind(this);
        this.handleEditable = this.handleEditable.bind(this);
        this.handleShared = this.handleShared.bind(this);

    }

    // componentDidMount() is invoked immediately after a component is mounted.
    //      props dispatch access to function getAllSections from teacher actions
    componentDidMount() {
        this.props.dispatch(getAllSections());
    }

    /*
    - method handleSectionInput with parameter event
        - name has value of event.target.name
        - sections has value of array
            - spread operator(take all values of array) for this.state.sections,
              nam.substring with parameter 9 and name.length

        - set the state
            - sections
            - log state
    */
    handleSectionInput(event) {

        var name = event.target.name;
        var sections = [...this.state.sections, name.substring(9, name.length)];

        this.setState({
            sections
        }, () => {
            console.log(this.state);
        });

    }

    /*
    - method handleIncludeInput with parameter event
        - target has value of event.target
        - "value" has value of target.checked
        - name has value of target.name

        - include has value of object
            - empty object, this.state.include and property
              [name] with value "value"
        
        - set the state with property include and function
            - log this.state
    */
    handleIncludeInput(event) {

        const target = event.target;
        const value = target.checked;
        const name = target.name;

        var include = Object.assign({}, this.state.include, {
            [name]: value
        });

        this.setState({ include }, () => {
            console.log(this.state);
        });

    }

    /* 
     - method handleInput with parameter event
          - target has value of event.target;
          - target has value of event.target,
          - condition if target.type is the same as 'checkbox'
              - log target.checked
          - 'value' has value of 
              target.type strictly the same as 'checkbox'
              and this const has two values based on condition
              first is target.checked and second is target.value
          - name has value as target.name
     - set the state, 
          - property [name] has value 'value'
          - log string 'New Assignment: handleInput state: ' and this.state 
    */
    handleInput(event) {

        const target = event.target;

        if (target.type == 'checkbox') {
            console.log(target.checked)
        }
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => {
            console.log('New Assignment: handleInput state: ', this.state);
        });

    }

    /*
    - method handleDefaults with 
        - "value" has value of event.target.value
        - name has value of event.target.name

        - defaults has value of object
            - empty object, this.state.defaults and property
              [name] with value "value"
        
        - set the state with property defaults and function
            - log this.state
    */
    handleDefaults() {

        const value = event.target.value;
        const name = event.target.name;

        var defaults = Object.assign({}, this.state.defaults, {
            [name]: value
        });
        this.setState({ defaults }, () => {
            console.log(this.state);
        });

    }

    /*
    - method handleEditable 
        - target has value of event.target,
        - "value" has value of target
        - name has value of target.name.substring with parameters:
            - 0(zero)
            - name.substring with parameters 7 and name length -(minus) 8
    
            - editable has value of object
                - empty object, this.state.editable and property
                  [name] with value "value"
            
            - set the state with property editable and function
                - log this.state
    */
    handleEditable() {

        const target = event.target;
        const value = target.checked;
        const name = target.name.substring(0, target.name.length - 8);

        var editable = Object.assign({}, this.state.editable, {
            [name]: value
        });
        this.setState({ editable }, () => {
            console.log(this.state);
        });

    }

    /*
    - method handleShared 
        - target has value of event.target,
        - "value" has value of target.checked
       - name has value of target.name.substring with parameters:
            - 0(zero)
            - event.target.name.substring with parameters 
                - 0(zero) and event.target.name.substring -(minus) 5
    
            - shared has value of object
                - empty object, this.state.shared and property
                  [name] with value "value"
            
            - set the state with property shared and function
                - log this.state
    */
    handleShared() {

        const target = event.target;
        const value = target.checked;
        const name = target.name.substring(0, target.name.length - 5);

        var shared = Object.assign({}, this.state.shared, {
            [name]: value
        });
        this.setState({ shared }, () => {
            console.log(this.state);
        });

    }

    /*
    - method submit 
        - condition if this.checkSections
            - props dispatch access to function getAllSections from teacher actions with parameter
              and this.state
        - else 
            - set the state with propsery sectionError wich one has value of
              string "Please select a class"
    */
    submit() {

        if (this.checkSections()) {
            console.log('dispatching');
            this.props.dispatch(saveNewAssignment(this.state));
        } else {
            this.setState({
                sectionError: "Please select a class"
            });
        }
        // validation!

        // console.log(this.state);
        // browserHistory.push('/teacher/assignments');

    }

    /*
    - method checkSections
        - condition if this.state.sections.length > 0
            - return true
        - return false
    */
    checkSections() {

        console.log(console.log(this.state.sections.length));
        if (this.state.sections.length > 0) {
            return true;
        }
        return false;

    }


    render() {

        const { sections } = this.props;

        // events with properties
        var events = {
            include: this.handleIncludeInput,
            defaults: this.handleDefaults,
            editable: this.handleEditable,
            shared: this.handleShared
        }

        // variable assignmentOptions has value :
        // function: which on has div element with properties
        var assignmentOptions =
            <Row>

                <Row>

                    {createAssignmentCategoryDiv('Title', events)}
                    {createAssignmentCategoryDiv('Question', events)}
                    {createAssignmentCategoryDiv('Abstract', events)}
                    {createAssignmentCategoryDiv('Hypothesis', events)}
                    {createAssignmentCategoryDiv('Variables', events)}
                    {createAssignmentCategoryDiv('Materials', events)}
                    {createAssignmentCategoryDiv('Procedures', events)}
                    {createAssignmentCategoryDiv('Data', events)}
                    {createAssignmentCategoryDiv('Calculations', events)}
                    {createAssignmentCategoryDiv('Discussion', events)}

                </Row>

            </Row>;

        /*
        - contition if not sections
            - return null
        - else
            - return jsx of component
        */
        if (!sections) {
            return null;
        } else {

            return (
                <div>

                    <Row>

                        <h5>To which classes should the assignment be added?</h5>

                        {
                            /*
                            - shows this.state.sectionError and p element with property
                              {this.state.sectionError}
                            */
                        }
                        {this.state.sectionError && <p>{this.state.sectionError}</p>}
                        {
                            /*
                            - function makeSectionList use sections and property sections of this cpomponent 
                            */
                        }
                        {makeSectionList(sections, this.handleSectionInput)}

                    </Row>

                    <Row>

                        <h5>Assignment Basics</h5>

                        <Input m={12} type="text" name="assignmentName"
                            onChange={this.handleInput} label="Assignment Name" />

                        <Input m={6} type="text" name="due"
                            onChange={this.handleInput} label="Due Date YYYY-MM-DD (optional)" />

                        <Input m={6} type="checkbox" name="group_lab"
                            onChange={this.handleInput} label="Group Lab?" />

                        <Input m={12} type="textarea" name="instructions"
                            onChange={this.handleInput} label="Instructions (optional)" />


                    </Row>

                    <Row>

                        <h5>Assignment Details</h5>

                        {assignmentOptions}

                        <Button onClick={this.submit}>Save assignment</Button>

                    </Row>

                </div>
            );

        }

    }

}


/********* CONNECTED COMPONENT ********/
const mapStateToProps = function (state) {
    // state
    return {
        error: state.teachers.error,
        sections: state.teachers.sections
    };
}
export default connect(mapStateToProps)(TeacherNewAssignment);

/*
- function createAssignmentCategoryDiv with parameter category
    - return div element with properties
        -
*/
function createAssignmentCategoryDiv(category, events) {
    return (
        <Row>

            <Input m={2} type="checkbox" name={`${category.toLowerCase()}`}
                onChange={events.include} label={category} />

            <Input m={2} type="checkbox" name={`${category.toLowerCase()}Editable`}
                onChange={events.editable} label={`Editable`} />

            <Input m={2} type="checkbox" name={`${category.toLowerCase()}Share`}
                onChange={events.shared} label={`Share ${category}`} />

            <Input m={6} type="text" name={`defaults_${category.toLowerCase()}`}
                placeholder={`Default ${category}. Will appear on all student assignments`} onChange={events.defaults} />

        </Row>
    );
}

/*
- function makeSectionList with parameter items
    - variable itemList has value of item with map with parameter item
        - log parameter item
        - return
            - element li with attribute key={item.id.toString()}
                    - input element
    - return element ul with property {itemList}
*/
function makeSectionList(items, save) {

    var itemList = items.map((item) => {
        console.log(item);

        return (
            <Input type="checkbox" name={`sectioncb${item.id}`} onChange={save} label={item.name} />
        );
    });
    return (
        <Row>
            {itemList}
        </Row>
    );
}

/************** STYLES ****************/

var assignmentGridStyle = {
    display: "grid",
    gridTemplateColumns: '100px 100px auto 100px 100px'
}

var inputStyle = {
    width: '400px'
}