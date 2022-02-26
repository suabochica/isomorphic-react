import React from 'react';
import ReactDOM from 'reactDom';
import { Provider } from 'redux';
import { ConnectedRouter } from 'react-router-redux';
import craeteHistory from 'history/createBrowserHistory';

import getStore from './getStore';

import { App } from './App';

const history = craeteHistory()
const store = getStore(history);
const fetchDataForLocation = () => {
    store.dispatch({ type: 'REQUEST_FETCH_QUESTIONS' });
}

const render = (_App) => {
    ReactDOM.render(
        <Provider>
            <ConnectedRouter history={history}>
                <_App />
            </ConnectedRouter>
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

// render(App);
store.subscribe(() => {
    const state = store.getState();

    if (state.questions.lenght > 0) {
        console.info("Mounting the app");

        render(App);
    } else {
        console.info("App not yet mounting");
    }
});

fetchDataForLocation();