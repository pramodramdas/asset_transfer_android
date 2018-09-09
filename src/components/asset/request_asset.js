import { Col, Row, Grid } from 'react-native-easy-grid';
import React, { Component } from  'React';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Form, Item, Picker, Input, Button, Card, Badge, CardItem, Body, DatePicker, Toast } from 'native-base';
import { searchAsset, submitAsset, requestForAsset } from '../../actions/index';
import moment from 'moment';

class RequestAsset extends Component {

    constructor(props){
        super(props);
    }

    state = {
        loading: false,
        key: "assetId",
        assetId: "",
        fromDate: null,
        endDate: null,
        message: "",
        value: "",
        data: []
    }

    onDescChange(value) {
        this.setState({key:value});
    }

    onTextChange(value) {
        this.setState({assetId:value});
    }

    onFieldChange(text) {
        this.setState({value:text});
    }

    onSearch() {
        if(this.state.key)
            searchAsset({[this.state.key]:this.state.value}, (data) => {
                this.setState({data});
            });
    }

    onDateChange(type, val) {
        if(val) {
            let newDate = moment.utc(val,'YYYY-MM-DD').format('YYYY-MM-DD');
            this.setState({[type]:newDate});
        }
    }

    displayAssetDetails() {
        return this.state.data.map((asset, i) => {
            return(
                <Card key={i}>
                    <CardItem header bordered>
                        <Text>{"Asset Id: "+asset.assetId+" "}</Text>
                        <Text>{"owner: "+asset.owner+" "}</Text>
                        <Text>{"desc: "+asset.description+" "}</Text>
                    </CardItem>
                    <CardItem button onPress={() => this.displayCurrentStatus(asset.items[0])}>
                          <Body><Text>Click for more details</Text></Body>
                    </CardItem>
                </Card>
            );
        });
    }

    displayCurrentStatus(details) {
        let preText = "request from: "+details.reqEmp+"\n"+
                      "from: "+ new Date(details.fromDate).toDateString()+"\n"+
                      "to: "+ new Date(details.endDate).toDateString()+"\n";
        preText = preText + (details.received ? "Asset received by "+details.reqEmp: "Asset approved to "+details.reqEmp);

        Alert.alert("Details", preText);
    }

    requestAsset() {
        let { assetId, fromDate, endDate } = this.state;
        if(!assetId || !fromDate || !endDate) {
            Toast.show({ text: 'all fields are required', buttonText: 'Okay', duration: 3000 });
            return;
        }
        else if(fromDate > endDate) {
            Toast.show({ text: "from date cannot be greater than end date", buttonText: 'Okay', duration: 3000 });
            return;
        }
        this.setState({loading:true});
        requestForAsset(this.state, (message)=>{
            this.setState({loading:false, message:message});
            Toast.show({ text: message, buttonText: 'Okay', duration: 3000 });
        });
    }

    render() {
        return(
            <Grid>
                <Row style={{height:160}}>
                    <Col style={styles.gridLayout}>
                        <Form>
                            <Item picker style={{height:50}}>
                                <Picker mode="dropdown" placeholder="Select type" selectedValue={this.state.key} onValueChange={this.onDescChange.bind(this)}>
                                    <Picker.Item label="Asset" value="assetId" />
                                    <Picker.Item label="Description" value="description" />
                                </Picker>
                            </Item>
                            <Item regular style={{height:50}}>
                                <Input placeholder={this.state.key} onChangeText={this.onFieldChange.bind(this)} />
                            </Item>
                            <Item style={{alignSelf:'center',height:100}}>
                                <Button rounded style={{width:100, justifyContent: 'center'}} onPress={this.onSearch.bind(this)}>
                                    <Text>Search</Text>
                                </Button>
                            </Item>
                        </Form>
                    </Col>
                    <Col style={styles.gridLayout}>
                        <Form>
                            <Item regular style={{height:40}}>
                                <Input placeholder="asset id" onChangeText={this.onTextChange.bind(this)} />
                            </Item>
                            <Item regular style={{height:30}}>
                                <DatePicker
                                    defaultDate={new Date()}
                                    minimumDate={new Date()}
                                    locale={"en"}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Start Date"
                                    textStyle={{ color: "green" }}
                                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                                    onDateChange={this.onDateChange.bind(this, 'fromDate')}
                                />
                            </Item>
                            <Item regular style={{height:30}}>
                                <DatePicker
                                    defaultDate={new Date()}
                                    minimumDate={new Date()}
                                    locale={"en"}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="End Date"
                                    textStyle={{ color: "green" }}
                                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                                    onDateChange={this.onDateChange.bind(this, 'endDate')}
                                />
                            </Item>
                            <Item style={{alignSelf:'center',height:100}}>
                                <Button rounded style={{width:100, justifyContent: 'center'}} onPress={this.requestAsset.bind(this)}>
                                    <Text>Request</Text>
                                </Button>
                            </Item>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <View style={{flex: 1}}>
                        <View style={{height:390}}>
                            <ScrollView style={styles.contentContainer}>
                                {this.displayAssetDetails.bind(this)()}
                            </ScrollView>
                        </View>
                    </View>
                </Row>
            </Grid>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 20,
        borderWidth: 5,
        borderColor: "grey"
    },
    gridLayout: {
        borderWidth: 5,
        borderColor: "grey",
        height: 160
    }
});

export default RequestAsset;
