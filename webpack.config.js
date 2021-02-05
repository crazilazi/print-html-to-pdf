const path = require('path');
module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.join(__dirname, 'app/print-html-to-pdf.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: process.env.NODE_ENV === 'production' ? 'print-html-to-pdf.min.js' : 'print-html-to-pdf.js',
    library: {
      root: 'printHtmlToPDF',
      amd: 'printHtmlToPDF',
      commonjs: 'printHtmlToPDF'
    },
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ]
  },
  externals: {
    jspdf: 'jspdf',
    'dom-to-image': 'dom-to-image'
  },
}
