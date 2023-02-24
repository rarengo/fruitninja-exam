const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "./")
    },
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpg|gif|)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outputPath: 'images',              
            }
          },
        ],
       type: 'javascript/auto'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          'css-loader' 
        ]
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              name: './[name].[ext]',
              outputPath: 'fonts',              
            }
          },
        ],
       type: 'javascript/auto'
      },
    ],
  },
  watch: true
};
