/**
 * Created by mlwills on 16/5/31.
 */
import React, {
    Component
} from 'react';
import ReactNative, {
    View,
    Text,
    AppRegistry,
    StyleSheet
} from 'react-native';


var BoxStyles = StyleSheet.create({
    height50: {
        height: 50,
    },
    height400: {
        height: 350,
    },
    width400: {
        width: 350,
    },
    bgred: {
        backgroundColor: "#6AC5AC",
    },
    box: {
        flexDirection: "column",
        flex: 1,
        position: "relative"
    },
    label: {
        top: 0,
        left: 0,
        paddingTop: 0,
        paddingBottom: 3,
        paddingRight: 3,
        paddingLeft: 3,
        position: "absolute",
        backgroundColor: "#FDC72F",

    },
    top: {
        justifyContent: "center",
        alignItems: "center"
    },
    bottom: {
        justifyContent: "center",
        alignItems: "center"
    },
    right: {
        width: 50,
        justifyContent: "space-around",
        alignItems: "center"
    },
    left: {
        width: 50,
        justifyContent: "space-around",
        alignItems: "center"
    },
    yellow: {
        color: "#FDC72F",
        fontWeight: "900",
    },
    white: {
        color: "white",
        fontWeight: "900",
    },
    marginBox: {
        position: "absolute",
        top: 100,
        paddingLeft: 7,
        paddingRight: 7,
    },
    borderBox: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row"
    }

});

export default class BoxContainer extends React.Component {
    render() {
        return (
            <View style={BoxStyles.marginBox} ref="lab1">
                <View style={[BoxStyles.box,BoxStyles.height400,BoxStyles.width400]}>
                    <View style={[BoxStyles.top,BoxStyles.height50,BoxStyles.bgred]}>
                        <Text style={BoxStyles.yellow}>top</Text>
                    </View>
                    <View style={BoxStyles.borderBox}>
                        <View style={[BoxStyles.left,BoxStyles.bgred]}>
                            <Text style={BoxStyles.yellow}>left</Text>
                        </View>
                        <View style={[BoxStyles.right,BoxStyles.bgred]}>
                            <Text style={BoxStyles.yellow}>right</Text>
                        </View>
                    </View>
                    <View style={[BoxStyles.bottom,BoxStyles.height50,BoxStyles.bgred]}>
                        <Text style={BoxStyles.yellow}>bottom</Text>
                    </View>
                    <View style={[BoxStyles.label]}>
                        <Text style={BoxStyles.white}>margin</Text>
                    </View>
                </View>
            </View>
        )
    }
}


AppRegistry.registerComponent('HelloRN',()=>BoxContainer);