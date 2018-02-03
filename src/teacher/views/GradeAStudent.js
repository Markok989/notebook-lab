import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCommittedAssignments, saveGrading } from '../actions';
import Logout from '../../auth/logout';
import { Row, Col, Button, Input, Card, Collection, CollectionItem, MenuItem, Breadcrumb } from 'react-materialize';

// component GradeAssignment
class GradeAssignment extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        // state
        this.state = {};

        // binding
        this.handleChange = this.handleChange.bind(this);
        this.handleSaveGrading = this.handleSaveGrading.bind(this);
        this.handleSaveAll = this.handleSaveAll.bind(this);
        this.handleCommit = this.handleCommit.bind(this);


    }

    /*
    - componentDidMount is invoked immediately after a component is mounted,

        - constants id, reportid belongs to this.props.params
        - log constants id and reportid

        - propst dispatch to function getCommittedAssignments(from actions) with parameters id, reportid
    */
    componentDidMount() {

        const { id, reportid } = this.props.params;
        console.log(id, reportid);

        this.props.dispatch(getCommittedAssignments(id, reportid));

    }

    /*
    - method handleChange with parameter e

        - set the state
            - [e.target.name] has value of e.target.value

            - then log state
    */
    handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        }, () => {

            console.log(this.state);

        });

    }


    /*
    - method handleSaveGrading with parameter e

        - constants { id, reportid } belongs to this.props.params

        - variable field has value of e.target.name

        - variable send has next properties 

            - [field + '_comment'] has value of this.state[field + '_comment'],
            - [field + '_grade'] has value of this.state[field + '_grade']

        - props dispatch to saveGrading with parameters id, reportid, send
    */
    handleSaveGrading(e) {

        const { id, reportid } = this.props.params;

        var field = e.target.name;

        var send = {

            [field + '_comment']: this.state[field + '_comment'],
            [field + '_grade']: this.state[field + '_grade']

        };

        this.props.dispatch(saveGrading(id, reportid, send));

    }


    /*
    - method handleCommit with parameter e

       - constant { id } belongs to this.props.params

       - props dispatch to getAssignment with parameter id
       - props dispatch to commitAssignment with parameters id, this.state
    */
    handleCommit(e) {

        const { id } = this.props.params;

        this.props.dispatch(getAssignment(id));
        this.props.dispatch(commitAssignment(id, this.state))

    }


    /*
    - method handleCommit with parameter e

        - log string 'save all' and this.state
        - constant { id } belongs to this.props.params

        - props dispatch to saveAssignment with parameters id, this.state
    */
    handleSaveAll(e) {

        console.log('save all', this.state);
        const { id } = this.props.params;
        this.props.dispatch(saveAssignment(id, this.state));

    }



    // render method
    render() {

        var form;

        // constant assignment belongs to this.props
        const { assignment } = this.props;

        /*
        - condition if not assignment
            - return null
        */
        if (!assignment) {
            return null
        }

        var committedAssignment =

            <div>

                {committed(assignment.title, 'title', this.handleChange, this.handleSaveGrading)}
                {committed(assignment.question, 'question', this.handleChange, this.handleSaveGrading)}
                {committed(assignment.abstract, 'abstract', this.handleChange, this.handleSaveGrading)}
                {committed(assignment.hypothesis, 'hypothesis', this.handleChange, this.handleSaveGrading)}
                {committed(assignment.variable, 'variable', this.handleChange, this.handleSaveGrading)}
                {committed(assignment.material, 'material', this.handleChange, this.handleSaveGrading)}
                {committed(assignment.procedure, 'procedure', this.handleChange, this.handleSaveGrading)}
                {committed(assignment.data, 'data', this.handleChange, this.handleSaveGrading)}
                {committed(assignment.calculation, 'calculation', this.handleChange, this.handleSaveGrading)}
                {committed(assignment.discussion, 'discussion', this.handleChange, this.handleSaveGrading)}

            </div>;

        return (

            <div>

                {committedAssignment}

                <Button name='saveAll' onClick={this.handleSaveAll}>Save All</Button>

                <Button name='commit' onClick={this.handleCommit}>Commit</Button>

            </div>

        ); // end return

    } // end render 

}


