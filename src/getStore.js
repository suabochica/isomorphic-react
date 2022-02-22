import { createStore, combineReducers, applyMiddelware } from 'redux';
import { identity } from 'lodash';

export default function ( defaultState = {
    test: "Test values"
}) {
    const store = createStore(identity, defaultState);

    return store;
}