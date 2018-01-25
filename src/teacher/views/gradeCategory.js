import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from '../../api/axios';
import { Row, Col, Button, Card, Collection, CollectionItem } from 'react-materialize';

// component SpecificAssignment
export default class SpecificAssignment extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        // state
        this.state = {
            titles: []
        };
    }

    /*  
    - componentWillMount is invoked immediately before a component is mounted
     
        - return axios get with path '/api/teacher/grade/category' +(plus) this.props.params.id
        - then with word 'then' with parameter results access to function
 
            - log string 'will mount' and parameter results

            - then with anonymous function 
                - log string: 'Students list? ' and this.state

        - then with word 'catch' with parameter e access to function
 
            - set the state - property
                - error has value of parameter e 
    */
    componentWillMount() {
        //needt to get list of students in this section and the id of their students_report
        console.log('Specific Assignment sectionId', this.props.params.id);

        return axios.get('/api/teacher/grade/category' + this.props.params.id).then(results => {

            console.log('will mount', results);

        }, () => console.log('Students list? ', this.state)

        ).catch(e => {

            this.setState({
                error: e
            });

        });
    }//end component will mount

    render() {

        return (

            <div>

            </div>

        );

    }

}
