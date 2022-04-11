const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ESLintPlugin = require('eslint-webpack-plugin');
const glob = require('glob');

module.exports = {
	plugins: [
		// Для просмотра структуры бандлов раскомментируйте следующую строку и перейти по ссылке http://localhost:8888/
		// new BundleAnalyzerPlugin()

		new ESLintPlugin({
			failOnError: false,
			emitWarning: true
		})
	],
	entry: glob.sync('./src/scripts/*.js').reduce(function (obj, el) {
		obj[path.parse(el).name] = el;
		return obj
	}, {}),

	output: {
		path: path.join(__dirname, './build/scripts'),
		filename: '[name].js',
		sourceMapFilename: '[name].map'
	},

	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					}
				}
			}
		]
	}
};
