// Import Webpack
const webpack = require('webpack');
// Import Path Module
const path = require('path');

// Import HtmlWebPackPlugin to bundle all HTML with script tags
const HtmlWebPackPlugin = require('html-webpack-plugin');

// Clean Dist Folder on Compilation 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//TerserJS, needed to Minify JS
const TerserJSPlugin = require('terser-webpack-plugin');

//MiniCssExtractPlugin to minify and extract CSS from css files
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//It will search for CSS assets during the Webpack build and will optimize \ minimize the CSS
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//Bundle Analyzer on Serve in Dev Mode
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Save Mode in a global variable
let mode = undefined;

const isDevMode = () => {
  return (mode === "development" );
}

const config = {
  //development by default
  mode: 'development',
  //Single Entry file, multiple are possible
  entry: './src/index.js',
  //Aliases for easier importing
  //Output Pat his Dist
  output: {
    path: path.resolve(__dirname, './dist'),
    //Filenames are hashes in production
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  //Development Tool in dev mode
  devtool: 'source-map',
  //Webpack devserver Plugin, serves from dist folder onto port 8080
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    liveReload: true,
    index: 'index.html',
  },
  module: {
    rules: [
      {
        test: /\.html$/, //Pack and minify html
        use: {
          loader: 'html-loader',
          options: {
            minimize: true, //Minimiere HTML
            interpolate: true, //Erlaube das Interpolieren von Bilder in HTML
            removeComments: true, //Entferne Kommentare
            collapseWhitespace: true, //Entferne Leerzeichen und Tabs, soweit möglich
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, //Packe und Minifiziere CSS
        use: [
          {
            loader: MiniCssExtractPlugin.loader, //Injiziere CSS in die Seite
          },
          {
            loader: 'css-loader', //Lädt CSS als Javascript Module
            options: {
              import: true,
            },
          }
        ],
      },
      {
        test: /\.js$/, //Packe und Minifiziere Javascript
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader', //Erlaube das Transpilieren von Javascript für ältere Browser
            options: {
              rootMode: 'upward',
            },
          }
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/, //Minifiziere png, svg, jpg, gif
        exclude: /repo_assets/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader', //Kompressionsalgorithmen
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              }
            }
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'index',
      inject: true,
      template: path.resolve('./src/index.html'),
      filename: path.resolve('./dist/index.html'),
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    //Hack to not include BundleAnalyzerPlugin in Dev Mode
    new BundleAnalyzerPlugin({
      analyzerHost: "localhost",
      analyzerPort: 8090,
      openAnalyzer: false,
      generateStatsFile: true
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  stats: {
     // copied from `'minimal'`
     all: false,
     modules: true,
     maxModules: 0,
     errors: true,
     warnings: true,
     // our additional options
     assets: true,
     chunks: true,
     chunkOrigins: true,
     chunksSort: "size",
     entrypoints: true,
     outputPath: true,
     performance: true
  }
};

//module.exports = config;
module.exports = (env, argv) => {
  return config;
};
