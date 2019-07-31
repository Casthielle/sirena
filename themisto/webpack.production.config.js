const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env) => {
  const plugins = [
     new ExtractTextPlugin("css/[name].[hash].css")
  ];

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

  if (env.NODE_ENV === 'production') {
    plugins.push(
      new CleanWebpackPlugin(['dist'], {root: __dirname})
    )
  }

  return {
    mode: "production",
    entry: {
      themisto: path.resolve(__dirname, 'src/index.js')
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[hash].js',
      publicPath: path.resolve(__dirname, 'dist')+"/",
      chunkFilename: 'js/[id].[chunkhash].js'
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
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader'
              }
            ]
          })
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
    plugins: plugins
  }
}
