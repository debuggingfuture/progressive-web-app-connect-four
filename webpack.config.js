var HtmlWebpackPlugin = require('html-webpack-plugin');
var OfflinePlugin = require('offline-plugin');
var path = require('path');

var offlinePluginOptions = {
  ServiceWorker:{
    'entry':'./app/service-worker.js'
  },
  onInstalled: (() => console.log(arguments))
};

var config = {
  entry: {
    'app':'index.js',
    'vendors': [
      'angular', 'lodash', 'angular-route'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {test: /\.png$/, loader: "url-loader?limit=100000"},
      {test: /\.(woff(2)?|eot|svg|ttf)$/, loader: "url-loader?limit=100000"},
      {test: /\.jpg$/, loader: "file-loader"},
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.html$/,
        loader: "html"
      }
    ]
  },
  externals: {
    // if we do CDN
    // 'angular': 'angular'
  },
  resolve: {
    root: [__dirname],
    extensions: ['', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Connect Four',
      template: 'index.ejs' // Load a custom template
      // inject: 'body' // Inject all scripts into the body
    }),
    new OfflinePlugin(offlinePluginOptions)
  ]

};

if (process.env.NODE_ENV === 'dev') { // Production
  config['devtool'] = 'eval';
}

module.exports = config;
