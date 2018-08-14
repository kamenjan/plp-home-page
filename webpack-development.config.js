const webpack = require('webpack');
let baseConfig = require('./webpack.config.js');

// const path = require("path");

baseConfig.devtool = 'source-map';

let sassLoader = {
	test: /\.scss$/,
	use: [{
		loader: "style-loader"
	}, {
		loader: "css-loader", options: {
			sourceMap: true
		}
	}, {
		loader: "sass-loader", options: {
			sourceMap: true
		}
	}]
};

let cssLoader = {
	test: /\.css$/,
	use: [{
		loader: "style-loader" // creates style nodes from JS strings
	}, {
		loader: "css-loader", // translates CSS into CommonJS
		options: {
			sourceMap: true
		}
	}]
};

baseConfig.module.rules.push(cssLoader);
baseConfig.module.rules.push(sassLoader);

baseConfig.plugins.push(
	new webpack.DefinePlugin({
		ENV: JSON.stringify("development")
	}),
);

module.exports = baseConfig;