var path =require('path');

var webpack = require('webpack')
var ExtractTextPlugin=require('extract-text-webpack-plugin')
var HtmlWebpacPlugin =require('html-webpack-plugin')
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.join(__dirname,"dist"),
    //publicPath: "js/common/",
    filename :"js/[chunkhash:8].[name].entry.js",
    chunkFilename:"js/[name].[chunkhash:8].js"
  },
  module: {
    loaders: [
      { test: /\.styl$/, loader: "style!css!stylus" },
      { test: /\.html$/, loader: "html" },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
      { test: /\.(css)$/, loader: ExtractTextPlugin.extract('css')}
    ]
  },
  // 服务器配置相关，自动刷新!
  devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        grogress: true,
  },
  plugins:[
      new webpack.optimize.CommonsChunkPlugin({
          name:['common'], //将公共模块提取
          minChunks:Infinity // 提取所有entry共同依赖的模块
      }),
      new ExtractTextPlugin('"css/[name].css?[chunkhash:9]"',{
          disable:false,
          allChunks:true
      }),
      new HtmlWebpacPlugin({
        filename:'./index.html',
        template: __dirname+'/src/tmpl/template1.html',
        inject: true, //允许插件修改那些内容,包括head与body
        hash:false, //为静态资源生成hash值
      })
  ]
}
