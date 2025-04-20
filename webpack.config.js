const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var SRC_PATH = path.resolve(__dirname, './src');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
	    test: /\.(scss|css)$/,
	    use: [
	        "style-loader",
	    	"css-loader",
	    	"sass-loader"
	    ]
      }
    ]
  },
  resolve: {
  	modules: [
  		SRC_PATH,
  		"node_modules"
  	],
  	enforceExtension: false,
  	alias: {
  		'styles': path.resolve(SRC_PATH, 'styles'),
        'component': path.resolve(SRC_PATH, 'component')
  	},
      extensions: ['.js', '.jsx']
  },
  devServer: {
    static: './public',
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '/src/index.html')
    })
  ]
};
