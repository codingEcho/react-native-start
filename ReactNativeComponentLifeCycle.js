import React, {Component} from 'react';
import ReactNative, {
    View,
    Text,
    AppRegistry,
    TouchableHighlight
} from 'react-native';

class LifeCycleES6 extends React.Component {
    // 1.创建阶段

    // 在创建类的时候被调用
    static defaultProps = {
        autoPlay: false,
        maxLoops: 10,
        name: 'React Native'
    }

    static propTypes = {
        autoPlay: React.PropTypes.bool.isRequired,
        maxLoops: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
    }

    // 2.实例化阶段

    /*
     state = {
     name: this.props.name,
     }*/

    constructor(props) {
        super(props);
        console.log('constructor:' + this.props.name);
        this.state = {
            name: this.props.name,
        };
    }

    componentWillMount() {
        // 在render之前调用此方法
        // 业务逻辑的处理都应该放在这里,如对state 的操作
        console.log("componentWillMount");
        console.log(this.state);
    }

    handleOptionsButtonClick(e) {
        if (this.state.name === 'Wills') {
            this.setState({name: 'React Native'});
        } else {
            this.setState({name: 'Wills'});
        }
    }

    render() {
        // 渲染并返回一个虚拟DOM
        console.log("render");
        return (
            <View><Text style={{fontWeight:"bold",margin:20}}>Hello {this.state.name}!</Text>
                <TouchableHighlight
                    onPress={e=>this.handleOptionsButtonClick(e)}>
                    <Text>点我</Text>
                </TouchableHighlight>
            </View>
        )
    }

    componentDidMount() {
        // 该方法发生在render 之后。在该方法中,ReactJS会使用render方法返回的虚拟DOM对象来创建真实的DOM结构
        console.log("componentDidMount");
    }

    // 3.更新阶段
    componentDidReceiveProps() {
        // 该方法发生在this.props被修改或父组件调用setProps()方法之后
        console.log("componentDidReceiveProps");
    }

    shouldComponentUpdate() {
        // 是否需要更新
        console.log("shouldComponentUpdate");
        return true;
    }

    componentWillUpdate() {
        // 将要更新
        console.log("componentWillUpdate");
    }

    componentDidUpdate() {
        // 更新完毕
        console.log("componentDitUpdate");
    }

    // 4.销毁阶段
    componentDidUnMount() {
        // 销毁时被调用
        console.log("componentDidUnMount");
    }

}


AppRegistry.registerComponent('HelloRN', ()=>LifeCycleES6);
