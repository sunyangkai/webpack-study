import * as React from 'react'



class Lificylce extends React.Component {
    constructor(props) { // 不再推荐使用
        super(props);
        console.log('ss')

        // this.setState 禁止调用，因为render还未执行，dom节点都没挂载
        // constructor 中并不推荐去处理初始化以外的逻辑
        // constructor 本身并不是属于React的生命周期，它只是Class的一个初始化函数
        // 通过移除constructor， 代码会变的更加的简洁
    }
    state = {
        count: 0,
     }
  
     handleClick = () => {
       // do some thing
     }

    // 废弃  组件更新前调用
    // React的新的异步渲染机制下，该方法可能会被多次调用。
    // ssr中 这个方法将会被多次调用， 所以会重复触发多遍，
    // 同时在这里如果绑定事件，将无法解绑，导致内存泄漏 ， 变得不够安全高效逐步废弃
    componentWillMount() {

    }

    componentDidMount() { // dom成功插入后
        // dom 操作、数据获取
    }

    // 当props改变时更新state
    // 当 props 被传入的时候 触发
    // 当 state 发生变化时 触发
    // 当 forceUpdate 被调用 触发
    getDerivedStateFromProps(props, state) {

    }

    // 只要props被传入就会触发，而不是props改变时触发
    // 弃用理由： 外部组件多次频繁更新传入多次不同的 props，会导致不必要的异步请求
    componentWillReceiveProps(nextProps) {

    }

    // 组件更新之前 
    // 参数第一个是即将更新的 props 值，第二个是即将跟新后的 state 值
    shouldComponentUpdate(nextProps, nextState) { 
        // if (this.props.id !== nextProps.id) return false;

        // 不要深层比较或使用 JSON.stringify()，影响性能
        // 不要 调用setState，会造成死循环
        // 可以使用内置 PureComponent 组件替代
        return true;
    }

    // 处理与DOM状态有关的信息的捕获和恢复，如滚动位置的保存和恢复等。
    // return 的值会作为 componentDidUpdate(prevProps, prevState, snapshot)的第三个参数snapshot
    getSnapshotBeforeUpdate(prevProps, prevState) {
        return {} // snapshot
    }

    componentWillUpdate() {

    }

    // 即将被卸载或销毁时进行调用。
    // 取消网络请求、移除监听事件、清理 DOM 元素、清理定时器
    componentWillUnmount() {

    }

    render() { // 返回reactDom
        return (
            <div></div>
        )
    }
}


export default Lificylce;


/*
    mounting 挂载阶段：组件被创建并插入到DOM中
        constructor()：组件的构造函数，用于初始化状态和绑定事件处理函数。
        static getDerivedStateFromProps(props, state)（可选）：用于根据传入的props计算新的状态。
        --componentWillMount（16.3 废弃）
        render()：渲染组件的UI。
        componentDidMount()：组件已经被插入到DOM中，可以进行DOM操作，数据加载等异步操作。

    Updating 更新阶段： 组件已经被挂载到DOM中，但可能会根据新的props或state进行更新
        static getDerivedStateFromProps(props, state)（可选）：同挂载阶段，用于根据新的props计算新的状态。
        --componentWillReceiveProps（16.3 废弃）
        shouldComponentUpdate(nextProps, nextState)（可选）：决定组件是否需要更新，返回true表示更新，false表示不更新。
        --componentWillUpdate（16.3 废弃）
        render()：重新渲染组件的UI。
        getSnapshotBeforeUpdate(prevProps, prevState)（可选）：在实际渲染之前捕获一些DOM信息。
        componentDidUpdate(prevProps, prevState, snapshot)：组件已经更新，可以执行DOM操作、数据请求等操作。

    Unounting 卸载阶段：组件被从DOM中移除，销毁相关资源
        componentWillUnmount()：组件即将被销毁，可以进行一些清理操作，如取消订阅、清除定时器等。


*/




/*
    Fiber：
    Fiber架构的重要特征就是可以被打断的异步渲染模式
*/