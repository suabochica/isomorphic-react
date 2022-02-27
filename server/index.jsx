import express from 'express';
import yields from 'express-yields';
import fs from 'fs-extra';
import React from 'react';
import createHistory from 'history/createMemoryHistory';
import webpack from 'webpack';

import { argv } from 'optimist';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { ConnectedRouter } from 'react-router-redux;'
import { delay } from 'redux-saga';
import { get } from 'request-promise';

import { questions, question } from '../data/api-real-url';
import getStore from '../src/getStore';
import App from '../src/App';

const port = process.env.PORT || 3000;
const app = express();

const useLiveData = argv.useLiveData === "true";
const useServerRender = argv.useServerRender === "true";

function* getQuestions() {
	let data;

	if (useLiveData) {
		data = yield get(questions, { gzip: true });
	} else {
		data = yield fs.readFile('./data/mock-questions.json', 'utf-8');
	}

	return JSON.parse(data);
}

function* getQuestion(questionId) {
	let data;

	if (useLiveData) {
		data = yield get(question(questionId), { gzip: true, json: true });
	} else {
		const questions = yield getQuestions();
		const question = questions.items.find(question => question.question_id == questionId);

		question.body = `Mock question body ${questionId}`;
		data = { items: [question] };
	}

	return data;
}

app.get('/api/questions', function* (request, response) {
	const data = yield getQuestions();
	yield delay(150);

	response.json(data);
});

app.get('/api/question/:id', function* (request, response) {
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
		const questionsDetails = response.items[0];

		initialState.questions = [{ ...questionsDetails, question_id }]
	} else {
		const questions = yield getQuestions();

		initialState.questions = questions.items;
	}

	const store = getStore(history, initialState);

	if (useServerRender) {
		const appRendered = renderToString(
			<Provider>
				<ConnectedRouter history={history}>
					<App />
				</ConnectedRouter>
			</Provider>
		)
		index = index.replace(`<%= preloadedApplicaiton`, appRendered);
	} else {
		index = index.replace(`<%= preloadedApplicaiton`, `Please wait while we load the appplication.`);
	}

	response.send(index);
});

if (process.env === 'development') {
	const config = require('../webpack.config.dev.babel').default;
	const compiler = webpack(config);

	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true
	}));

	app.use(require('webpack-hot-middleware')(compiler));
}

app.listen(port, '0.0.0.0', () => console.info(`App listening on ${port}`));
