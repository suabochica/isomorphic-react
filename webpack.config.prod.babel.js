import path from 'path';
import webpack from 'webpack';

export default {
	entry: [
		'babel-regenerator-runtime',
		path.resolve(__dirname, 'src/')
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				WEBPACK: true
			}
		}),
        new webpack.optimize.UglifyJsPlugin(),
	],
	resolve: {
		extensions: ['.js', '.json', '.jsx']
	},
	module: {
		loader: [
			{
				test: /\.jsx/,
				use: {
					loader: 'babel-loader'
				},
				include: path.resove(__dirname, 'src')
			}
		]
	}
}
