const path = require('path');

module.exports = {
	mode: 'production',
  entry: './scripts/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'build.js'
  },

  // watch: true,

  module: {
	  rules: [
	    {
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: ['@babel/preset-env'],
	          plugins: ['@babel/plugin-transform-runtime']
	        }
	      }
	    }
	  ]
	}
};