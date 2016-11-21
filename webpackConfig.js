const path = require('path');
// const BowerWebpackPlugin = require('bower-webpack-plugin');

module.exports = {
	entry: './demo/main.js',
	output: {
		path:path.join(__dirname, 'demo/js'),
		filename: 'main.js',
		sourceMapFilename: '[file].map'
	},
	watch: true,
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: __dirname,
				loader: 'babel',
				query: {
					presets: ['es2015']
				}
			}
		]
	}
};
