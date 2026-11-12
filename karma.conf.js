const fs = require('fs');
const path = require('path');

// Detecta automáticamente la ruta de Brave en Windows y la asigna para el lanzador
const bravePaths = [
  'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
  'C:\\Program Files (x86)\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
  process.env.LOCALAPPDATA + '\\BraveSoftware\\Brave-Browser\\Application\\brave.exe'
];
process.env.CHROME_BIN = bravePaths.find(p => fs.existsSync(p));

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      { pattern: 'src/**/*.test.js', watched: false }
    ],
    preprocessors: {
      'src/**/*.test.js': ['webpack', 'sourcemap']
    },
    webpack: {
      mode: 'development',
      resolve: {
        extensions: ['.js', '.jsx']
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            use: ['file-loader']
          }
        ]
      }
    },
    reporters: ['progress'],
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  });
};