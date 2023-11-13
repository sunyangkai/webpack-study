// import { createRoot } from 'react-dom/client';
import * as React from "react";
import * as ReactDOM from "react-dom";



const MOUNT_NODE = document.getElementById('wrap');

class Electro extends React.Component {
    state = {
        type: '雷元素',
        character: '雷厉风行，冷酷',
    }
    switchType = () => {
        this.setState({ type: "水元素",character: '飘逸灵动，敏捷' })
        this.setState({ type: "火元素",character: '热情奔放，力量' })
    }
    componentDidUpdate() {

    }
    render() {
        return (
            <div key="e0">
                <span key="e1">{this.state.type}</span>
                <button key="e2" onClick={this.switchType}>切换属性</button>
                <RandomMei key="RandomMei" type={this.state.type} character={this.state.character} />
            </div>
        )
    }
}

class RandomMei extends React.Component {
    state = {
        name: '雷电将军-g',
        age: 22,
        wepeaon: '长枪'
    }
    render() {
        return (
            <div key={"c0"} style={{ marginTop: '20px' }}>
                <div key="c1"> 姓名：{this.state.name}</div>
                <div key="c2"> 年龄{this.state.age}</div>
                <div key="c3"> 武器：{this.state.wepeaon},{this.props.type}</div>
                <div key="c4"> 性格: {this.props.character}</div>
            </div>
        )
    }
}


const render = () => {
    // const root = createRoot(MOUNT_NODE);
    ReactDOM.render(
    <div key="t1">
        <span key="t2">这是稻妻角色</span>
        <Electro key="Electro" />
    </div>, MOUNT_NODE)

}


export default render;