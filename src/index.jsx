import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'redux';
import { ConnectedRouter } from 'react-router-redux';
import craeteHistory from 'history/createBrowserHistory';

import getStore from './getStore';
import App from './App';

const history = craeteHistory()
const store = getStore(history);

// Hot reloading: No necessary refresh the changes to update contents
if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;

        render(NextApp);
    })
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

const fetchDataForLocation = location => {
    if (location.pathname === "/") {
        store.dispatch({ type: 'REQUEST_FETCH_QUESTIONS' });
    }

    if (location.pathname.includes('questions')) {
        store.dispatch({
            type: 'REQUEST_FETCH_QUESTION',
            questions_id: location.pathname.split('/')[2]
        });
    }
}

fetchDataForLocation(history.location);
history.listen(fetchDataForLocation);