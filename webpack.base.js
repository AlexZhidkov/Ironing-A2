const autoprefixer = require('autoprefixer');
const path = require('path');


module.exports = {
  assets: [
    {from: 'node_modules/angular2-toaster/lib/toaster.css'},
    {from: 'node_modules/material-design-lite/dist/material.grey-red.min.css'}
  ],

  entry: {
    main: './src/main',
    vendor: [
      'es6-shim',
      'angular2/bundles/angular2-polyfills',
      'angular2/common',
      'angular2/core',
      'angular2/platform/browser',
      'angular2/router',
      'firebase',
      'immutable',
      'material-design-lite',
      'rxjs/subject/ReplaySubject'
    ]
  },

  output: {
    filename: '[name].js',
    path: path.resolve('./target'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['', '.ts', '.js'],
    modulesDirectories: ['node_modules'],
    root: path.resolve('./src')
  },

  module: {
    noParse: [
      /angular2\/bundles\/.+/
    ]
  },

  postcss: [
    autoprefixer({ browsers: ['last 3 versions', 'Firefox ESR'] })
  ],

  sassLoader: {
    outputStyle: 'compressed',
    precision: 10,
    sourceComments: false
  }
};
