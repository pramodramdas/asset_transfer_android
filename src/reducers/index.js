import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import participant from "./participant";
import asset from "./asset";
import auth from './auth';

export default combineReducers({
    form,
    auth,
    participant,
    asset
})