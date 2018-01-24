import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from '../../api/axios';
import { Row, Col, Input, Card, Collection, CollectionItem, CollapsibleItem } from 'react-materialize';

// component SpecificAssignment
export default class SpecificAssignment extends React.Component {

    //constructor
    constructor(props) {
        super(props);

        // state
        this.state = {
            studentList: []
        }
    }

    /* 
    - componentDidMount is invoked immediately after a component is mounted

        - log string 'Specific Assignment sectionId' and this.props.params.id
        - return axios get with path '/api/teacher/students/' +(plus) this.props.params.id
        - then with word 'then' with parameter results access to function

            - log string 'will mount' and parameter results

            - set the state - property
                
                - assignmentId has value of this.props.params.id
                - studentList has value of results.data.studentList
                - anonymous function log string 'Student list? ' and this.state

        - then with word 'catch' with parameter e access to function

            - set the state - property
                - error has value of parameter e
    */
    componentDidMount() {

        //needt to get list of students in this section and the id of their students_report

        console.log('Specific Assignment sectionId', this.props.params.id);
        return axios.get('/api/teacher/students/' + this.props.params.id).then((results) => {

            console.log('will mount', results);

            this.setState({

                assignmentId: this.props.params.id,
                studentList: results.data.studentList

            }, () => console.log('Student list? ', this.state));

        }).catch((e) => {

            this.setState({
                error: e
            });

        });

    }

    // render method
    render() {

        // constants assignmentId, studentList belongs to this.state
        const { assignmentId, studentList } = this.state;

        /* 
        - condition if studentList
            - variable studentHtmlList has value of makeInnerList with parameters studentList, assignmentId
        */
        if (studentList) {
            var studentHtmlList = makeInnerList(studentList, assignmentId)
        }

        /*
        - return div element with property {studentHtmlList}
        */
        return (

            <div>
                {studentHtmlList}
            </div>

        );
    }

}

/*
- function makeInnerList with parameters items and assignmentId

    - variable itemList has value of items and use map with parameter item to access to function

        - log parameter item
        - variable status has value of function determineStatus with parameters item.status and assignmentId

        - return

            - element CollapsibleItem with attribute key {item.report_id.toString()} and peroperty

                - element link with path {`/teacher/assignment/${assignmentId}/student/${item.report_id}`}
                  and property 

                    -   {item.first_name}  {item.last_name}
                
                - element p with style {statusStyle} and proprerty text 'Status: ' {status}

    - return 

        - element Collection with property  {itemList}
*/
function makeInnerList(items, assignmentId) {

    var itemList = items.map((item) => {

        console.log(item);
        var status = determineStatus(item.status, assignmentId);

        return (

            <CollapsibleItem key={item.report_id.toString()}>

                <Link to={`/teacher/assignment/${assignmentId}/student/${item.report_id}`}>
                    {item.first_name}  {item.last_name}
                </Link>

                <p style={statusStyle}>Status: {status} </p>

            </CollapsibleItem>

        );

    });

    return (

        <Collection>
            {itemList}
        </Collection>

    );

}

/*
- function determineStatus with parameter status
    
    - condition if status
        - return status
    else 
        - return string 'Not Started'
*/
function determineStatus(status) {

    if (status) {
        return status;
    } else {
        return 'Not Started';
    }

}

/************* STYLE ***************/
var statusStyle = {

    display: 'inline',
    paddingLeft: '40px'

}