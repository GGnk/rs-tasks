const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '.env')
} );

module.exports =  ( env, argv ) => {

    const isDevelopmentMode = ( argv.mode === "development" );

    const devtool = isDevelopmentMode ? "source-map" : "nosources-source-map";

    return({
          node: {
            fs: "empty"
          },
          devServer: {
              contentBase: [path.join(__dirname, '../src/index.js'), path.join(__dirname, '../public/assets')]
          },
          entry: ['./src/index.js', './src/scss/app.scss'],
          output: {
              // eslint-disable-next-line no-undef
            path: path.resolve(__dirname, 'dist'),
            filename: 'scripts.js'
          },
          devtool: devtool,
          module: {
            rules: [
              { enforce: 'pre', test: /\.js$/, loader: 'eslint-loader'},
              {
                  test: /\.js$/,
                  use: 'babel-loader',
                  exclude: /node_modules/
              },
              {
                test: /\.scss$/,
                use: [
                  'style-loader',
                  {
                    loader: 'file-loader',
                    options: { outputPath: 'assets/css/', name: 'style.css'}
                  },
                  'sass-loader'],
              },
            ]
          },

          plugins: [
              new HtmlWebpackPlugin({
                  title: "Movie Search",
                  filename: 'index.html',
                  template: './public/index.html',
                  inject: true,
                  chunks: ['index'],
                  meta: {
                    'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                    'msapplication-TileColor': '#da532c',
                    'theme-color': '#ffffff'
                  }
            }),
              new CopyPlugin([
                  { from: 'public/assets', to: 'assets/' },
              ]),
            new webpack.DefinePlugin( {
              "process.env": dotenv.parsed
            } ),
          ]
    });
}
