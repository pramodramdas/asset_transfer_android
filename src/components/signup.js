import React, { Component } from  'React';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Body, Title, Button, Toast } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import { userSignUp } from '../actions/auth';

class SignUp extends Component {

    constructor(props){
        super(props);
    }

    state = {
        name: "",
        s_email: "",
        s_password: "",
        confirmPassword: ""
    }

    handleSignUp(){
        let { name, s_email, s_password, confirmPassword } = this;
        let msg = "";

        if(!name || !s_email || !s_password || !confirmPassword)
            Toast.show({ text: "all fileds are mandatory", buttonText: 'Okay', duration: 3000 });
        else if(s_password !== confirmPassword)
            Toast.show({ text: "password did not match", buttonText: 'Okay', duration: 3000 });

        if(msg) {
            Toast.show({ text: msg, buttonText: 'Okay', duration: 3000 });
            return;
        }

        userSignUp(
            { name, email: s_email, password: s_password },
            (err, msg) => {
                if(err)
                    Toast.show({ text: err, buttonText: 'Okay', duration: 3000 });
                else
                    Toast.show({ text: msg, buttonText: 'Okay', duration: 3000 });
            }
        );
    }

    renderInput({ input, label, type, meta: { touched, error, warning }, placeholder }){
        var hasError= false;
        if(error !== undefined){
          hasError= true;
        }
        return(
          <Item error= {hasError}>
            <Input {...input} placeholder={placeholder} />
            {hasError ? <Text>{error}</Text> : <Text />}
          </Item>
        )
    }
//Toast.show({ text: "all fields are required", buttonText: 'Okay', duration: 3000 });
    render() {
        const { handleSubmit, reset  } = this.props;

        return(
            <View>
                <Header>
                    <Body>
                        <Title>Sign Up</Title>
                    </Body>
                </Header>
                <View style={{flexDirection:'column', justifyContent:'space-between'}}>
                    <Field name="name" placeholder="name" component={this.renderInput} />
                    <Field name="s_email" placeholder="email" component={this.renderInput} />
                    <Field name="s_password" placeholder="password" component={this.renderInput} />
                    <Field name="confirmPassword" placeholder="confirm password" component={this.renderInput} />
                    <Button block primary onPress= {handleSubmit(this.handleSignUp.bind(this))}>
                        <Text>Submit</Text>
                    </Button>
                    <Button block primary onPress= {()=>this.props.history.push('/login')}>
                        <Text>Login</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const formStyle = {
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center",
    "paddingTop": 20,
    "paddingBottom": 20
}

SignUp = reduxForm({
  form: 'signup',
  fields: ['name', 's_email', 's_password', 'confirmPassword']
})(SignUp);

export default connect(null, {})(SignUp);