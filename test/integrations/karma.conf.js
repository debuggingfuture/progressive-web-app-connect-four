var webpackConfig = require('../../webpack.config.js');
// webpackConfig.entry = {};
webpackConfig.context = '../../';
module.exports = function(config) {
  config.set({
    basePath: '../..',
    frameworks: ['mocha'],
    // list of files / patterns to load in the browser
    // as entry point
    files: [
      'test/integrations/*.js'
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/integrations/*.js': ['webpack'],
      'index.js': ['webpack']
    },
    // once enable this mocha don't appear in browser
    // client: {
    //   mocha: {
    //     reporter: 'html', // change Karma's debug.html to the mocha web reporter
    //     ui: 'tdd'
    //   }
    // },
    webpack: webpackConfig,
    autoWatch: true,
    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-phantomjs-launcher',
    ],
    browsers: ['PhantomJS']
  });
};
