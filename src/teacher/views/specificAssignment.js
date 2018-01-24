import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from '../../api/axios';
import { Row, Col, Input, Card, Collection, CollectionItem } from 'react-materialize';

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

        /* 
        - condition if this.state.studentList
            log string 'got student list'
        */
        if (this.state.studentList) {
            console.log('got student list');
        }

        return (

            <div>
                Specific Assignment will go here!
            </div>

        );
    }

}