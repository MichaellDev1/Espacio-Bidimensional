const path = require('path');

module.exports = {
  entry: {
    main: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js' 
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, 
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'] 
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'] 
  }
};
