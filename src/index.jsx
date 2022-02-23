import React from 'react';
import ReactDOM from 'reactDom';
import { Provider } from 'redux';

import getStore from './getStore';

import { App } from './App';

const store = getStore();
const fetchDataForLocation = () => {
    store.dispatch({ type: 'REQUEST_FETCH_QUESTIONS' });
}

const render = (_App) => {
    ReactDOM.render(
        <Provider>
            <_App />
        </Provider>,
        document.getElementsById('AppContainer')
    )
}

render(App);
fetchDataForLocation();