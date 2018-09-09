import axios from "axios";
import { SET_AUTH_DATA } from "./types";
import store from '../utils/store';
import { AsyncStorage } from "react-native"
import { Toast } from 'native-base';

export function setAuthData (auth) {
    return {
      type: SET_AUTH_DATA,
      auth
    };
}

export const logout = (that) => {
    setTokenToAxios();
    return async (dispatch) => {
        await AsyncStorage.removeItem('auth');
        await dispatch(setAuthData({jwtToken:null}));
        if(that)
            that.props.history.push('/login');
    }
}

export const requireAuth = async (that) => {
    const auth = await AsyncStorage.getItem('auth');
    const accessToken = auth ? JSON.parse(auth).jwtToken : null;
    const req = axios.get(global.server_url+"/validate?authToken="+accessToken);

    req.then(resp => {
        if(!resp || resp.data.sucess === false){
            logout()(store.dispatch);
            that.props.history.push('/login');
        }
    })
     .catch(error => {
         logout()(store.dispatch);
         that.props.history.push('/login');
     });
}

export const requireRouteAuth = async (that, callback) => {
    const auth = await AsyncStorage.getItem('auth');
    const accessToken = auth ? JSON.parse(auth).jwtToken : null;
    const req = axios.get(global.server_url+"/validate?authToken="+accessToken);

    req.then(resp => {
        if(!resp || resp.data.sucess === false){
            logout()(store.dispatch);
            that.history.push('/login');
            callback(false);
        }
        else
            callback(true);
    })
     .catch(error => {
         logout()(store.dispatch);
         that.props.history.push('/login');
         callback(false);
     });
}

export const userAuthenticate = (authObj, that) => {
    const req = axios.post(global.server_url+"/authenticate", authObj);
    let msg = '';

    return (dispatch) => {
        return req.then(async (response) => {
            if(response && response.status == 200) {
                const { auth } = response.data;
                if(auth){
                    setTokenToAxios(auth.jwtToken);
                    await AsyncStorage.setItem('auth', JSON.stringify(auth));
                    await dispatch(setAuthData(auth));
                    that.props.history.push('/home');
                }
                else
                    Toast.show({ text: "wrong username or password", buttonText: 'Okay', duration: 3000 })
            }
        })
        .catch((err) => {
            debugger
            msg = (err.response && (err.response.status == 401)) ? "wrong username or password" : err.message;
            console.log(err);
            Toast.show({ text: msg, buttonText: 'Okay', duration: 3000 })
        });
    }
}

export const userSignUp = (authObj, callback) => {
    const req = axios.post(global.server_url+"/signup", authObj);

    return req.then((response) => {
        if(response && response.data.sucess) {
            callback(null, "user added sucessfully");
        }
        else {
            if(response.data.message) callback(response.data.message);
            else callback("error signup unsucessful");
        }
    });
}

export const checkAuth = async (history) => {
    const auth = await AsyncStorage.getItem('auth');
    const accessToken = auth ? JSON.parse(auth).jwtToken : null;

    if(accessToken) {
        store.dispatch(setAuthData(JSON.parse(auth)));
        setTokenToAxios(accessToken);
        history.push('/home');
    }
    else {
        history.push('/login');
    }
}

export const setTokenToAxios = (token) => {
    if (token) {
      axios.defaults.headers.common["authToken"] = token;
    } else {
      delete axios.defaults.headers.common["authToken"];
    }
};
