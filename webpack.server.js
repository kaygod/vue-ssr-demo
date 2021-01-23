const path = require('path');
const nodeExternals = require('webpack-node-externals'); //避免将一些node包打包到bundle中
const { VueLoaderPlugin } = require('vue-loader'); //vue编译时候需要的插件


module.exports = env => {

  return {
    target: 'node',
    mode: 'development',
    entry: './src/index.js',
    devtool: 'eval-source-map',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
      libraryTarget: 'commonjs2',
    },
    resolve: {
      extensions: ['.js', '.json', '.vue', '.scss', '.css'],
    },
    externals: [
      nodeExternals({
        allowlist: /\.css$/,
      }),
    ],
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
          use: ['vue-style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: ['vue-style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin()
    ],
  };  

}