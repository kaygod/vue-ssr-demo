const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 可以生成其他文件的插件
const { VueLoaderPlugin } = require('vue-loader'); //vue编译时候需要的插件

module.exports = env => {

  return {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    extensions: ['.js', '.json', '.vue', '.scss', '.css'],
  },
  module: {
    rules: [
      //所有的js文件会在webpack中过一遍,通过babel-loader转入到babel中进行编译,翻译成正常的js后打包到bundle.js
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  chrome: '67',
                },
                useBuiltIns: 'usage',
              },
            ],
          ],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
      {
        test: /\.vue$/, //碰见.vue文件使用 vue-loader加载器
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: env === "Prod"?ExtractTextPlugin.extract({ //生产环境下把css样式抽离出来
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }):[
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin(), new webpack.HotModuleReplacementPlugin(),new ExtractTextPlugin({filename: 'css/[name].[hash:5].css', allChunks: true})
],
};

}
