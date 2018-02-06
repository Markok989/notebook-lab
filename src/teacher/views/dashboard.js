import React from 'react';
import {
    MediaBox,
    Navbar,
    NavItem,
    Row,
    Col,
    Container,
    SideNav,
    SideNavItem,
    Button,
    Collapsible,
    CollapsibleItem,
    Modal,
    Input,
    Collection,
    CollectionItem,
    Card
} from 'react-materialize';
import { connect } from 'react-redux';


class HelloWorld extends React.Component {

    // constructor
    constructor(props) {
        super(props);

    }

    /*
    - componentDidMount is invoked immediately after a component is mounted,

        - log string 'DASHBOARD TEACHER: will mount' and  this.props
    */
    componentDidMount() {

        console.log('DASHBOARD TEACHER: will mount', this.props);

    }


    render() {

        /*
        - condition if not !this.props.teacherInfo
            - return null
        */
        if (!this.props.teacherInfo) {

            return null;

        }


        return (

            <div>
                <Card title={`Hello ${this.props.teacherInfo[0].first_name}`}></Card>
            </div>

        );

    }

}

/********* COMPONENT CONNECTED *********/
var mapStateToProps = function (state) {

    return {
        teacherInfo: state.teachers.teacherInfo
    }

}

export default connect(mapStateToProps)(HelloWorld);