import axios from "axios";
import { SET_PARTICIPANT, SET_ASSET } from './types';
import store from '../utils/store';
import { Toast } from 'native-base';

export function setParticipant (content) {
    return {
      type: SET_PARTICIPANT,
      content
    };
}

export function setItem (action, content) {
    return {
      type: action,
      content
    };
}

export const submitParticipant = (data, callback) => {
    const req = axios.post(global.server_url+"/addParticipant", data);
    req.then((response)=>{
        console.log(response.data.error);
        if(response.status == 200 && response.data.message){
            callback("participant "+data.name+" added sucessfully");
        }
        else
            callback(response.data.error);
    })
    .catch((e) => {
        callback("error please try again");
    });
}

export const getParticipants = (filter) => {
    let { empId, name, email, role, department } = filter;
    let data = {empId, name, email, role, department};

    const req = axios.post(global.server_url+"/searchParticipant", data);
    return (dispatch) => {
        return req.then((response)=>{
            if(response.status == 200 && response.data.message){
                dispatch(setParticipant({participants: response.data.message}));
            }
            else {
                console.log(response.data.error);
                dispatch(setParticipant({participants: []}));
            }
        })
        .catch((e) => {
           console.log(e);
           dispatch(setParticipant({participants: []}));
        });
    }
}

export const removeItem = (params) => {
    let {index, itemCopy, path, action, type} = params;
    const req = axios.post(path, itemCopy[index]);
    return (dispatch) => {
        return req.then((response)=>{
            if(response.status == 200 && response.data.message){
                if(response.data.message.n > 0){
                    Toast.show({ text: type+' deleted sucessfully', buttonText: 'Okay', duration: 3000 });
                    itemCopy.splice(index);
                }
            }
            else {
                console.log(response.data.error);
                Toast.show({ text: response.data.error, buttonText: 'Okay', duration: 3000 });
            }
            dispatch(setItem(action, {[type]: itemCopy}));
        })
        .catch((e) => {
           console.log(e);
           dispatch(setItem(action, {[type]: itemCopy}));
        });
    }
}

export const deleteItem = (index, type) => {
    const state = store.getState();
    let params = {index,type};

    if(type === 'participants') {
        params.itemCopy = state.participant.participants.slice(0);
        params.path = "/deleteParticipant";
        params.action = SET_PARTICIPANT;
    }
    else if(type === 'assets') {
        params.itemCopy = state.asset.assets.slice(0);
        params.path = "/removeAssetAdmin";
        params.action = SET_ASSET;
    }
    return removeItem(params);
}

export const getDepts = (callback) => {
    const req = axios.get(global.server_url+"/getDepts");
    req.then(resp => {
        callback(resp.data);
    }).catch((e) => {
        callback([]);
    });
}