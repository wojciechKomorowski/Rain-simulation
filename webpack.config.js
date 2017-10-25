var path = require('path'); 
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	entry: "./js/app.js",
	output: { 
        path: path.resolve(__dirname),
        filename: "./js/out.js" 
    },
    watch: true,
	module: {
        loaders: [
            {
                test: /\.js$/,  exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015'] }
            },
            // {
            // 	test: /\.scss$/,
            // 	loader: ['style-loader', 'css-loader', 'sass-loader']
            // }
        ]
    }
}