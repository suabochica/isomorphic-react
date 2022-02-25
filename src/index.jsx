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

// Hot reloading: No necessary refresh the changes to update contents
if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;

        render(NextApp);
    })
}

render(App);
fetchDataForLocation();