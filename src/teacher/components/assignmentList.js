import React from 'react';
import { connect } from 'react-redux';
import { getAssignments } from '../actions';
import { Row, Col, Card, Modal, Button, Input } from 'react-materialize';
import { axios } from '../../api/axios';
import { Link } from 'react-router';

// component AddSection
export default class AddSection extends React.Component {

    // constructor
    constructor(props) {
        super(props);
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

        axios.get('/api/teacher/' + this.props.sectionId).then(results => {

            if (results.data.success) {

                this.setState({
                    assignmentList: results.data.assignmentList
                });

            } else { }
        }).catch(e => {

            this.setState({
                error: 'Could not get list of assignments'
            })

        });
    }

    render() {

        // constant assignmentList belongs to this.state
        const { assignmentList } = this.state;

        // condition if not assignmentList returns null
        // else variable listAssignments has value of makeListAssignments with parameter assignmentList
        // retrns div element with property ul element
        // ul element has property of {listAssignments}
        if (!assignmentList) {

            return null;

        } else {

            var listAssignments = makeListAssignments(assignmentList)

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
