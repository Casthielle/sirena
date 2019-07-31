const path = require('path');

module.exports = (env) => {
  const presets = [
     ["@babel/plugin-proposal-decorators", { "legacy": true }],
     "@babel/plugin-proposal-function-sent",
     "@babel/plugin-proposal-export-namespace-from",
     "@babel/plugin-proposal-numeric-separator",
     "@babel/plugin-proposal-throw-expressions",
     "@babel/plugin-syntax-dynamic-import",
     "@babel/plugin-syntax-import-meta",
     ["@babel/plugin-proposal-class-properties", { "loose": false }],
     "@babel/plugin-proposal-json-strings"
  ];

  return {
    mode: "development",
    entry: {
      themisto: path.resolve(__dirname, 'src/index.js')
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js'
    },
    devServer: {
      port: 9000,
      host: '0.0.0.0'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env','@babel/preset-react', { plugins: presets }],
            }
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: 'images/[name].[hash].[ext]',
            }
          }
        },
      ]
    },
  };
}
