**本文出处：**

> [React/React Native 的ES5 ES6写法对照表](http://bbs.reactnative.cn/topic/15/react-react-native-%E7%9A%84es5-es6%E5%86%99%E6%B3%95%E5%AF%B9%E7%85%A7%E8%A1%A8)
> [React on ES6+](https://babeljs.io/blog/2015/06/07/react-on-es6-plus)

# React(Native) ES5 ES6 语法对照表

## 模块

### 引用

在ES5里，如果使用CommonJS标准，引入React包基本通过require进行，代码类似这样：

```javascript
// ES5
var React = require("react");
var {
    Component,
    PropTypes
} = React;  //引用React抽象组件

var ReactNative = require("react-native");
var {
    Image,
    Text,
} = ReactNative;  //引用具体的React Native组件
```

 在`ES6`里，`import`写法更为标准。注意在`React Native`里，`import`直到`0.12+`才能正常运作。

```javascript
// ES6
import React, {
    Component,
    PropTypes,
} from 'react';

import ReactNative,{
    Image,
    Text
} from 'react-native';
```

### 导出单个类


在ES5里，要导出一个类给别的模块用，一般通过module.exports来导出
```javascript
// ES5
var MyComponent = React.createClass({
    ...
});

module.exports = MyComponent;
```

在ES6里，通常用`export default`来实现相同的功能：
```javascript
// ES6
export default class MyComponent extends Component{
    ...
}
```

引用的时候也类似

```javascript
// ES5
var MyComponent = require('./MyComponent');
```

```javascript
// ES6
import MyComponent from './MyComponent';
```     

**注意：**

`import`必须搭配`export`;

`require`必须搭配`module.exports`;

否则就是上面这种`but got:object`。


## 定义组件

在ES5里，通常通过React.createClass来定义一个组件类，像这样：
```javascript
// ES5
var Photo = React.createClass({
    render: function() {
        return (
            <Image source={this.props.source} />
        );
    },
});
```

在ES6里，我们通过定义一个继承自React.Component的class来定义一个组件类，像这样：
```javascript
//ES6
class Photo extends React.Component {
    render() {
        return (
            <Image source={this.props.source} />
        );
    }
}
```        

### 给组件定义方法

从上面的例子里可以看到，给组件定义方法不再用 `名字: function()`的写法，而是直接用`名字()`，在方法的最后也不能有逗号了。

```javascript
// ES5
var Photo = React.createClass({
    componentWillMount: function(){

    },
    render: function() {
        return (
            <Image source={this.props.source} />
        );
    },
});
```

```javascript
// ES6
class Photo extends React.Component {
    componentWillMount() {

    }
    render() {
        return (
            <Image source={this.props.source} />
        );
    }
}
```



### 定义组件的属性类型和默认属性


在ES5里，属性类型和默认属性分别通过propTypes成员和getDefaultProps方法来实现
```javascript
// ES5
var Video = React.createClass({
    getDefaultProps: function() {
        return {
            autoPlay: false,
            maxLoops: 10,
        };
    },
    propTypes: {
        autoPlay: React.PropTypes.bool.isRequired,
        maxLoops: React.PropTypes.number.isRequired,
        posterFrameSrc: React.PropTypes.string.isRequired,
        videoSrc: React.PropTypes.string.isRequired,
    },
    render: function() {
        return (
            <View />
        );
    },
});
```
在ES6里，可以统一使用static成员来实现
```javascript
// ES6
class Video extends React.Component {
    static defaultProps = {
        autoPlay: false,
        maxLoops: 10,
    };  // 注意这里有分号
    static propTypes = {
        autoPlay: React.PropTypes.bool.isRequired,
        maxLoops: React.PropTypes.number.isRequired,
        posterFrameSrc: React.PropTypes.string.isRequired,
        videoSrc: React.PropTypes.string.isRequired,
    };  // 注意这里有分号
    render() {
        return (
            <View />
        );
    } // 注意这里既没有分号也没有逗号
}
```

也有人这么写，虽然不推荐，但读到代码的时候你应当能明白它的意思

```javascript    
// ES6
class Video extends React.Component {
    render() {
        return (
            <View />
        );
    }
}
Video.defaultProps = {
    autoPlay: false,
    maxLoops: 10,
};
Video.propTypes = {
    autoPlay: React.PropTypes.bool.isRequired,
    maxLoops: React.PropTypes.number.isRequired,
    posterFrameSrc: React.PropTypes.string.isRequired,
    videoSrc: React.PropTypes.string.isRequired,
};
```
**注意:** 对`React`开发者而言，`static`成员在`IE10`及之前版本不能被继承，而在`IE11`和其它浏览器上可以，这有时候会带来一些问题。`React Native`开发者可以不用担心这个问题。

### 初始化State


```javascript
// ES5
var Video = React.createClass({
    getInitialState: function() {
        return {
            loopsRemaining: this.props.maxLoops,
        };
    },
});
```    

```javascript
// ES6
class Video extends React.Component {
    state = {
        loopsRemaining: this.props.maxLoops,
    }
}
```

不过我们推荐更易理解的在构造函数中初始化（这样你还可以根据需要做一些计算）：

```javascript
// ES6
class Video extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loopsRemaining: this.props.maxLoops,
        };
    }
}
```    

### 把方法作为回调提供

很多习惯于ES6的用户反而不理解在ES5下可以这么做;
在`ES5`下，`React.createClass`会把所有的方法都`bind`一遍，
这样可以提交到任意的地方作为回调函数，而`this`不会变化。但官方现在逐步认为这反而是不标准、不易理解的。</td>
```javascript
// ES5
var PostInfo = React.createClass({
    handleOptionsButtonClick: function(e) {
        // Here, 'this' refers to the component instance.
        this.setState({showOptionsModal: true});
    },
    render: function(){
        return (
            <TouchableHighlight
            onPress={this.handleOptionsButtonClick}>
                <Text>{this.props.label}</Text>
            </TouchableHighlight>
        )
    },
});
```  

在`ES6`下，你需要通过`bind`来绑定`this`引用，
或者使用箭头函数（它会绑定当前`scope`的`this`引用）来调用
```javascript
// ES6
class PostInfo extends React.Component
{
    handleOptionsButtonClick(e){
        this.setState({showOptionsModal: true});
    }
    render(){
        return (
            <TouchableHighlight
                onPress={this.handleOptionsButtonClick.bind(this)}
                onPress={e=>this.handleOptionsButtonClick(e)}
                >
                <Text>{this.props.label}</Text>
            </TouchableHighlight>
        )
    },
}
```

**箭头函数**实际上是在这里定义了一个临时的函数，箭头函数的箭头=>之前是一个空括号、单个的参数名、或用括号括起的多个参数名，而箭头之后可以是一个表达式（作为函数的返回值），或者是用花括号括起的函数体（需要自行通过return来返回值，否则返回的是undefined）。

```javascript
// 箭头函数的例子
()=>1

v=>v+1

(a,b)=>a+b

()=>{
    alert("foo");
}

e=>{
    if (e == 0){
        return 0;
    }
    return 1000/e;
}
```
需要注意的是，不论是`bind`还是箭头函数，每次被执行都返回的是一个新的函数引用，因此如果你还需要函数的引用去做一些别的事情（譬如卸载监听器），那么你必须自己保存这个引用
```javascript
// 错误的做法
class PauseMenu extends React.Component{
    componentWillMount(){
        AppStateIOS.addEventListener('change', this.onAppPaused.bind(this));
    }
    componentDidUnmount(){
        AppStateIOS.removeEventListener('change', this.onAppPaused.bind(this));
    }
    onAppPaused(event){
    }
}

// 正确的做法
class PauseMenu extends React.Component{
    constructor(props){
        super(props);
        this._onAppPaused = this.onAppPaused.bind(this);
    }
    componentWillMount(){
        AppStateIOS.addEventListener('change', this._onAppPaused);
    }
    componentDidUnmount(){
        AppStateIOS.removeEventListener('change', this._onAppPaused);
    }
    onAppPaused(event){
    }
}
```

从这个帖子中我们还学习到一种新的做法：

```javascript
// 正确的做法
class PauseMenu extends React.Component{
    componentWillMount(){
        AppStateIOS.addEventListener('change', this.onAppPaused);
    }
    componentDidUnmount(){
        AppStateIOS.removeEventListener('change', this.onAppPaused);
    }
    onAppPaused = (event) => {
        //把方法直接作为一个arrow function的属性来定义，初始化的时候就绑定好了this指针
    }
}
```

## Mixins

在ES5下，我们经常使用`mixins`来为我们的类添加一些新的方法，譬如`PureRenderMixin`
```javascript
var PureRenderMixin = require('react-addons-pure-render-mixin');
React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className={this.props.className}>foo</div>;
  }
});
```

然而现在官方已经不再打算在`ES6`里继续推行`Mixins`，他们说：`Mixins Are Dead. Long Live Composition。`

尽管如果要继续使用mixins，还是有一些第三方的方案可以用，譬如这个方案

不过官方推荐，对于库编写者而言，应当尽快放弃Mixin的编写方式，上文中提到`Sebastian Markbåge`的一段代码推荐了一种新的编码方式：
```javascript
// Enhance.js
import { Component } from "React";

export var Enhance = ComposedComponent => class extends Component {
    constructor() {
        this.state = { data: null };
    }
    componentDidMount() {
        this.setState({ data: 'Hello' });
    }
    render() {
        return <ComposedComponent {...this.props} data={this.state.data} />;
    }
};

// HigherOrderComponent.js
import { Enhance } from "./Enhance";

class MyComponent {
    render() {
        if (!this.data) return <div>Waiting...</div>;
        return <div>{this.data}</div>;
    }
}

export default Enhance(MyComponent); // Enhanced component
```
用一个“增强函数”，来某个类增加一些方法，并且返回一个新类，这无疑能实现`mixin`所实现的大部分需求。

## ES6+带来的其它好处

### 解构&属性延展

结合使用ES6+的解构和属性延展，我们给子组件传递一批属性更为方便了。这个例子把`className`以外的所有属性传递给`div`标签：

```javascript

class AutoloadingPostsGrid extends React.Component {
    render() {
        var {
            className,
            ...others,  // contains all properties of this.props except for className
        } = this.props;
        return (
            <div className={className}>
                <PostsGrid {...others} />
                <button onClick={this.handleLoadMoreClick}>Load more</button>
            </div>
        );
    }
}
```

下面这种写法，则是传递所有属性的同时，用覆盖新的`className`值：
```javascript
<div {...this.props} className="override">
    …
</div>
```
这个例子则相反，如果属性中没有包含className，则提供默认的值，而如果属性中已经包含了，则使用属性中的值
```javascript
<div className="base" {...this.props}>
    …
</div>
```
