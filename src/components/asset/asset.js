import { connect } from "react-redux";
import { View, Text } from 'react-native';
import { Container, Tabs, Tab, Header, Input, Button, Picker, Form, Toast, Item } from 'native-base';
import React from "react";
import { submitAsset, searchAssetAdmin } from '../../actions/index';
import SearchItems from '../search_items';

class Asset extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        assetId: "",
        owner: "",
        description: "",
        message: "",
        loading: false
    }

    onFieldChange(field, value) {
        this.setState({[field]:value});
    }

    addAsset() {
        this.setState({loading:true});
        submitAsset(this.state, (message)=>{
            this.setState({loading:false, message:message});
            Toast.show({ text: message, buttonText: 'Okay', duration: 3000 });
        });
    }

    searchAsset() {
        let filter = JSON.stringify(this.state, (key, value) => {if(value)return value});
        this.props.searchAssetAdmin(JSON.parse(filter));
    }

    render() {
        return(
            <View style={{flex:1, flexDirection:"column"}}>
                <View style={{flex:1, flexDirection:"column", width:"100%", height:400 }}>
                    <Form>
                        <Item regular style={{height:40}}>
                            <Input placeholder="Asset Id" onChangeText={this.onFieldChange.bind(this,"assetId")}/>
                        </Item>
                        <Item regular style={{height:40}}>
                            <Input placeholder="Owner" onChangeText={this.onFieldChange.bind(this,"owner")}/>
                        </Item>
                        <Item regular style={{height:40}}>
                            <Input placeholder="Description" onChangeText={this.onFieldChange.bind(this,"description")}/>
                        </Item>
                        <View style={{flex:1, flexDirection:"row", width:"100%", justifyContent:'space-between'}}>
                            <Button primary style={{width:100, justifyContent:'center'}} onPress={this.addAsset.bind(this)} >
                                <Text>Add</Text>
                            </Button>
                            <Button primary style={{width:100, justifyContent:'center'}} onPress={this.searchAsset.bind(this)} >
                                <Text>Search</Text>
                            </Button>
                        </View>
                    </Form>
                </View>
                <View style={{height:300}}>
                    <SearchItems type="assets"/>
                </View>
            </View>
        );
    }

}

const actionCreators = { searchAssetAdmin };

export default connect(null, actionCreators)(Asset);