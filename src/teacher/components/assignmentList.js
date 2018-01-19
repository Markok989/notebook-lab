import React from 'react';
import { connect } from 'react-redux';
import { getAssignments } from '../actions';
import { Row, Col, Card, Modal, Button, Input } from 'react-materialize';
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
        }
    }

    /*
    - componentDidMount is invoked immediately after a component is mounted,

        - axios get to path '/api/teacher/' +(plus) this.props.sectionId
        - then with word 'then' with parameter results access to function

            - condition if results.data.success

                - set the state 
                    - assignmentList has calue of results.data.assignmentList

            - else

        - word 'catch' with parameter e

            - set the state 
                - error string 'Could not get list of assignments'
    */
    componentDidMount() {

        console.log('Component did mount: Asssignment List');

        axios.get('/api/teacher/assignments/' + this.props.sectionId).then((results) => {

            if (results.data.success) {

                console.log(results.data.assignmentList);

                this.setState({
                    assignmentList: results.data.assignmentList
                });

            } else {

                this.setState({
                    error: 'Could not get list of assignments'
                });

            }

        }).catch(e => {

            this.setState({
                error: 'Could not get list of assignments'
            })

        });
    }

    // render method
    render() {

        // constant assignmentList belongs to this.state
        const { assignmentList } = this.state;

        // condition if not assignmentList returns null
        // else variable listAssignments has value of makeListAssignments with parameter assignmentList
        // retrns div element with property ul element
        // ul element has property of {listAssignments}
        if (!this.state.assignmentList) {

            return null;

        } else {

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

        - return li element with attribute key {item.id.toString()} and property {item.name}

    return ul element with property {itemList}
*/
function makeListAssignments(items) {

    var itemList = items.map(item => {

        console.log(item);

        return (
            <li key={item.id.toString()}>
                {item.name}
            </li>
        );

    });

    return (
        <ul>
            {itemList}
        </ul>
    );

}