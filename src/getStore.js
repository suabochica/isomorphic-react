import { createStore, combineReducers, applyMiddelware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { routerReducer as router, routerMiddleware } from 'react-router-redux';

import fetchQuestionsSaga from './sagas/fetch-questions-saga';
import fetchQuestionSaga from './sagas/fetch-question-saga';
import * as reducers from './reducers'

export default function (history, defaultState) {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = routerMiddleware(history);
    const middlewareChain = [middleware, sagaMiddleware];

    if (process.env.NODE_ENV === 'development') {
        const logger = createLogger();

        middlewareChain.push(logger);
    }

    const store = createStore(
        combineReducers({ ...reducers, router }),
        defaultState,
        applyMiddelware(...middlewareChain)
    );
    sagaMiddleware.run(fetchQuestionsSaga);
    sagaMiddleware.run(fetchQuestionSaga);

    return store;
}