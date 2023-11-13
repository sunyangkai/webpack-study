const loaderUtils = require('loader-utils')


module.exports = function (source) {
    this.cacheable && this.cacheable(); // 开启缓存
    //  this.cacheable(false); // 关闭缓存
    // 获取到用户给当前 Loader 传入的 options
    const options = loaderUtils.getOptions(this)
    // 在这里按照你的需求处理 source
    return source.replace('this-is-javascript', 'this-is-typecript');


    // // 告诉 Webpack 本次转换是异步的，Loader 会在 callback 中回调结果
    // var callback = this.async()
    // someAsyncOperation(source, function (err, result, sourceMaps, ast) {
    //     // 通过 callback 返回异步执行后的结果
    //     callback(err, result, sourceMaps, ast)
    // })

}

module.exports.pitch = function (remainingRequest, precedingRequest, data) {
    // console.log('remainingRequest:' + remainingRequest)
    // console.log('precedingRequest:' + precedingRequest)
    // console.log('data' + data)
    // console.log('pitch in loader4')
   };



/*
   loader是什么？
        webpack中通过compilation对象进行模块编译时，会首先进行匹配loader处理文件得到结果(string/buffer),之后才会输出给webpack进行编译
        loader就是一个函数，通过它我们可以在webpack处理我们的特定资源(文件)之前进行提前处理。
        比方说，webpack仅仅只能识别javascript模块，而我们在使用TypeScript编写代码时可以提前通过babel-loader将.ts后缀文件提前编译称为JavaScript代码，之后再交给Webapack处理

   4种类型loader：
        pre loader、normal loader、inline loader、post loader四种类型
        行内loader长这个样子import Styles from 'style-loader!css-loader?modules!./styles.css'; 用！分割
        行内loader还可以加前缀 ！ !! 等禁用掉已配置的其它loader，比如让所有的pre normal post loader全部不执行。
        正因如此，enforce配置的选项在这里是有意义的，并不能完全用配置顺序来取代。试想某个内联loader禁用了normal loader，你配置顺序里怎么写都没用了，只能加enforce配置


   loader执行过程：
        Pitching 过程，loaders的pitching过程从前到后（loader1 -> 2 -> 3）
        Normal 过程, loaders的normal过程从后到前（loader3 -> 2 -> 1）

        一个loader的pitch函数如果有返回值，它将跳过后面的步骤，立即转入到它上一个loader的normal阶段执行
    
*/
/*

    loader的主要职责就是将代码转译为webpack可以理解的js代码。
    通过return / this.callback来返回转换后的结果

    loader支持链式调用，上一个loader的执行结果会作为下一个loader的入参。

    单个loader一般只负责单一的功能

    loader-utils 是一个非常重要的 Loader 开发辅助工具。为开发中提供了诸如读取配置、requestString的序列化和反序列化、getOptions/getCurrentRequest/parseQuery等核心接口

    webpack默认缓存loader的执行结果。 this.cacheable(false)声明不做缓存





    

*/

/*
   为什么需要pitch函数
    果我们将style-loader设计为normal loader的话，我们需要执行上一个loader返回的js脚本，并且获得它导出的内容才可以得到对应的样式内容
    function styleLoader(source) {
        console.log(source, 'source'); //   style-loader的上一个loader是css-loader，它的nomarl loader执行完毕后返回了一个js脚本字符串，而不是css代码字符串。
        const script = `
            const styleEl = document.createElement('style')
            styleEl.innerHTML = ${JSON.stringify(source)}
            document.head.appendChild(styleEl)
        `;
        return script;
    }


    // 在style-loader的pitch阶段直接返回js脚本
    styleLoader.pitch = function (remainingRequest, previousRequest, data) {
        const script = `
        import style from "!!${remainingRequest}" // remainingRequest还未处理的loader，通过！连接。 未执行的loaders转化为inline的形式重新加载
          // 这里的remainingRequest代表的路径将会被编译为module

            const styleEl = document.createElement('style')
            styleEl.innerHTML = style
            document.head.appendChild(styleEl)
        `;
        return script;
    };

    编译过程：
        当读取到const styles = require('./index.css'); 这句代码时， style-loader pitch 处理./index.css 并且返回一个脚本
        webpack会将返回的js脚本编译称为一个module，同时分析这个module中的依赖语句进行递归编译
        由于style-loader pitch阶段返回的脚本中存在import语句，那么此时webpack就会递归编译import语句的路径模块
        在编译完成就会通过import style from "!!${remainingRequest}"，在style-loader pitch返回的脚本阶段获得css-loader返回的js脚本并执行它，获取到它的导出内容

    应用场景：
    通过pitch loader中import someThing from !!${remainingRequest}剩余loader,
    从而实现上一个loader的返回值是js脚本，将脚本交给webpack去编译执行，这就是pitch loader的实际应用场景。
    你的自定义loader上一个loader的normal函数返回的并不是处理后的资源文件内容而是一段js脚本，那么将你的loader逻辑设计在pitch阶段无疑是一种更好的方式


*/

// 更多关于loader的介绍https://juejin.cn/post/7058652098174386213#heading-0
// 实现自己的babel-loader https://juejin.cn/post/6909470845442195470?from=search-suggest#heading-24