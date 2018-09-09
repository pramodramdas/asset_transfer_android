import React, { Component } from  'React';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Container, Picker, Item, Form, Input, Button } from 'native-base';

class SearchRequests extends Component {

    constructor(props){
        super(props);
    }

    state = {
        req_state: "",
        assetId: ""
    };

    onValueChange(value) {
        this.setState({
          req_state: value
        });
    }

    onFieldChange(text) {
        this.setState({assetId:text});
    }

    filterRequests() {
        let query = {};
        switch(this.state.req_state) {
            case "APPROVED": query = {approved: true}; break;
            case "NOT APPROVED": query = {approved: false}; break;
            case "RECEIVED": query = {received: true}; break;
            case "NOT RECEIVED": query = {received: false}; break;
            case "CLOSED": query = {isClosed: true}; break;
            case "NOT CLOSED": query = {isClosed: false}; break;
            default: break;
        }

        if(this.state.assetId)
            query.assetId = this.state.assetId;

        this.props.filterRequests(query);
    }

    render() {
        return (
            <Form style={{borderStyle: "dotted", borderWidth: 5, borderColor: "#3F51B5" }}>
                <Item picker>
                      <Picker
                        mode="dropdown"
                        style={{ width: 100 }}
                        selectedValue={this.state.req_state}
                        onValueChange={this.onValueChange.bind(this)}
                      >
                        <Picker.Item label="ALL" value="ALL" />
                        <Picker.Item label="APPROVED" value="APPROVED" />
                        <Picker.Item label="NOT APPROVED" value="NOT APPROVED" />
                        <Picker.Item label="RECEIVED" value="RECEIVED" />
                        <Picker.Item label="NOT RECEIVED" value="NOT RECEIVED" />
                        <Picker.Item label="CLOSED" value="CLOSED" />
                        <Picker.Item label="NOT CLOSED" value="NOT CLOSED" />
                      </Picker>
                </Item>
                <Item rounded>
                    <Input placeholder='Asset Id' onChangeText={this.onFieldChange.bind(this)}/>
                </Item>
                <Item style={{alignSelf:'center'}}>
                     <Button rounded style={{width:100, justifyContent: 'center'}} onPress={this.filterRequests.bind(this)}>
                        <Text>Search</Text>
                     </Button>
                </Item>
            </Form>
        );
    }
}

const btnStyle = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
}

export default SearchRequests;