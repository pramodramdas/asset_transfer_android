import React, { Component } from  'React';
import { View, Text } from 'react-native';
import { Link } from 'react-router-native';
import { Segment, Header, Title, Content, Button, Left, Right, Body, Icon } from 'native-base';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderComponent extends Component {

    constructor(props){
        super(props);
    }

    state = {
        currActive: "Seg2"
    }

    onSegmentChange(id) {
        this.setState({currActive:id},
        () =>{
            if(id == "Seg2")
                this.props.history.push('/home');
            else if(id == "Seg1")
                this.props.history.push('/admin');
        });
    }

    render() {
        const { role } = this.props.auth;
        return(
            <Header>
                <Body>
                    <Segment>
                        {
                            (role === "admin")?
                            <Button id="Seg1" first success active={this.state.currActive=="Seg1"} onPress={this.onSegmentChange.bind(this, "Seg1")}><Text>Admin</Text></Button>:
                            null
                        }
                        <Button id="Seg2" last success active={this.state.currActive=="Seg2"} onPress={this.onSegmentChange.bind(this, "Seg2")}>
                            <Text>Home</Text>
                        </Button>
                    </Segment>
                </Body>
                <Right>
                    <Button  rounded info onPress={()=>{ this.props.logout(this); }}>
                        <Text>Log out</Text>
                    </Button>
                </Right>
            </Header>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        auth:state.auth
    }
};

const actionCreators ={
    logout
};

//HeaderComponent.contextTypes = {
//    router: PropTypes.object.isRequired,
//    history: PropTypes.object.isRequired
//};

export default connect(mapStateToProps, actionCreators)(HeaderComponent);