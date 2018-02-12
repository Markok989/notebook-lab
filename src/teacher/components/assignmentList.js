import React from 'react';
import { connect } from 'react-redux';
import { getAssignments } from '../actions';
import { Row, Col, Card, Modal, Button, Input, Collapsible, CollapsibleItem } from 'react-materialize';
import axios from '../../api/axios';
import { Link } from 'react-router';

// component AssignmentList
export default class AssignmentList extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        // state
        this.state = {
            assignmentList: []
        };

    }

    /*
    - componentDidMount is invoked immediately after a component is mounted,

        - log string 'Component did mount: Asssignment List'

        - variable url has value of string/path '/api/teacher/assignments/' +(plus) this.props.sectionId
        - log string 'URL' and variable url

        - axios get to path '/api/teacher/' +(plus) this.props.sectionId
        - then with word 'then' with parameter results access to function

            - condition if results.data.success

                - log results.data.assignmentList

                - set the state 
                    - assignmentList has calue of results.data.assignmentList

            - else

        - word 'catch' with parameter e

            - set the state 
                - error string 'Could not get list of assignments'
    */
    componentDidMount() {

        console.log('Component did mount: Asssignment List');
        var url = '/api/teacher/assignments/' + this.props.sectionId;
        console.log('URL', url);

        axios.get('/api/teacher/assignments/' + this.props.sectionId).then(results => {

            console.log('Back from getting assignments:,', results);

            if (results.data.success) {

                console.log(results.data.assignmentList);

                this.setState({

                    assignmentList: results.data.studentAssignmentList

                });

            } else {

                this.setState({
                    error: 'Could not get list of assignments'
                });

            }

        }).catch(e => {

            this.setState({
                error: 'Could not get list of assignments'
            });

        });

    }

    // render method
    render() {

        // constant assignmentList belongs to this.state
        const { assignmentList } = this.state;

        /* 
        - condition if not this.state.assignmentList returns null
               
        - else 

            - log string 'AssignmentList state: ' and this.state
            - constant assignmentList belongs to this.state;
            - variable listAssignments has value of makeListAssignments with parameter assignmentList
               
            - retrns div element with property ul element
                ul element has property of {listAssignments}
                 */
        if (!this.state.assignmentList) {

            return null;

        } else {

            console.log('AssignmentList state:', this.state);
            const { assignmentList } = this.state;
            var listAssignments = makeListAssignments(assignmentList);

            return (

                <div>

                    <ul>
                        {listAssignments}
                    </ul>

                </div>

            );

        } //end else for returns

    } //end render

} //end class


/*
- function makeListAssignments with parameter items

    - variable itemList has value of items and use map with parameter item to access to fucntion

        - log item parameter

        - return 
       
                - CollectionItem element with attribute key {item.id.toString()} and property 
                - element Link with path {`/teacher/assignment/${item.id}`} and property {item.name}
                - element p with attribute style {dueStyle} and property Due: {item.due}

    - return element div with properties
        - element Collection element with property {itemList}
*/
function makeListAssignments(items) {

    var itemList = items.map(item => {

        console.log(item);

        return (

            <CollectionItem key={item.id.toString()}>

                <Link to={`/teacher/assignment/${item.id}`}>{item.name}</Link>
                <p style={dueStyle}>Due: {item.due}</p>

            </CollectionItem>

        );

    });

    return (

        <div>

            <Collection>
                {itemList}
            </Collection>

        </div>

    );

}

/******* STYLES **********/

var dueStyle = {

    display: 'inline',
    paddingLeft: '40px'

}