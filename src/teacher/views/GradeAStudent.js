import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCommittedAssignments, saveGrading, commitGrade } from '../actions';
import Logout from '../../auth/logout';
import { Row, Col, Button, Input, Card, Collection, CollectionItem, MenuItem, Breadcrumb } from 'react-materialize';
import { capitalize } from '../../helpers';

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

        - constant { id, reportid } belongs to this.props.params
        - log e.target.name
        - variable field has value of e.target.name

        - variable send has properties
            - [field + '_comment'] has value of this.state[field + '_comment']
            - [field + '_grade'] has value of this.state[field + '_grade']

        -  log variable send
        - props dispatch to commitGrade with parameters id, reportid, send
    */
    handleCommit(e) {

        const { id, reportid } = this.props.params;
        console.log(e.target.name);
        var field = e.target.name;

        var send = {
            [field + '_comment']: this.state[field + '_comment'],
            [field + '_grade']: this.state[field + '_grade']
        }

        console.log(send);
        this.props.dispatch(commitGrade(id, reportid, send));
    }


    /*
    - method handleCommit with parameter e

        - constant { id, reportid } belongs to this.props.params

        - props dispatch to saveGrading with parameters id, reportid, this.state
    */
    handleSaveAll(e) {

        const { id, reportid } = this.props.params;

        this.props.dispatch(saveGrading(id, reportid, this.state));

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

                </div>

                <div>
                    <Button name='saveAll' onClick={this.handleSaveAll}>Save All</Button>
                </div>

            </div>;


        var finalReportComments =

            <div>

                <div>

                    {finalComments(assignment.report_comments, assignment.report_grade, this.handleChange, this.handleCommit)}

                </div>

            </div>;


        return (

            <div>

                {committedAssignment}
                {finalReportComments}

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

            - returns div element with properties

                - element Card with attriburte title={capitalize(category)} and with properties

                    - element Input with attributes :
                        - type - "textarea"
                        - label - "Comments"
                        - name - {`${category}_comment`}
                - onChange={handleChange}
                - property - {section[category + '_comments']}

                - element Input with attributes :
                        - type - "text"
                        - label - "Grade"
                        - name - {`${category}_comment`}
                - onChange - {handleChange}
                - property - {section[category + '_grade']}

                - element div with property

                        - element button wtih attributes
                            - name - {category}
                - onClick - {handleSaveGrading}
                - property - text Save



        - else condition if section[category + '_grade']

            - returns div element with properties

                - element Card with attriburte title={capitalize(category)} and with properties

                - element Input with attributes
                    - s - {12}
                - type - "textarea"
                    - label - "Comment"
                    - name - {`${category}_comment`}
                - onChange - {handleChange}

                - element Input with attributes
                    - s - {12}
                - type - "text"
                    - label - "Grade"
                    - name - {`${category}_grade`}
                - onChange - {handleChange}
                - property - {section[category + '_grade']}

                - element div with property

                        - element button wtih attributes
                            - name - {category}
                - onClick - {handleSaveGrading}
                - property - text Save


        - else  condition if section[category + '_comments']

            - returns div element with properties

                - element Card with attriburte title={capitalize(category)} and with properties

                - element Input with attributes
                    - s - {12}
                - type - "textarea"
                    - label - "Comment"
                    - name - {`${category}_comment`}
                - onChange - {handleChange}
                - property - {section[category + '_comments']}

                - element Input with attributes
                    - s - {12}
                - type - "text"
                    - label - "Grade"
                    - name - {`${category}_grade`}
                - onChange - {handleChange}

                - element div with property

                        - element button wtih attributes
                            - name - {category}
                - onClick - {handleSaveGrading}
                - property - text Save

        - else

           - returns div element with properties

                - element Card with attriburte title={capitalize(category)} and with properties

                    - element Row with properties

                        - element Col with attributes
                            - s - {12}
                - m - {6}
                - property - element p with property {section[category + '_content']}

                - element Col with attributes
                            - s - {12}
                - m - {6}
                - properties:

                                - element Input with attributes
                                    - s - {12}
                - type - "textarea"
                                    - label - "Comment"
                                    - name - {`${category}_comment`}
                - onChange - {handleChange}

                - element Input with attributes
                                    - s - {12}
                - type - "text"
                                    - label - "Grade"
                                    - name - {`${category}_grade`}
                - onChange - {handleChange}

                - element div with property

                                - element button wtih attributes
                                    - name - {category}
                - onClick - {handleSaveGrading}
                - property - text Save


    - else condition if section[category + '_editable'] is strictly the same as null
      OR (||)
      section[category + '_content'] is strictly the same as null

        - returns

    - else

        - returns element div with properties

            - element h5 with property {capitalize(category)}:
            - element p with property {section[category + '_content']}


                */
function committed(section, category, handleChange, handleSaveGrading) {

    if (section[category + '_editable']) {

        if (section[category + '_comments'] && section[category + '_grade']) {

            return (

                <div>

                    <Card title={capitalize(category)} >

                        {/*
                        error greska
                        */}
                        <Input type="textarea" label="Comments" name={`${category}_comment`} onChange={handleChange}>{section[category + '_comments']}</Input>

                        <Input type="text" label="Grade" name={`${category}_grade`} onChange={handleChange}>{section[category + '_grade']}</Input>

                        <div>
                            <Button name={category} onClick={handleSaveGrading}>Save</Button>
                        </div>

                    </Card>

                </div>

            );

        } else if (section[category + '_grade']) {

            return (

                <Card title={capitalize(category)}>

                    <Input s={12} type="textarea" label="Comment" name={`${category}_comment`} onChange={handleChange}></Input>
                    <Input s={12} type="text" label="Grade" name={`${category}_grade`} onChange={handleChange}>{section[category + '_grade']}</Input>

                    <div>
                        <Button name={category} onClick={handleSaveGrading}>Save</Button>
                    </div>

                </Card>

            );

        } else if (section[category + '_comments']) {

            return (

                <Card title={capitalize(category)}>

                    <Input s={12} type="textarea" name={`${category}_comment`} label="comments" onChange={handleChange}>{section[category + '_comments']}</Input>

                    <Input s={12} type="text" onChange={handleChange} name={`${category}_grade`} label="Grade" ></Input>

                    <div>
                        <Button name={category} onClick={handleSaveGrading}>Save</Button>
                    </div>

                </Card>

            );

        } else {

            return (

                <div>

                    <Card title={capitalize(category)}>

                        <Row>

                            <Col s={12} m={6}>
                                <p>{section[category + '_content']}</p>
                            </Col>

                            <Col s={12} m={6}>

                                <Input s={12} type="textarea" label="Comments" onChange={handleChange} name={`${category}_comment`}></Input>

                                <Input s={12} type="text" onChange={handleChange} name={`${category}_grade`} label="Grade"></Input>

                                <div>
                                    <Button onClick={handleSaveGrading} name={category} >Save</Button>
                                </div>

                            </Col>

                        </Row>

                    </Card>

                </div>

            );

        }

    } else if (section[category + '_editable'] === null || section[category + '_content'] === null) {

        return

    } else {

        return (

            <div>

                <h5>{capitalize(category)}:</h5>
                <p>{section[category + '_content']}</p>

            </div>

        );

    }

}



/*
- function finalComments with parameters comment, grade, handleChange, handleCommit

    - condition if comment AND(&&) grade

        - returns element div with properties

            - element Card with attribute title - "Final Comments"

                - element Input with attributes
                    - s - {12}
                    - type - "textarea"
                    - label - "Comments"
                    - name - "commit_comment"
                    - onChange - {handleChange}
                    - property - {comment}

                - element Input with attributes
                    - s - {12}
                    - type - "text"
                    - label - "Overall Grade"
                    - name - "commit_grade"
                    - onChange - {handleChange}
                    - property - {grade}


    - else condition if grade

        - returns element div with properties

            - element Card with attribute title - "Final Comments"

                - element Input with attributes
                    - s - {12}
                    - type - "textarea"
                    - label - "Comments"
                    - name - "commit_comment"
                    - onChange - {handleChange}


                - element Input with attributes
                    - s - {12}
                    - type - "text"
                    - label - "Overall Grade"
                    - name - "commit_grade"
                    - onChange - {handleChange}
                    - property - {grade}

    - else condition if grade - comment

       - returns element div with properties

            - element Card with attribute title - "Final Comments"

                - element Input with attributes
                    - s - {12}
                    - type - "textarea"
                    - label - "Comments"
                    - name - "commit_comment"
                    - onChange - {handleChange}
                    - property - {comment}


                - element Input with attributes
                    - s - {12}
                    - type - "text"
                    - label - "Overall Grade"
                    - name - "commit_grade"
                    - onChange - {handleChange}


    - else

           - returns element div with properties

            - element Card with attribute title - "Final Comments"

                - element Input with attributes
                    - s - {12}
                    - type - "textarea"
                    - label - "Comments"
                    - name - "commit_comment"
                    - onChange - {handleChange}


                - element Input with attributes
                    - s - {12}
                    - type - "text"
                    - label - "Overall Grade"
                    - name - "commit_grade"
                    - onChange - {handleChange}

                - element div with property 

                    - element button with attributes
                        - name - 'commit'
                        - onClick - {handleCommit}
                        - property - Commit To Student

                */
function finalComments(comment, grade, handleChange, handleCommit) {

    if (comment && grade) {

        return (

            <div>

                <Card title="Final Comments">

                    <Input s={12} type="textarea" label="Comments" name="commit_comment" onChange={handleChange}>{comment}</Input>

                    <Input s={12} type="text" label="Overall Grade" name="commit_grade" onChange={handleChange}>{grade}</Input>

                </Card>

            </div>

        );

    } else if (grade) {

        return (

            <div>

                <Card title="Final Comments">

                    <Input s={12} type="textarea" label="Comments" name="commit_comment" onChange={handleChange}></Input>

                    <Input s={12} type="text" name="commit_grade" onChange={handleChange}>{grade}</Input>

                </Card>

            </div>

        );

    } else if (comment) {

        return (

            <div>

                <Card title="Final Comments">

                    <Input s={12} type="textarea" label="Comments" name="commit_comment" onChange={handleChange}>{comment}</Input>

                    <Input s={12} type="text" label="Overall Grade" name="commit_grade" onChange={handleChange}></Input>

                </Card>

            </div>

        );

    } else {

        return (

            <div>

                <Card title="Final Comments">

                    <Input s={12} type="textarea" label="Comments" name="commit_comment" onChange={handleChange}></Input>

                    <Input s={12} type="text" label="Overall Grade" name="commit_grade" onChange={handleChange}></Input>

                    <div>
                        <Button name='commit' onClick={handleCommit}>Commit To Student</Button>
                    </div>

                </Card>

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