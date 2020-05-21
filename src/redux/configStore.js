import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configStore(initialState) {
    const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose; // add support for Redux Devtools
    return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())));

}