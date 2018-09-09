import React, { Component } from  'React';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Container, Tabs, Tab, Header } from 'native-base';
import HeaderComponent from './common/header';
import { requireAuth } from '../actions/auth';
import DisplayRequests from './asset/display_requests';
import RequestAsset from './asset/request_asset';

class HomeComponent extends Component {

    constructor(props){
        super(props);
    }

    componentWillMount() {
        //requireAuth(this);
    }

    render() {
        return(
            <View style={{height:"100%"}}>
                <Tabs>
                  <Tab heading="My Requests">
                    <DisplayRequests type="my_request"/>
                  </Tab>
                  <Tab heading="Others">
                    <DisplayRequests type="others_request"/>
                  </Tab>
                  <Tab heading="Request Asset">
                    <RequestAsset/>
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


export default connect(mapStateToProps, {})(HomeComponent);