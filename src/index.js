import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, HeaderTab, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';
import HeaderComponent from './components/common/header';
import DrawerComponent from './components/common/drawerComponent';
import { connect } from 'react-redux';
import { requireAuth } from './actions/auth';
import PropTypes from 'prop-types';
import history from 'history';
import { checkAuth } from './actions/auth';

class IndexComponent extends Component {

    constructor(props){
        super(props);
    }

    async componentDidMount() {
        checkAuth(this.props.history);
    }

    render() {
        const { jwtToken } = this.props.auth;

        return (
            <View style={{height:"100%"}}>
                {
                    jwtToken ?
                    <HeaderComponent history={this.props.history}/> :
                    null
                }
                <View>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth
    }
};

//IndexComponent.contextTypes = {
//    history: PropTypes.func.isRequired
//};

export default connect(mapStateToProps, null)(IndexComponent);