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


    }

    // componentDidMount is invoked immediately after a component is mounted
    componentDidMount() {

    }

    // render method
    render() {
        return (

            <div>
                Specific Assignment will go here!
            </div>

        );
    }

}