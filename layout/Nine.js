import React, {Component} from 'react'
import ReactNative, {AppRegistry, StyleSheet, View, Text, PixelRatio} from 'react-native'

export default class Nine extends Component {
    render() {
        return (
            <View style={styles.flex}>
                <View style={[styles.container,styles.danger]}>
                        <View style={[styles.item, styles.center]}>
                            <Text style={styles.font}>
                                酒店
                            </Text>
                        </View>
                        <View style={[styles.item, styles.lineLeftRight]}>
                            <View style={[styles.center, styles.flex, styles.lineCenter]}>
                                <Text style={styles.font}>
                                    海外酒店
                                </Text>
                            </View>
                            <View style={[styles.center, styles.flex]}>
                                <Text style={styles.font}>
                                    特惠酒店
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.item]}>
                            <View style={[styles.center, styles.flex, styles.lineCenter]}>
                                <Text style={styles.font}>
                                    团购
                                </Text>
                            </View>
                            <View style={[styles.center, styles.flex]}>
                                <Text style={styles.font}>
                                    客栈公寓
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.container,styles.primary]}>
                        <View style={[styles.item, styles.center]}>
                            <Text style={styles.font}>
                                机票
                            </Text>
                        </View>
                        <View style={[styles.item, styles.lineLeftRight]}>
                            <View style={[styles.center, styles.flex, styles.lineCenter]}>
                                <Text style={styles.font}>
                                    海外酒店
                                </Text>
                            </View>
                            <View style={[styles.center, styles.flex]}>
                                <Text style={styles.font}>
                                    特惠酒店
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.item]}>
                            <View style={[styles.center, styles.flex, styles.lineCenter]}>
                                <Text style={styles.font}>
                                    团购
                                </Text>
                            </View>
                            <View style={[styles.center, styles.flex]}>
                                <Text style={styles.font}>
                                    客栈公寓
                                </Text>
                            </View>
                        </View>
                    </View>

                <View style={[styles.container,styles.success]}>
                    <View style={[styles.item, styles.center]}>
                        <Text style={styles.font}>
                            旅游
                        </Text>
                    </View>
                    <View style={[styles.item, styles.lineLeftRight]}>
                        <View style={[styles.center, styles.flex, styles.lineCenter]}>
                            <Text style={styles.font}>
                                海外酒店
                            </Text>
                        </View>
                        <View style={[styles.center, styles.flex]}>
                            <Text style={styles.font}>
                                特惠酒店
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.item]}>
                        <View style={[styles.center, styles.flex, styles.lineCenter]}>
                            <Text style={styles.font}>
                                团购
                            </Text>
                        </View>
                        <View style={[styles.center, styles.flex]}>
                            <Text style={styles.font}>
                                客栈公寓
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.container,styles.warning]}>
                    <View style={[styles.item]}>
                        <View style={[styles.center, styles.flex,styles.lineCenter]}>
                            <Text style={styles.font}>
                                景点 玩乐
                            </Text>
                        </View>
                        <View style={[styles.center, styles.flex]}>
                            <Text style={styles.font}>
                                礼品卡
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.item, styles.lineLeftRight]}>
                        <View style={[styles.center, styles.flex, styles.lineCenter]}>
                            <Text style={styles.font}>
                                海外酒店
                            </Text>
                        </View>
                        <View style={[styles.center, styles.flex]}>
                            <Text style={styles.font}>
                                特惠酒店
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.item]}>
                        <View style={[styles.center, styles.flex, styles.lineCenter]}>
                            <Text style={styles.font}>
                                团购
                            </Text>
                        </View>
                        <View style={[styles.center, styles.flex]}>
                            <Text style={styles.font}>
                                客栈公寓
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.servicesContainer,styles.marginTopSm]}>
                    <View style={[styles.item,styles.servicesItem]}>
                        <View style={[styles.center, styles.flex,styles.lineCenter]}>
                            <Text>
                               ICON
                            </Text>
                            <Text>
                                景点 玩乐
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.item,styles.servicesItem]}>
                        <View style={[styles.center, styles.flex,styles.lineCenter]}>
                            <Text>
                                ICON
                            </Text>
                            <Text>
                                景点 玩乐
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.item,styles.servicesItem]}>
                        <View style={[styles.center, styles.flex,styles.lineCenter]}>
                            <Text>
                                ICON
                            </Text>
                            <Text>
                                景点 玩乐
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.item,styles.servicesItem]}>
                        <View style={[styles.center, styles.flex,styles.lineCenter]}>
                            <Text>
                                ICON
                            </Text>
                            <Text>
                                景点 玩乐
                            </Text>
                        </View>
                    </View>
                </View>

            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        marginLeft: 5,
        marginRight: 5,
        height: 90,
        flexDirection: 'row',
        borderRadius:5,
    },
    danger:{
        marginTop: 25,
        backgroundColor: '#FF0067',
        borderBottomLeftRadius:0,
        borderBottomRightRadius:0,
    },
    primary:{
        marginTop:3,
        borderRadius:0,
        backgroundColor:'#439AFC'
    },
    success:{
        marginTop:3,
        borderRadius:0,
        backgroundColor:'#54C53B'
    },
    warning:{
        marginTop:3,
        backgroundColor:'#FDA132',
        borderRadius:0,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
    },
    item: {
        flex: 1,
        height: 90,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flex: {
        flex: 1
    },
    font: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    lineLeftRight: {
        borderLeftWidth: 1 / PixelRatio.get(),
        borderRightWidth: 1 / PixelRatio.get(),
        borderColor: '#fff'
    },
    lineCenter: {
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: '#fff'
    },
    servicesContainer:{
        marginLeft: 5,
        marginRight: 5,
        height:120,
        flexDirection: 'row',
        borderRadius:5,
        backgroundColor:'#fff',
    },
    servicesItem:{
        color: '#000',
    },
    servicesFont:{
        borderColor:'#ccc'
    },
    marginTopSm:{
        marginTop:5,
    }
});

AppRegistry.registerComponent('HelloRN', () => Nine);