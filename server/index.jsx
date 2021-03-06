import express from 'express';
import yields from 'express-yields';
import fs from 'fs-extra';
import React from 'react';
import createHistory from 'history/createMemoryHistory';
import path from 'path';
import webpack from 'webpack';

import { argv } from 'optimist';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { ConnectedRouter } from 'react-router-redux';
import { delay } from 'redux-saga';
import { get } from 'request-promise';

import { questions, question } from '../data/api-real-url';
import getStore from '../src/getStore';
import App from '../src/App';

const port = process.env.PORT || 3000;
const app = express();

const useLiveData = argv.useLiveData === "true";
const useServerRender = argv.useServerRender === "true";

if (process.env === 'development') {
	const config = require('../webpack.config.dev.babel');
	const compiler = webpack(config);

	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        }
	}));

	app.use(require('webpack-hot-middleware')(compiler));
} else {
	app.use(express.static(path.resolve(__dirname, '../dist')));
}

function* getQuestions() {
	let data;

	if (useLiveData) {
		data = yield get(questions, { gzip: true });
	} else {
		data = yield fs.readFile('./data/mock-questions.json', 'utf-8');
	}

	return JSON.parse(data);
}

function* getQuestion(question_id) {
	let data;

	if (useLiveData) {
		data = yield get(question(question_id), { gzip: true, json: true });
	} else {
		const questions = yield getQuestions();
		const question = questions.items.find(question => question.question_id == question_id);

		question.body = `Mock question body ${question_id}`;
		data = { items: [question] };
	}

	return data;
}

app.get('/api/questions', function* (request, response) {
	const data = yield getQuestions();
	yield delay(150);

	response.json(data);
});

app.get('/api/questions/:id', function* (request, response) {
	const data = yield getQuestion(request.params.id);
	yield delay(150);

	response.json(data);
});

app.get(['/', 'questions/:id'], function* (request, response) {
	let index = yield fs.readFile('./public/index.html', 'utf-8');
	const initialState = {
		questions: []
	};
	const history = createHistory({
		initialEntries: [request.path]
	})

	if (request.params.id) {
		const question_id = request.params.id;
		const response = yield getQuestion(question_id);
		const questionDetails = response.items[0];

		initialState.questions = [{ ...questionDetails, question_id }]
	} else {
		const questions = yield getQuestions();

		initialState.questions = [...questions.items];
	}

	const store = getStore(history, initialState);

	if (useServerRender) {
		const appRendered = renderToString(
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<App />
				</ConnectedRouter>
			</Provider>
		)
		index = index.replace(`<%= preloadedApplication %>`, appRendered);
	} else {
		index = index.replace(`<%= preloadedApplication %>`, `Please wait while we load the appplication.`);
	}

	response.send(index);
});

app.listen(port, '0.0.0.0', () => console.info(`App listening on ${port}`));
