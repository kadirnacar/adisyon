import { ApplicationState } from '@store';
import React, { Component } from 'react';
import { View, ImageBackground, Dimensions } from 'react-native';
import { Themed, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import NfcManager, { Ndef, NdefParser, NfcEvents } from 'react-native-nfc-manager';

const { width, scale, height } = Dimensions.get("window");

class HomeScreen extends Component<any, any> {
    constructor(props) {
        super(props);
    }
   
    render() {
        return (<ImageBackground source={require("../../../assets/background.jpg")}
            style={{ flex: 1, width: width, height: height }}>
            <View><Themed.Text>deneme</Themed.Text></View>
        </ImageBackground>
        )
    }
}


export const Home = withNavigation(connect(
    (state: ApplicationState) => state,
    null
)(HomeScreen));