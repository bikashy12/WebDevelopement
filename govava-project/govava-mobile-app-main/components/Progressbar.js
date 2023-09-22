import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Animated } from 'react-native';
export default class ProgressBar extends Component {
    state = {
        progressStatusValue: 0,
    }
    animation = new Animated.Value(0);  //initialisation of Animated component to with initial value as the zero for start of the progress bar.
    componentDidMount() {
        console.log('gggggggggggggggggggggggg');
        this.onAnimation(10);  //calling onAnimation function with changing the value of the initial progress status value.
    }
    onAnimation = (nw_value) => {
        this.animation.addListener(({ value }) => {
            this.setState({ progressStatusValue: parseInt(value, 10) });
            if(value==100){
                setTimeout(() => {
                    this.props.navigation.navigate('Home');
                }, 100);
               // 
            }
        });
        Animated.timing(this.animation, {
            toValue: nw_value,  //value at which it need to reach for end of the progress bar
            duration: 1000,  //duration till the progress bar will continue
            useNativeDriver: true // Add This line
        }).start();
    }
    render() {
        return (
            <View style={progressStyles.containerStyle}>
                <Animated.View
                    style={[
                        progressStyles.innerStyle, { width: this.state.progressStatusValue + "%" },
                    ]}
                />
               
            </View>
        );
    }
}
//basic styles for creation of progress bar
const progressStyles = StyleSheet.create({
    containerStyle: {
        width: '100%',
        height: 6,
        //padding: 3,
        borderColor: "#FAA",
       // borderRadius: 5,
              backgroundColor: '#d7d7d7',
        //marginTop: 200,
        justifyContent: "center",
    },
    innerStyle: {
        width: "100%",
        height: 6,
        borderRadius: 5,
        backgroundColor: "#4496dd",
    },
    label: {
        fontSize: 24,
        color: "black",
        position: "absolute",
        zIndex: 1,
        alignSelf: "center",
    }
});