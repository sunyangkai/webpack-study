
import * as React from 'react'




class Child extends React.Component {
    state = {
        name: 'Alice'
    }

    resetName = () => {
        console.log('reset child')
        this.setState({ name: 'Amelia' })
    }

    // 初始化不执行，更新执行
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps)
    }

    render() {
        return (
            <div onClick={this.resetName}>{this.state.name}</div>
        )
    }
}

class Father extends React.Component {
    state = {
        name: 'Bob'
    }
    resetName = () => {
        console.log('reset father')
        this.setState({ name: 'Allen' })
    }
    render() {
        return (
            <div>
                <div onClick={this.resetName}>{this.state.name}</div>
                <Child />
            </div>
        )
    }
}

export default Father;