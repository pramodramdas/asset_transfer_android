import React, { Component } from  'React';
import { connect } from 'react-redux';
import { Container, Tabs, Tab, Header, Input, Card, CardItem, Body, Badge, Button, Accordion, Toast } from 'native-base';
import { Modal, Text, TouchableHighlight, View, StyleSheet, ScrollView } from 'react-native';
import SearchRequests from './search';
import { getRequests, changeRequestState } from '../../actions/index';

const clickOwner = ['approved', 'isClosed', 'cancel'];
const clickUser = ['received', 'cancel'];
const dateKeyList = ["fromDate", "endDate", "submittedDate", "receivedDate", "approvedDate", "requestDate"];

class DisplayRequests extends Component {

    constructor(props){
        super(props);
        this.person = this.props.type === "my_request" ? clickUser : clickOwner;
    }

    state = {
        loading: false,
        data: []
    }

    componentDidMount() {
        this.loadRequests.bind(this)(this.props.type);
    }

    componentWillReceiveProps(newProps) {
        if(newProps.type !== this.props.type) {
            this.loadRequests.bind(this)(newProps.type);
            this.person = (newProps.type === "my_request") ? clickUser : clickOwner;
        }
    }

    handleTagClick(obj, key, value) {
        if((key !== "cancel" && obj["cancel"]) ||
        (key === "received" && !obj["approved"]) ||
        (key === "isClosed" && !obj["received"]) ||
        (key === "cancel" && obj["received"]))
            return;

        changeRequestState(key, value, obj, (err, msg) => {
            if(!err)
                Toast.show({ text: msg, buttonText: 'Okay', duration: 3000 });
            else
                Toast.show({ text: err, buttonText: 'Okay', duration: 3000 });
            this.loadRequests.bind(this)(this.props.type);
        });
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    filterRequests(query) {
        this.loadRequests.bind(this)(this.props.type, query);
    }

    loadRequests (type, query={}) {
        getRequests(this.props.auth.empId, type, query, (data) => {
            this.setState({data});
        });
    }

    renderCards(obj) {
        let displayDetails;

        displayDetails = Object.keys(obj).map((key, i) => {
            if(obj[key] === true || obj[key] === false)
                return;
            else if(dateKeyList.indexOf(key) > -1)
                return <Text key={i}>{key} : {new Date(obj[key]).toDateString()}{`\n`}{`\n`}</Text>
            else
                return(
                    <Text key={i}>
                      {key} : {obj[key]}{`\n`}{`\n`}
                    </Text>
                );
        });

        return [{ title: "click for more details .....", content: displayDetails}]
    }

    renderFooter(obj) {
        if(obj.cancel)
            return "This request is cancelled by "+obj.cancel;
        else if(!obj.approved && !obj.received && !obj.isClosed)
            return "This request is open";
        else
            return "This request is " + (obj.isClosed ? "closed" : ( obj.received ? "received" : "approved"))
    }

    getProps(key, obj) {
        let handleClick = (this.person.indexOf(key) > -1 && !obj[key])? this.handleTagClick.bind(this, obj, key, obj[key]) : null;
        return (obj[key] === true) ? {success:true} : {danger:true, onPress:handleClick};
    }

    renderRequests(){
        let approvedColor;
        let receivedColor;
        let isClosedColor;
        let cancelColor;

        return this.state.data.map((item, i) => {
            approvedProps = this.getProps("approved", item);
            receivedProps = this.getProps("received", item);
            isClosedProps= this.getProps("isClosed", item);
            cancelProps = this.getProps("cancel", item);

            return(
                <Card key={i}>
                    <CardItem header bordered style={styles.cardStyle}>
                      <Text style={{fontWeight: "bold"}} > Asset Id : {item.assetId} </Text>
                      <Button small {...approvedProps}>
                           <Text> approved </Text>
                      </Button>
                      <Button small {...receivedProps}>
                           <Text> received </Text>
                      </Button>
                      <Button small {...isClosedProps}>
                           <Text> closed </Text>
                      </Button>
                      <Button small {...cancelProps}>
                           <Text> cancel </Text>
                      </Button>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Accordion style={{width:"100%"}} dataArray={this.renderCards(item)}/>
                        </Body>
                    </CardItem>
                    <CardItem footer bordered>
                      <Text style={{fontWeight: "bold"}}>Status: {this.renderFooter(item)}</Text>
                    </CardItem>
                </Card>
            );
        });
    }

    render() {
        return (
            <View>
                <SearchRequests filterRequests={this.filterRequests.bind(this)}/>
                <View style={{flex: 1}}>
                    <View style={{height:394}}>
                        <ScrollView style={styles.contentContainer}>
                            {this.renderRequests.bind(this)()}
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 20,
        borderWidth: 5,
        borderColor: "grey"
    },
    cardStyle: {
        flex:1,
        flexDirection:"row",
        justifyContent:'space-between'
    }
});

const mapStateToProps = (state) => {
    return {
        auth:state.auth
    }
};

export default connect(mapStateToProps)(DisplayRequests);