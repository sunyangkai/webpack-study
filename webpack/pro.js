

const path = require('path')
const glob = require('glob') // 文件匹配模式
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 每次打包的时候，打包目录都会遗留上次打包的文件 自动清空打包目录
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 通过 CSS 文件的形式引入到页面上
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); //  // 压缩css

const TerserPlugin = require('terser-webpack-plugin') // 压缩js
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin') // 清除不用的css

const ZipOutputPlugin = require('./plugins/zip-plugin');

const resolve = require('./util').resolve;
const { merge } = require('webpack-merge');

const baseWebpackConfig = require('./base');

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: '[name].[contenthash:8].js', // 非入口（non-entry）chunk 文件的
        filename: '[name].[contenthash:8].js', // 入口 chunk 文件的名称
        publicPath: '/',
    },
    devtool: 'hidden-source-map',
    optimization: { // 配置用于配置代码优化相关的选项，以提高构建输出的性能和质量
        minimize: process.env.NODE_ENV === 'production', // 启用代码压缩
        usedExports: true, // 标记哪些导出被用到，以便更好地进行未使用代码的剔除 Tree Shaking
        minimizer: [ // 指定自定义压缩器
          new CssMinimizerPlugin(),  // 添加 css 压缩配置
          new TerserPlugin({}),   // 添加 js 压缩配置
        ],
        // splitChunks: {
        //   minSize: 30, // byte //提取出的chunk的最小大小
        //   cacheGroups: {
        //     default: {
        //       filename: 'common_[id]_[name].js',
        //       chunks: 'all', // all 代表所有模块，async代表只管异步加载的, initial代表初始化时就能获取的模块
        //       // 单入口模式下
        //       minChunks: 2, //模块被引用2次以上的才抽离
        //       // 1. minChunks设置为n
        //       // 2. 假设有m个入口点，这m个入口点都直接引入了某个模块module（通过import或require直接或间接地引入了模块），也就是共享次数为m
        //       // 3. 当m至少等于n时，module才会被单独拆分成一个bundle
        //       priority: -20,
        //     },
        //     vendors: {
        //       //拆分第三方库（通过npm|yarn安装的库）
        //       test: /[\\/]node_modules[\\/]/,
        //       filename: '[id]_[hash:6]_vendor.js',
        //       chunks: 'initial',
        //       priority: -10,
        //     },
        //     locallib: {
        //       //拆分指定文件
        //       test: /(src\/common\/mine\.tsx)$/,
        //       filename: 'local_mine_[id].js',
        //       chunks: 'initial',
        //       priority: -9,
        //     },
        //   },
        // },
      },
      /*
        使用 splitChunks 的好处包括：
        缓存优化：通过将第三方库代码和业务逻辑代码分离，可以利用浏览器缓存机制。因为第三方库（如 React, Vue, Lodash 等）相对于你的业务代码来说不经常改变，所以用户不需要在每次应用更新时重新下载这些库。
        并行加载：浏览器可以并行下载多个较小的文件，这通常比下载单个巨大的文件更快。
        加载时间：用户初次访问页面时，可以仅加载必须的代码，其余的代码可以按需加载，这样可以减少首屏加载时间。


        如果你的项目配置了如代码分割（code splitting）来异步加载某些模块（例如使用 import() 语法），且没有合适的 splitChunks 配置，那么 a.js、b.js、c.js 
        这些模块可能会被包含在生成的多个异步 chunks 中，从而导致它们在多个不同的 chunks 里被重复打包。
        果你不使用 splitChunks 并且应用中存在异步加载的代码，那么确实存在代码重复打包的风险。
      
      */
    plugins: [
        new CleanWebpackPlugin(),
        // hash ：任何一个文件改动，整个项目的构建 hash 值都会改变；
        // chunkhash：文件的改动只会影响其所在 chunk 的 hash 值；
        // contenthash：每个文件都有单独的 hash 值，文件的改动只会影响自身的 hash 值；
        new MiniCssExtractPlugin({
          // 添加插件
          filename: '[name].[hash:8].css',
        }),
        new PurgeCSSPlugin({
          paths: glob.sync(`${resolve('src').src}/**/*`, { nodir: true }),
        }),
        new ZipOutputPlugin({
          // 配置选项
          zipFileName: 'app.zip'
        }),
    ],
});


