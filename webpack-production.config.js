const webpack = require('webpack');
let baseConfig = require('./webpack.config.js');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// TODO: In production, certain assets should be extracted using plugins for better performance
let sassLoader = {
	test: /\.scss$/,
	use: [{
		loader: "style-loader"
	}, {
		loader: "css-loader"
	}, {
		loader: "sass-loader"
	}]
};

let cssLoader = {
	test: /\.css$/,
	use: [{
		loader: "style-loader" // creates style nodes from JS strings
	}, {
		loader: "css-loader"
	}]
};

baseConfig.module.rules.push(cssLoader);
baseConfig.module.rules.push(sassLoader);

baseConfig.plugins.push(
	new webpack.DefinePlugin({
		ENV: JSON.stringify("production")
	})
);

baseConfig.plugins.push(
	new UglifyJSPlugin({
		test: /\.js$/,
		exclude: /node_modules/,
		uglifyOptions: {
			ecma: 8,
			warnings: true
		}
	})
);

module.exports = baseConfig;