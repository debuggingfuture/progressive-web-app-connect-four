// For deploy only
var webpack = require('webpack');
var ghPages = require('gulp-gh-pages');
var gulp = require('gulp');
var webpackConfig = require('./webpack.config.js');

process.env.NODE_ENV = 'prd';

gulp.task('webpack', function(callback) {
    // run webpack
  webpack(webpackConfig, function(err, stats) {
    if (err) throw new gutil.PluginError("webpack", err);
    callback();
  });
});

gulp.task('deploy', ['webpack'], function() {
  return gulp.src('dist/**/*')
   .pipe(ghPages());
});
