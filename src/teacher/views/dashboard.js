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

    render() {

        return (

            <Card title={`Hello`}></Card>

        );

    }

}

var mapStateToProps = function (state) {

    return {
        currUser: state.teachers.currUser
    }

}

export default connect(mapStateToProps)(HelloWorld);