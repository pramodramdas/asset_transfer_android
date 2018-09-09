import { connect } from "react-redux";
import { View, Text } from 'react-native';
import { Container, Tabs, Tab, Header, Input, Button, Picker, Form, Toast, Item } from 'native-base';
import React from "react";
import { submitParticipant, getParticipants, getDepts } from '../../actions/index';
import SearchItems from '../search_items';


class Participant extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        empId: "",
        name: "",
        email: "",
        role: "user",
        department: "",
        depList: [],
        message: "",
        loading: false
    }

    componentDidMount() {
        getDepts(({data}) => {
            this.setState({depList: data});
            if(data.length > 0) this.setState({department:data[0].depName});
        })
    }

    onFieldChange(field, value) {
        this.setState({[field]:value});
    }

    handleChange(value) {
        debugger
        this.setState({role:value});
    }

    depChange(value) {
        this.setState({department:value});
    }

    addParticipant() {
        let { empId, name, email, role, department } = this.state;

        if(!empId || !name || !email || !role || !department) {
            Toast.show({ text: "all fields are required", buttonText: 'Okay', duration: 3000 });
            return;
        }

        this.setState({loading:true});
        submitParticipant({ empId, name, email, role, department }, (message)=>{
            this.setState({loading:false});
            Toast.show({ text: message, buttonText: 'Okay', duration: 3000 });
        });
    }

    searchParticipant() {
        let filter = JSON.stringify(this.state, (key, value) => {if(value)return value});
        this.props.getParticipants(JSON.parse(filter));
    }

    render() {
        return(
            <View style={{flex:1, flexDirection:"column"}}>
                <View style={{flex:1, flexDirection:"column", width:"100%", height:400 }}>
                    <Form>
                        <Item regular style={{height:40}}>
                            <Input placeholder="Employee Id" onChangeText={this.onFieldChange.bind(this,"empId")}/>
                        </Item>
                        <Item regular style={{height:40}}>
                            <Input placeholder="Participant Name" onChangeText={this.onFieldChange.bind(this,"name")}/>
                        </Item>
                        <Item regular style={{height:40}}>
                            <Input placeholder="Email ID" onChangeText={this.onFieldChange.bind(this,"email")}/>
                        </Item>
                        <Picker style={{height:40}} mode="dropdown" placeholder="Dept" selectedValue={this.state.department} onValueChange={this.depChange.bind(this)}>
                            {
                                this.state.depList.map((dep, i) => {
                                    return <Picker.Item key={i} label={dep.depName} value={dep.depName} />
                                })
                            }
                        </Picker>
                        <Picker style={{height:40}} mode="dropdown" placeholder="Role" selectedValue={this.state.role} onValueChange={this.handleChange.bind(this)}>
                            <Picker.Item label="User" value="user" />
                            <Picker.Item label="Admin" value="admin" />
                        </Picker>
                        <View style={{flex:1, flexDirection:"row", width:"100%", justifyContent:'space-between'}}>
                            <Button primary style={{width:100, justifyContent:'center'}} onPress={this.addParticipant.bind(this)} >
                                <Text>Add</Text>
                            </Button>
                            <Button primary style={{width:100, justifyContent:'center'}} onPress={this.searchParticipant.bind(this)} >
                                <Text>Search</Text>
                            </Button>
                        </View>
                    </Form>
                </View>
                <View style={{height:300}}>
                    <SearchItems type="participants"/>
                </View>
            </View>
        );
    }
}

const actionCreators = { getParticipants };

export default connect(null, actionCreators)(Participant);