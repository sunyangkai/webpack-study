import './index.less';
import './index2.less';

import { useEffect } from 'react';

// import $ from 'jquery';
// import girlImg from './imgs/girl.png';
// import whileImg from './imgs/while.png';

import Lificylce from './components/life-cycle';
import Father from './components/father-child';

import { useTypedSelector, useDispatch } from 'src/reducer';
import { reactHomeActions } from './reducer'



export const ReactHome = (props) => {
    const dispatch = useDispatch();
    const goHooks = () => {
        props.history.push('/hooks', { word: 'hello' })
    }
    const testSage = () => {
        dispatch(reactHomeActions.fetchRequest());
    }
    const value = useTypedSelector(state => state.react.value);

    return (
        <div className='react-app'>
            <div onClick={goHooks}>路由跳转{value}</div>
            <div onClick={testSage}>saga测试</div>
            <Father />
            {/* <img className='girl' src={girlImg} alt="girl Image" />
            <img className='while' src={whileImg} alt="whileImg Image" /> */}
        </div>
    )
}






/*  */



/*
    react是什么？对react的理解和看法？
    答：react是一个UI框架。
    历史演变：
        jquery：2009年以前。 封装了ajax，dom操作等。本质上是一个工具函数集。没解决代码如何组织的问题，尤其是组件复用的问题。这段时间网页比较简单，还能满足需求。
        angularjs：2009年ng出现。 提供全家桶方案。路由，双向绑定，指令，组件，表单等等框架特性。MVC。庞大复杂，学习概念多。
                    双向绑定在中后台数据展示多的页面，很适用。

        react：组件化、数据驱动视图、虚拟dom
            view = fn（props， state, context) 。
            虚拟dom，跨平台支持。存在reactNative支持ios和安卓。
            核心思路：声明式，组件化，通用性。  命令式典型的jquery
        
    
    JSX：  是js的语法扩展集。
           它不是模版语法，避免引入过多新的概念，要贴合原生的写法。对比angularjs的众多概念降低了使用成本。
           它是声明式的语法，直观易懂。对比命令式的语法jquery

        为什么要在文件顶部import React from “react”？
            只要使用了jsx，就需要引用react，因为jsx本质就是React.createElement
            从 React 17 开始，不再需要显式引入 react 包
            这样做可以减少打包体积
                // 以前会把jsx语法转为React.createElement
                import React from 'react'; // 以前编译后，需要引入整个react包。就为了运行 React.createElement。
                function App() {
                    return React.createElement('h1', null, 'Hello world');
                }
            JSX runtime 对于 React.createElement 还有一定的性能优化和简化

    为什么React自定义组件首字母要大写？
     为了区别自定义组件和html标签。 React.createElement("app",null,"lyllovelemon") 
     如果组件首字母为小写，它会被当成字符串进行传递，在创建虚拟DOM的时候，就会把它当成一个html标签，而html没有app这个标签，就会报错。
     组件首字母为大写，它会当成一个变量进行传递，React知道它是个自定义组件
    

    React组件为什么不能返回多个元素？只能有一个根元素？
        jsx组件最后会被编译为render函数，只能返回一个值React.createElement('div)
        class App extends React.Component{
            render(){
                return React.createElement('div',null,[
                    React.createElement('h1',{className:'title'},'lyllovelemon'),
                    React.createElement('span'),null,'内容'
                ])
            }
        }
        同时，虚拟DOM是一个树状结构，树的根节点只能是1个，如果有多个根节点，无法确认是在哪棵树上进行更新

        可以使用React.Fragment或者</>😊包裹多个组件来返回

    
    react中元素和组件的区别。
        元素：
            素是构建React应用的最小单元。
            React.createElement创造的一个单独的轻量的对象。
            元素通常表示要在DOM中呈现的内容，如<div>, <span>, <h1>
        组件：
            React组件是可以封装成复用UI的独立模块
            组件是由类组件或函数组件构成的，它们可以包含状态、生命周期方法和渲染方法
            组件通常由一个或多个元素构成，并可以包含一些业务逻辑和状态管理
    
                
    

    
    React Fiber：
        React Fiber 是 React 库中的一种架构，用于改进和优化React的渲染性能和调度。
        采用了一种可中断、优先级调度的方式，以将渲染工作分散到多个浏览器帧中。这样做有利于更平滑的响应




*/