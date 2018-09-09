import React, { Component } from  'React';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Container, Tabs, Tab, Header, Input } from 'native-base';
import { requireAuth } from '../actions/auth';
import Participant from './participant/participant';
import Asset from './asset/asset';

class AdminComponent extends Component {

    constructor(props){
        super(props);
    }

//    componentWillMount() {
//        requireAuth(this);
//    }
    componentWillMount() {
        const { role } = this.props.auth;
        if(role !== "admin")
            this.props.history.push("/home");
    }

    render() {
        return(
            <View style={{height:"100%"}}>
                <Tabs>
                  <Tab heading="Participant">
                    <Participant/>
                  </Tab>
                  <Tab heading="Asset">
                    <Asset/>
                  </Tab>
                </Tabs>
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        auth:state.auth
    }
};


export default connect(mapStateToProps, {})(AdminComponent);