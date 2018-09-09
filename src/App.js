import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import store from "./utils/store";
import Router from "./Router";
import { AsyncStorage } from "react-native";
import { Root, Toast } from "native-base";

class App extends Component {

    componentWillMount() {
        global.server_url = 'http://10.0.2.2:3030';
    }

    render() {
        return (
            <Root>
                  <Provider store={store}>
                       <Router />
                  </Provider>
                  <Text>Toast</Text>
            </Root>
        );
    }
}

export default App;