/*
- function committed with parameters section, category, handleChange, handleSaveGrading

    - condition if section[category + '_editable']

        - condition ifsection[category + '_comments'] 
          AND(&&)
          section[category + '_grade']

            - returns div element with property

                - element label with property {category}:

                - element div with property of text Teacher Comments
 

                - element textarea with attributes
                    - name - JavaScript template {`${category}_comment`} 
                    - placeholder - "Type here.."
                    - cols="30"
                    - rows="5"
                    - onChange={handleChange}
                    - property - {section[category + '_comments']}

                - element div with property of text Teacher Grade

                - element textarea with attributes
                    - name - JavaScript template {`${category}_grade`} 
                    - placeholder - "Type here.." 
                    - cols - "30" 
                    - rows - "5"
                    - onChange - {handleChange}
                    - property - {section[category + '_grade']}

        - else condition if section[category + '_grade']

            - returns element div with properties

                - element label with property {category}
 
                - element div with property of text: Teacher Comments
 
                - element textarea with attributes
                    - name - JavaScript template {`${category}_comment`} 
                    - placeholder - "Type here.." 
                    - cols - "30"
                    - rows - "5"
                    - onChange - {handleChange}
 
                - element div with property of text: Teacher Grade
 
                - element textarea with attributes
                    - name - JavaScript template {`${category}_grade`}
                    - placeholder - "Type here.."
                    - cols - "30"
                    - rows - "5" 
                    - onChange - {handleChange}
                    - property - {section[category + '_grade']}
 

        - else  condition if section[category + '_comments']

            - return element div with properties:

                - element label with property {category}
 
                - element div with property of text Teacher Comments
 
                - element textarea with attributes
                    - name - JavaScript template {`${category}_comment`} 
                    - placeholder - "Type here.." 
                    - cols - "30"
                    - rows - "5" 
                    - onChange - {handleChange}
                    - property - {section[category + '_comments']}
 
                - element div with property of text Teacher Grade
 
                - element textarea with attributes 
                    - onChange - {handleChange}
                    - name - {`${category}_grade`}
                    - placeholder - "Type here.."
                    - cols - "30" 
                    - rows - "5"
 
 
                - element button with attributes
                    - name - {category}
                    - onClick - {handleSaveGrading}
                    - property - Save
 
        - else 
 
            - returns div element with properties
                 
                - element h3 with property {category}
 
                - element p with property {section[category + '_content']}
 
                - element div with property of text Teacher Comments
 
                - element  textarea with attributes 
                    - onChange - {handleChange}
                    - name - {`${category}_comment`}
                    - placeholder - "Type here.."
                    - cols - "30"
                    - rows - "5"
 
                - element div with property of text Teacher Grade
 
                - element textarea with attributes 
                    - onChange - {handleChange} 
                    - name - {`${category}_grade`} 
                    - placeholder - "Type here.."
                    - cols - "30" 
                    - rows - "5"
 
                - element button with attribures
                    - onClick - {handleSaveGrading}
                    - name - {category}
                    - property - Save
 
                
    - else condition if section[category + '_editable'] is strictly the same as null
      OR (||)
      section[category + '_content'] is strictly the same as null

        - returns

    - else

        - returns element div with properties

            - element h5 with property {category}:
            - element p with property {section[category + '_content']}
            

*/
function committed(section, category, handleChange, handleSaveGrading) {

    if (section[category + '_editable']) {

        if (section[category + '_comments'] && section[category + '_grade']) {

            return (

                <div>
                    <label>{category}:</label>

                    <div>Teacher Comments</div>

                    <textarea
                        name={`${category}_comment`}
                        placeholder="Type here.."
                        cols="30"
                        rows="5"
                        onChange={handleChange}>
                        {section[category + '_comments']}
                    </textarea>

                    <div>Teacher Grade</div>

                    <textarea
                        name={`${category}_grade`}
                        placeholder="Type here.."
                        cols="30"
                        rows="5"
                        onChange={handleChange}>
                        {section[category + '_grade']}
                    </textarea>


                    <button name={category} onClick={handleSaveGrading}>Save</button>

                </div>

            );

        } else if (section[category + '_grade']) {

            return (

                <div>

                    <label>{category}:</label>

                    <div>Teacher Comments</div>

                    <textarea
                        name={`${category}_comment`}
                        placeholder="Type here.."
                        cols="30" rows="5"
                        onChange={handleChange}>
                    </textarea>

                    <div>Teacher Grade</div>

                    <textarea
                        name={`${category}_grade`}
                        placeholder="Type here.."
                        cols="30"
                        rows="5"
                        onChange={handleChange}>
                        {section[category + '_grade']}
                    </textarea>


                    <button name={category} onClick={handleSaveGrading}>Save</button>

                </div>

            );

        } else if (section[category + '_comments']) {

            return (

                <div>

                    <label>{category}:</label>

                    <div>Teacher Comments</div>

                    <textarea
                        name={`${category}_comment`}
                        placeholder="Type here.."
                        cols="30"
                        rows="5"
                        onChange={handleChange}>
                        {section[category + '_comments']}
                    </textarea>

                    <div>Teacher Grade</div>

                    <textarea
                        onChange={handleChange}
                        name={`${category}_grade`}
                        placeholder="Type here.."
                        cols="30"
                        rows="5" >
                    </textarea>


                    <button name={category} onClick={handleSaveGrading}>Save</button>

                </div>

            );

        } else {

            return (

                <div>

                    <h3>{category}:</h3>

                    <p>{section[category + '_content']}</p>

                    <div>Teacher Comments</div>

                    <textarea
                        onChange={handleChange}
                        name={`${category}_comment`}
                        placeholder="Type here.."
                        cols="30"
                        rows="5" >
                    </textarea>

                    <div>Teacher Grade</div>

                    <textarea
                        onChange={handleChange}
                        name={`${category}_grade`}
                        placeholder="Type here.."
                        cols="30"
                        rows="5" >
                    </textarea>

                    <button onClick={handleSaveGrading} name={category} >Save</button>

                </div>

            );

        }

    } else if (section[category + '_editable'] === null || section[category + '_content'] === null) {

        return

    } else {

        return (

            <div>

                <h5>{category}:</h5>
                <p>{section[category + '_content']}</p>

            </div>

        );

    }

}

/************ CONNECTED COMPONENT ************/
var mapStateToProps = function (state) {

    return {
        assignment: state.teachers.committedAssignment
    }

}

export default connect(mapStateToProps)(GradeAssignment);