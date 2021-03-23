const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  // 模式: 生产环境
  mode:'production',
  // webpack 文件入口
  entry:{
    app: path.resolve(__dirname,'src/index.js')
  },
  // 出口( 打包生成的文件的出口 )
  output:{
    filename: 'static/js/[name].bundle.js',
    path: path.resolve(__dirname,'dist')
  },
  // loader 模块加载
  module:{
    rules:[
      // 处理打包js
      {
        test: /\.js$/,
        //exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // 打包处理css
      {
        test: /\.css$/,
        //修改
        use: ['vue-style-loader', 'css-loader'], // 多个loader从右到左处理
      },
      // 处理图片
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // limit: 1000,
          // name: 'static/img/[name].[hash:7].[ext]', // 相对于output.path
          // esModule: false,
          limit: 8192, // 8kb --> 8kb以下的图片会base64处理
          outputPath: 'static/imgs/', // 决定文件本地输出路径
          publicPath: 'static/imgs/',  // 决定图片的url路径
          name: '[hash:5].[ext]', // 修改文件名称 [hash:8] hash值取8位  [ext] 文件扩展名
          esModule: false
        }
      },
      //处理 vue文件
      {
        test: /\.vue$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'vue-loader'
      },
      {
        test: /\.html$/i,
        use: {
          loader: 'html-withimg-loader',
        }
      },
    ]
  },
  // 插件
  plugins:[
    // 打包编译HTML
    new HtmlWebpackPlugin({
      template:'index.html',
      filename:'index.html'
    }),
    // 打包vue
    new VueLoaderPlugin()
  ],
  // 自动编译打包(在内存中进行编译打包, 生成内存中的打包文件)
  // 启动服务器, 运行内存中的打包文件 ===> 可以通过浏览器虚拟路径访问
  devServer: {
    open: true, // 自动打开浏览器
    quiet: true, // 不做太多日志输出
  },
  // 配置开启source-map调试
  // 作用: 可以看到你压缩有的代码发生错误是在源代码的哪一行出的错误
  devtool: 'eval-cheap-module-source-map',
  // 引入模块的解析
  resolve: {
    extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
    alias: { // 路径别名(简写方式)
      'vue$': 'vue/dist/vue.esm.js',  // 表示精准匹配
    }
  }

}