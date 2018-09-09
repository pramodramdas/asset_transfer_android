import React from 'react';
import axios from "axios";
import { NativeRouter, MemoryRouter, Route, Link, Switch, Prompt } from 'react-router-native';
import { View, Text } from 'react-native';
import { Alert } from 'react-native';
import createMemoryHistory from 'history/createMemoryHistory';
import IndexComponent from './index.js';
import Login from './components/login';
import SignUp from './components/signup';
import Home from './components/home';
import Admin from './components/admin';
import { requireRouteAuth } from './actions/index';

const history = createMemoryHistory()
const getConfirmation = (message, callback) => {
    requireRouteAuth({props:{history}}, callback);
}

const RouterComponent = () => {
    return(
        <NativeRouter getUserConfirmation={getConfirmation}>
            <View>
                <Route path="/" history={history} render={
                    (props) => {
                        return <IndexComponent history={props.history}>
                            <Switch>
                                <Route path="/login" component={Login} />
                                <Route path="/admin" component={Admin}/>
                                <Route path="/home" component={Home} />
                                <Route path="/signup" component={SignUp} />
                                <Route component={Login} />
                            </Switch>
                        </IndexComponent>
                    }}
                />
                <Prompt when={true} message={
                    location => {
                        if(location.pathname!="/login" && location.pathname!="/signup")
                            return "yes";
                    }}
                />
            </View>
        </NativeRouter>
    );
};

export default RouterComponent;