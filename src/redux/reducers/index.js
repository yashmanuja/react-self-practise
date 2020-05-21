import { combineReducers } from 'redux';
import courses from './courseReducer';
import { authorReducer } from './authorReducer'; // Since it is exported as default function we ccan use any name, here I am using the same name as it is declared in the file (authorReducer)
import apiCallStatusReducer from './apiStatusReducer';

const rootReducer = combineReducers({
    courses,
    authorReducer,
    apiCallStatusReducer
});

export default rootReducer;