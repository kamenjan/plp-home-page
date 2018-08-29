const path = require("path");
const webpack = require('webpack');

const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: ["babel-polyfill", "./app.js"],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "js/[name].js"
	},
	devServer: {
		contentBase: "./dist"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {}
					}
				]
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: "babel-loader"
					},
					{
						loader: "react-svg-loader",
						options: {
							jsx: true, // true outputs JSX tags
							svgo: {
								plugins: [
									{
										removeTitle: true
									},
									{
										removeUnknownsAndDefaults: {
											unknownContent: true,
											unknownAttrs: false,
											defaultAttrs: true,
											uselessOverrides: true,
											keepDataAttrs: true,
											keepAriaAttrs: true
										}
									},
									{
										cleanupIDs: {
											remove: false,
											minify: false,
											prefix: '',
											preserve: [],
											force: false
										}
									}
								]
							}
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./index.html",
			filename: "./index.html"
		}),
		new CopyWebpackPlugin(
			[ { from: 'static/images', to: './images/' } ], {}
		)
	],
	resolve: {
		modules: [
			/* Path resolvers for application imports using absolute path */
			path.resolve('./'),
			path.resolve('./node_modules')
		]
	}
};
