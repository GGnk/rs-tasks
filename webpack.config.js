// eslint-disable-next-line no-undef
const webpack = require('webpack');
// eslint-disable-next-line no-undef
const path = require('path');
// eslint-disable-next-line no-undef
const HtmlWebpackPlugin = require('html-webpack-plugin');

// eslint-disable-next-line no-undef
module.exports =  ( env, argv ) => {
  const isDevelopmentMode = ( argv.mode === "development" );

	// Locally, we want robust source-maps. However, in production, we want something
	// that can help with debugging without giving away all of the source-code. This
	// production setting will give us proper file-names and line-numbers for debugging;
	// but, without actually providing any code content.
	const devtool = isDevelopmentMode ? "source-map" : "nosources-source-map";

  // By default, each module is identified based on Webpack's internal ordering. This
	// can cause issues for cache-busting and long-term browser caching as a localized
	// change can create a rippling effect on module identifiers. As such, we want to
	// identify modules based on a name that is order-independent. Both of the following
	// plugins do roughly the same thing; only, the one in development provides a longer
	// and more clear ID.

    // eslint-disable-next-line no-unused-vars
	const moduleIdentifierPlugin = isDevelopmentMode ? new webpack.NamedModulesPlugin() : new webpack.HashedModuleIdsPlugin();

  return({
        entry: './src/index.js',
        output: {
            // eslint-disable-next-line no-undef
          path: path.resolve(__dirname, 'dist'),
          filename: 'scripts.js'
        },
        devtool: devtool,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: 'babel-loader',
                    exclude: /node_modules/
                  },
                  {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
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
                  {
                    test: /\.(png|svg|jpg|webmanifest)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                      {
                        loader: 'file-loader',
                        options: {
                          name: '[name].[ext]',
                          outputPath: 'assets/',
                        },
                      },
                    ],
                  },
            ]
        },

        plugins: [
          new HtmlWebpackPlugin({
            title: "English for Kids",
            filename: 'index.html',
            template: './public/index.html',
            inject: true,
            chunks: ['index'],
            // favicon: path.join(__dirname, '/public/favicon.ico'),
            'meta': {
              'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
              'msapplication-TileColor': '#da532c',
              'theme-color': '#ffffff'
            }
          })
        ]
  });
}
