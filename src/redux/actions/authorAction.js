import * as types from '../actions/actionTypes';
import * as authorApi from '../../api/authorApi';
import { beginApiCall, EndApiCall } from './apiStatusAction';

export function loadAuthorsSuccess(authors) {
    return {
        type: types.LOAD_AUTHORS_SUCCESS,
        authors //object shorthand syntax, could have been course:course, but since it matches only course will suffice and will map it 
    };
}

export function loadAuthors() {
    return function (dispatch, getState) {
        console.log(getState());
        dispatch(beginApiCall());
        return authorApi.getAuthors().then(authors => {
            console.log(authors);
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            dispatch(EndApiCall(error));
            throw error;
        })
    }
}