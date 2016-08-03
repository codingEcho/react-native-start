/*
NavigatorIOS
*/
import React from 'react';
import ReactNative, {
  StyleSheet,
  NavigatorIOS,
  Text,
  AppRegistry,
  View,
  ScrollView,
} from 'react-native';

class List extends React.Component{
  render(){
    return(
      <ScrollView style={styles.flex}>
        <Text style={styles.list_item} onPress={this.goTo.bind(this,'新闻台')}>☆ 豪华邮轮济州岛3日游</Text>
        <Text style={styles.list_item} onPress={this.goTo.bind(this,'中新网')}>☆ 豪华邮轮台湾3日游</Text>
        <Text style={styles.list_item} onPress={this.goTo.bind(this,'腾讯网')}>☆ 豪华邮轮地中海8日游</Text>
      </ScrollView>
    );
  }

  goTo(from){
    this.props.navigator.push({
      component: Detail,
      title: '邮轮详情',
      rightButtonTitle: '购物车',
      onRightButtonPress: function(){
        alert('进入我的购物车');
      },
      passProps:{
        from:from
      }
    });
  }
}

class Detail extends  React.Component{
  render(){
    return (
      <ScrollView>
        <Text>详情页</Text>
        <Text>尽管信息很少，但这就是详情页[{this.props.from}]</Text>
      </ScrollView>
    );
  }
}

class NV extends React.Component{
  render(){
    return(
      <NavigatorIOS
        style={{flex:1}}
        initialRoute={{
          component: List,
          title: '邮轮',
          passProps: {},
        }}
      />
    );
  }
}

var styles = StyleSheet.create({
  flex:{
    flex: 1,
  },
  list_item:{
    lineHeight:25,
    fontSize:16,
    marginLeft:10,
    marginRight:10
  }
});

AppRegistry.registerComponent('HelloRN', () => NV);
