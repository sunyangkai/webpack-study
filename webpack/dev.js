

const path = require('path')
const glob = require('glob') // 文件匹配模式
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin') // 打包后css js文件自动引入到html中
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 每次打包的时候，打包目录都会遗留上次打包的文件 自动清空打包目录
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 通过 CSS 文件的形式引入到页面上
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin') // 构建费时分析 配置好之后，运行打包命令的时候就可以看到每个loader 和插件执行耗时  注意mini-css-extract-plugin要降级为1.3.6
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const TerserPlugin = require('terser-webpack-plugin') // 压缩js
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin') // 清除不用的css

const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 可以直观的看到打包结果中，文件的体积大小、各模块依赖关系、文件是够重复等问题，极大的方便我们在进行项目优化的时候，进行问题诊断
const speedMeasurePlugin = new SpeedMeasurePlugin({
  disable: false, // 默认值：false，表示该插件是否禁用
  outputFormat: 'human', // 默认值：human，表示为格式打印其测量值，可选human/json/humanVerbose,或者是Function
  outputTarget: console.log, // 默认值：console.log，表示输出到的文件的路径或者是调用输出
  // pluginNames:{             // 重新定义某个插件的名称
  //   myFavicons:faviconsWebpackPlugin
  // }
})

const { merge } = require('webpack-merge');

const baseWebpackConfig = require('./base');

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: '[name].js',
        filename: '[name].js',
        publicPath: '/',
    },
    devtool: 'eval-cheap-module-source-map',
    module: {
        rules: [
            // {
            //     loader: 'my-loader',
            //     options: {
            //       flag: true,
            //     },
            // },
        ]
    },
    plugins: [
       
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, './src'), 
            // webpack 在进行打包的时候，对静态文件的处理，例如图片，都是直接 copy 到 dist 目录下面。但是对于本地开发来说，这个过程太费时，也没有必要，
            // 所以在设置 contentBase 之后，就直接到对应的静态目录下面去读取文件，而不需对文件做任何移动，节省了时间和性能开销
        },
        port: 8000,
        open: ['/main/react?param=12'], //  dev-server 在服务器已经启动后打开浏览器。设置其为 true 以打开你的默认浏览器. 可在浏览器中打开多个指定页面：
        hot: true,
        allowedHosts: ['devwebstudy.com', '127.0.0.1', 'localhost'], 
        // 这个选项的作用主要是增强开发服务器的安全性。当你正在开发一个网站时，通常不希望所有主机都能访问你的开发服务器，因为这可能导致安全风险
        // macos vim /etc/hosts 修改hosts文件
        historyApiFallback: {
            /*
                SPA 通常使用前端路由来管理页面的导航，这意味着在浏览器中地址栏中输入 URL 或点击前进和后退按钮时，不会触发完整的页面刷新，而是通过 JavaScript 来更新视图
                当你刷新页面或直接输入一个路由 URL 时，如果没有合适的服务器配置，会导致 404 错误
                它告诉 webpack-dev-server 在服务器接收到无法处理的请求时，将请求重定向到指定的 HTML 文件。
                通常，这个 HTML 文件是你的单页应用的入口文件，它负责初始化前端路由并渲染正确的页面

                生产上ngix这样配置：
                server {
                    listen       80;
                    server_name  example.com;
                    location /main/ {
                        root   /path/to/your/react/app;
                        try_files $uri $uri/ /main/index.html;  示 Nginx 会尝试提供请求的文件或目录，如果不存在，则回退到 /main/index.html
                    }
                }

            */
            rewrites: [
                { from: /^\/main\//, to: '/index.html'  }, // 仅在浏览器向服务器发送请求时发挥作用，通常是在用户首次访问应用或刷新页面时。服务端的重写规则是为了处理直接访问或刷新应用时的情况
                { from: /^\/subpage/, to: '/subpage.html' },
            ],
        },
        headers: { 
            /*
                为所有响应添加 headers , 支持数组    headers: [{ key: 'X-Custom', value: 'foo' }, { key: 'Y-Custom', value: 'bar'}],
            */
            'Access-Control-Allow-Origin': '*',
        },
        proxy: [
            {
              context: ['/auth', '/api'], // 特定路径代理到同一目标
              target: 'http://localhost:3000',
              pathRewrite: { '^/api': '' },
              changeOrigin: true, //  它通常用于处理跨域请求。当设置为 true 时，它会更改请求头中的 Origin 字段，将其指向目标服务器，以模拟同源请求。
            },
        ],
    },
});


