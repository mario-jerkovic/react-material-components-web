/* eslint-disable */
var path = require('path');
var webpack = require('webpack');

var projectRoot = path.resolve(__dirname, '..');
var exampleRoot = path.resolve(projectRoot, 'examples');
var buildPath = path.resolve(exampleRoot, 'build');

var plugins = [];
if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }));
}

module.exports = {
  entry: {
    app: [path.resolve(exampleRoot, 'app.js')]
  },
  plugins: plugins,
  output: {
    path: buildPath,
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/
        ],
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css?importLoaders=1'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    root: path.join(exampleRoot, 'node_modules'),
    // Webpack can load duplicate modules from `modulesDirectory`
    // So we don't use it
    modulesDirectories: [],
    // But, we have also to use modules not in examples/node_modules
    fallback: path.join(projectRoot, "node_modules")
  },
  resolveLoader: {
    root: path.join(exampleRoot, 'node_modules')
  },
  devServer: {
    historyApiFallback: true
  }
};
