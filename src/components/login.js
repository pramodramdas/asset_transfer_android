import React, { Component } from  'React';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Body, Title, Button } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import { userAuthenticate } from '../actions/auth';

class Login extends Component {

    constructor(props){
        super(props);
    }

    handleFormSubmit({ email, password }) {
        this.props.userAuthenticate({ email, password } , this);
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

    render() {
        const { handleSubmit, reset  } = this.props;

        return(
            <View>
                <Header>
                    <Body>
                        <Title>Login</Title>
                    </Body>
                </Header>
                <View style={{flexDirection:'column', justifyContent:'space-between'}}>
                    <Field name="email" placeholder="email" component={this.renderInput} />
                    <Field name="password" placeholder="password" component={this.renderInput} />
                    <Button block primary onPress= {handleSubmit(this.handleFormSubmit.bind(this))}>
                        <Text>Submit</Text>
                    </Button>
                    <Button block primary onPress= {()=>this.props.history.push('/signup')}>
                        <Text>Sign Up</Text>
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

const actionCreators = {
    userAuthenticate
}

Login = reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(Login);

export default connect(null, actionCreators)(Login);
//export default Login;