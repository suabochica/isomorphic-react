const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");

export default {
	entry: [
		'babel-regenerator-runtime',
		path.resolve(__dirname, 'src')
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				WEBPACK: true
			}
		}),
	],
	resolve: {
		extensions: ['.js', '.json', '.jsx']
	},
	module: {
		loader: [
			{
				test: /\.jsx?$/,
				use: {
					loader: 'babel-loader'
				},
				include: path.resolve(__dirname, 'src')
			}
		]
	}
}
