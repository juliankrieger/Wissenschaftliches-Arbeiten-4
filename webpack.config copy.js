 [...] 
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
              name: '[hash].[ext]',
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
    }),
    new MiniCssExtractPlugin({
      filename: '[hash].css',
      chunkFilename: '[hash].css',
    }),
    new BundleAnalyzerPlugin()
  ],
  [...]
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  }