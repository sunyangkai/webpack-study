const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 打包后css js文件自动引入到html中



const resolve = (dir) => {
    const parentDir = path.resolve(__dirname, '..'); // 获取上一级目录
    const dirPath = path.join(parentDir, dir); // 进入dir目录
    return dirPath;
}
  
module.exports = {
    entry: {
      app: resolve('src/index.js'), // 入口文件
    },
    output: {
      path: resolve('/dist'), //打包后的文件存放的地方
      chunkFilename: '[name].[contenthash:8].js', // 非入口（non-entry）chunk 文件的
      filename: '[name].[contenthash:8].js', // 入口 chunk 文件的名称
      /*
          hash：当任何一个文件发生变化时，整个项目的构建哈希值都会改变。这意味着如果你修改了任何一个文件，所有生成的输出文件的哈希都会更新。
          chunkhash：文件的哈希值仅受其所在的 chunk 影响。如果一个文件所在的 chunk 没有发生变化，那么该文件的哈希值也不会改变。这有助于在某些情况下实现浏览器缓存的优化，因为只有受影响的文件和它们所在的 chunk 需要重新加载。
          contenthash：每个文件都有自己的单独哈希值，文件的改动仅会影响自身的哈希值。这是最细粒度的哈希控制方式，适用于每个文件的版本控制，可用于浏览器缓存优化。


          chunk: Chunk 是 Webpack 中的一个概念，表示在模块化编译中生成的一个或多个 JavaScript 文件的集合.
                 Webpack的目标是将你的应用程序和其依赖项分割成不同的块（chunks），以便更好地进行资源管理和代码拆分
          文件：文件是物理上存在于文件系统中的资源，通常表示为输出目录中的一个文件

      */


      // publicPath: '/assets/',  
      // 它定义了在构建过程中生成的资源文件（例如 JavaScript 文件、CSS 文件、图片等）在浏览器中加载时的路径。
      // 当你部署应用到一个 Web 服务器或 CDN 上时，你可以根据实际部署环境来更改
      // 根据实际部署环境调整资源文件的引用路径，确保你的应用在不同环境中都能够正常工作。 如果你没有显式地配置 publicPath，Webpack 会根据你的文件结构和输出路径来自动生成一个合适的值
    },
    resolve: {
      // 优化
      extensions: ['.ts', '.tsx', '.js', '.jsx'], // 引入模块时不带扩展名
      alias: {
        // "react": resolve("src/react/packages/react"),
        // "react-server": resolve("src/react/packages/react-server"),
        // "react-dom": resolve("src/react/packages/react-dom"),
        // "shared": resolve("src/react/packages/shared"),
        // "react-reconciler": resolve("src/react/packages/react-reconciler"),
        src: resolve('src'),
        public: resolve('src/public'),
        pages: resolve('src/pages'),
        utils: resolve('src/utils')
  
      },
      modules: [resolve('src'), 'node_modules'], // webpack 优先 src 目录下查找需要解析的文件，会大大节省查找时间
    },
    externals: { 
      // externals 告诉Webpack哪些模块应该被视为外部依赖，而不会被打包到最终的输出文件中。 外部依赖通常是一些库或框架，可以在构建过程中排除它们，以减小输出文件的大小
      // value值应该是第三方依赖编译打包后生成的js文件，然后js文件执行后赋值给window的全局变量名称。
      // 怎么找全局变量 ？ js文件就是要用CDN引入的js文件。那么可以通过浏览器打开CDN链接。由于代码是压缩过，找个在线js格式化把代码处理一下，就可以阅读代码了
      jquery: '$', // 如果不配置编译打包阶段就会报错，除非通过npm安装了对应的包
    },
    resolveLoader: {
      // alias: {
      //   'babel-loader': path.resolve(__dirname,'../loaders/babel-loader.js')
      // },
      modules: ['node_modules', './webpack/loaders'],   // 先去 node_modules 项目下寻找 loader，如果找不到，会再去 ./webpack/loaders 目录下寻找。
    },
    module: {
      // 不需要解析依赖的第三方大型类库等 忽略的模块文件中不会解析 import、require 等语法
      noParse: [/jquery.min.js/, /system.min.js/,], // 告诉Webpack哪些模块文件不需要解析。通常，这用于排除大型库或不需要解析的模块，以提高构建性能。
        // 告诉Webpack跳过解析某些模块，但它们仍然会包含在输出文件中。
      rules: [
        {
          oneOf: [ // oneOf 中包含一组规则，每个规则都会逐一尝试匹配模块文件，一旦找到匹配的规则，Webpack 将使用该规则处理模块，然后不再继续检查后续规则
            {
              test: /\.html$/,
              use: 'html-loader',
              /*
                用 import 或 require 语句在 JavaScript 代码中导入 HTML 文件，这样可以将 HTML 内容视为字符串或模板字符串.
                应用场景：后端返回了一个html模版，或者远程的隐私政策html文件
              */
            },
            {
              test: /\.js$/,
              exclude: /(node_modules)/,
              // include: (resource) => { 白名单，某些包的作者并没有编译源码，需要自己处理，手动指定编译
              //   return [
              //       path.resolve(__dirname, '../node_modules/@floating-ui'),
              //       path.resolve(__dirname, '../node_modules/react-sortablejs'),
              //   ].some(key => resource.indexOf(key) === 0);
              // },
              use: [
                // {
                //   loader: 'thread-loader', // 开启多进程打包
                //   options: {
                //     worker: 3,
                //   },
                // },
                //  {
                //   loader: 'test-loader',
                // },
                {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                      require.resolve('@babel/plugin-transform-flow-strip-types')
                    ],
                    // cacheDirectory: true, // 启用缓存
                  },
                 
                  
                  /*
                    babel-loader 使用 Babel 加载 ES2015+ 代码并将其转换为 ES5
                    @babel/core Babel 编译的核心包
                    @babel/preset-env Babel 编译的预设，可以理解为 Babel 插件的超集
                      这个预设包含一下插件：
                        @babel/plugin-syntax-jsx
                        @babel/plugin-transform-react-jsx
                        @babel/plugin-transform-react-display-name
                    常见 Babel 预设还有：
                        @babel/preset-flow
                        @babel/preset-react  处理React应用中的JavaScript代码。它的主要作用是使Babel能够理解和转译JSX
                        @babel/preset-typescript
    
                    当启用 development 配置时，自动运行时（自 v7.9.0 起）会自动添加这些插件的功能。
                    npm install babel-loader @babel/core @babel/preset-env -D
                  */
                },

              ],
            },
            {
              test: /\.jsx$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader', // 也可以配置绝对路径 loader: path.resolve(__dirname,'../loaders/babel-loader.js')
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: [
                    require.resolve('@babel/plugin-transform-flow-strip-types')
                  ],
                  // 其他配置...
                }
              }
            },
            {
              test: /\.tsx?$/,
              exclude: /(node_modules)/,
              use: [
                // {
                //   loader: 'cache-loader', 
                // },
                {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                      require.resolve('@babel/plugin-transform-flow-strip-types')
                    ],
                    // cacheDirectory: true, // 启用缓存
                  },
                },
                {
                  loader: 'ts-loader',
                  options: {
                    happyPackMode: true, // 必须开启 否则 tread-loader会报错
                  },
                },
              ],
            },
            {
              test: /\.less$/i,
              exclude: /(node_modules)/,
              use: [
                // {
                //   loader: 'cache-loader', 
                //   /* 
                //     获取前面 loader 转换的结果
                //     放在loader链中的最后，以确保它缓存整个loader链的输出
                //    */
                // },
                {
                  loader: 'style-loader', 
                  /*
                    将CSS样式从外部CSS文件，通过<style>标签添加到HTML文档中
                    style-loader能够处理样式的依赖关系，确保样式文件在正确的顺序中加载
                  */
                },
                {
                  // 打包css
                  loader: 'css-loader',
                  /*
                    用于处理CSS文件，解析CSS模块，并处理模块间的依赖关系
                  */
                },
                {
                  loader: 'postcss-loader', // 安装 npm install postcss postcss-loader postcss-preset-env -D
                  /* 
                    添加浏览器前缀，自动根据指定的浏览器兼容性规则，为CSS属性添加所需的浏览器前缀，以确保样式在各种浏览器中正确显示
                    安装 pnpm install postcss postcss-loader postcss-preset-env --save-dev
                  */
                },
                {
                  loader: 'less-loader',
                  /* 
                    Less文件转换为CSS
                  */
                },
                
              ],
            },
            {
              test: /\.(jpe?g|png|gif)$/,
              exclude: /(node_modules)/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 8192, // 小于8K的图片自动转成base64，并且不会存在实体图片
                    name: '[name][hash:8].[ext]',
                    outputPath: 'images/',  // 图片打包后存放的目录
                  },
                  /*
                      url-loader 封装了 file-loader。
                      webpack 最终会将各个模块打包成一个文件，因此我们样式中的 url 路径是相对入口 html 页面的，而不是相对于原始 css 文件所在的路径。这就会导致图片引入失败。
                      file-loader将它们复制到输出目录，并返回文件的URL,使得你可以在HTML或CSS中引用这些图像文件
                      图片较多，会发很多 http 请求，会降低页面性能
                      file-loader 可以指定要复制和放置资源文件的位置，以及如何使用版本哈希命名以获得更好的缓存。
                      url-loader 会将引入的图片编码，生成 dataURl。相当于把图片数据翻译成一串字符。再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了
                      如果图片较大，编码会消耗性能。因此 url-loader 提供了一个 limit 参数，小于 limit 字节的文件会被转为 DataURl，大于 limit 的还会使用 file-loader 进行 copy。
                  */
                },
              ],
            },
          ]
        },
        // {
        //   enforce: 'pre', // pre normal post   指定 提前 正常 延后执行。  但是我个人更推荐严格配置loader的顺序，更直观地展示loader的顺序
        //   // 这里修复了弃用 babel 后, antd 不会自动引入样式的问题
        //   test: /antd-mobile-v2[\/\\]es[\/\\][\w, -]+[\/\\]index.js$/,
        //   exclude: [/antd-mobile-v2[\/\\]es[\/\\]style/, /antd-mobile-v2[\/\\].*style.*/],
        //   use: [{
        //       loader: path.resolve(__dirname, './loaders/fix-esbuild-antd-style.js'),
        //   }]
        // },
      ],
    },
    plugins: [
        new webpack.DefinePlugin({
          '__EXPERIMENTAL__': JSON.stringify(true), // 或者 false，取决于你的需求
          '__PROFILE__': JSON.stringify(true),
          '__DEV__': JSON.stringify(false),

        }),
        new HtmlWebpackPlugin({
          template: './src/index.html', // html模版路径
          inject: 'body', // head | body 插入到html文档中的位置
          hash: true, // 如果为真，则向所有包含的 js 和 CSS 文件附加一个惟一的 webpack 编译散列。这对于更新每次的缓存文件名称非常有用
          minify:  process.env.NODE_ENV === "development" ? false : {
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true, //折叠空白区域 也就是压缩代码
            removeAttributeQuotes: true, //去除属性引用
          }, // 设置静态资源的压缩情况
          chunks: ['app'],
          // favicon: string, 网页图标路径
          // mete: Object , 为生成的 html 文件注入一些 mete 信息， 例如： {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}
          filename: 'index.html'
        })
      ]
  }



  /*
  
  1.loader 和 plugin 的对比？
    Loader本质上是一个函数，负责代码的转译，即对接收到的内容进行转换后将转换后的结果返回。 配置Loader通过在 modules.rules中以数组的形式配置
    Plugin本质上是一个带有apply(compiler)的函数。监听webpack构建/打包过程中发布的hooks来通过自定义的逻辑和功能来改变输出结果。 Plugin通过plugins 以数组的形式配置。

  


  2.如何编写loader？

      loader特性：
        1.loader支持链式调用，上一个loader的执行结果会作为下一个loader的入参。
        我们知道我们的loader想要有返回值，并且这个返回值必须是标准的JavaScript字符串或者AST代码结构，这样才能保证下一个loader的正常调用
        2.
  



  3.babel 原理

      babel把代码转译为想要的目标代码。
      解析：根据代码生产AST结构。
      转换：遍历AST节点，生成新的AST节点
      生成：根据新的AST树生成代码





  4. 什么是AST？
    源代码的抽象语法结构的树状表示。它是编程语言的代码在计算机中的一种抽象表示方式，用于更轻松地分析、转换和操作代码。AST 是编译器、解释器和静态代码分析工具的重要组成部分，用于理解代码的结构和语义
  
  */