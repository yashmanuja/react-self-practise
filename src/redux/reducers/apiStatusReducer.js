import * as types from '../actions/actionTypes';
import initialState from './initialState';

// helper function to check if api is success

function actionTypeEndsInSucess(type) {
    return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiCallStatusReducer(state = initialState.apiCallsInProgress, action) {
    if (action.type === types.BEGIN_API_CALL) {
        return state + 1;
    }
    else if (actionTypeEndsInSucess(action.type) || action.type === types.API_CALL_ERROR) {
        return state - 1;
    }
    return state;
}