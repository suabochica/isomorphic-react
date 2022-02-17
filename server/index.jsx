import express from 'express';
import yields from 'express-yields';
import fs from 'fs-extra';
import webpack from 'webpack';

const port = process.env.PORT || 3000;
const app = express();

if (process.env === 'development') {
	const config = require('../webpack.config.dev.babel').default;
	const compiler = webpack(config);

	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true
	}));

	app.use(require('webpack-hot-middleware')(compiler));
}

app.get(['/'], function * (request, response) {
	let index = yield fs.readFile('./public/index.html', 'utf-8');
	response.send(index);
});

app.listen(port, '0.0.0.0', () => console.info(`App listening on ${port}`));
