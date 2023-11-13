


/*

    常用plugin：
        1.html-webpack-plugin：打包后css js文件自动引入到html中， 多入口打包也用到这个插件

        2.mini-css-extract-plugin： 通过 CSS 文件的形式引入到页面上
                                1.将CSS文件分离并以外部文件的形式加载，有助于并行加载，提高网页性能。
                                这可以减少页面加载时间，因为浏览器可以同时下载CSS和JavaScript文件，而不必等待JavaScript执行完毕后再加载CSS
                                2.独立的CSS文件通常可以更有效地利用浏览器缓存，因为CSS文件的内容通常不会频繁更改

        3.clean-webpack-plugin：每次打包的时候，打包目录都会遗留上次打包的文件 自动清空打包目录。
                               特别是在自动化部署流程中，以确保输出目录始终处于一种一致和干净的状态。这有助于避免构建问题和不必要的文件残留


        4.speed-measure-webpack-plugin 是一个用于测量和分析Webpack构建性能的插件。它的主要作用是提供有关Webpack构建的详细性能数据，
                                     测量每个Webpack阶段的耗时，包括模块解析、加载、编译、压缩等
                                     帮助开发人员了解构建的耗时和资源使用情况，以便优化构建过程

        5.css-minimizer-webpack-plugin 是一个用于优化和压缩CSS资源的Webpack插件。它通常在生产构建中使用，用于最小化CSS文件的大小，提高网页加载性能，以及优化CSS代码的压缩和混淆

        6.terser-webpack-plugin 压缩js

        7.purgecss-webpack-plugin 去除未使用的CSS代码

        8.webpack-bundle-analyzer  可以直观的看到打包结果中，文件的体积大小、各模块依赖关系、文件是够重复等问题，极大的方便我们在进行项目优化的时候，进行问题诊断

        9.DefinePlugin: 用于在编译时定义全局常量，以便在代码中访问，例如，配置环境变量
                        new DefinePlugin({
                                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                                'MY_API_KEY': JSON.stringify('your-api-key-value'),
                                'IS_PRODUCTION': JSON.stringify(isProduction),
                        }),

                                     
        
    

    本地和生产环境配置的差异：
    本地环境：

    需要更快的构建速度
    需要打印 debug 信息
    需要 live reload 或 hot reload 功能
    需要 sourcemap 方便定位问题
    ...

    生产环境：

    需要更小的包体积，代码压缩+tree-shaking
    需要进行代码分割
    需要压缩图片体积
    路径处理方法


*/