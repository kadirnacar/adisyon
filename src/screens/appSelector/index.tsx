import { colors, LoaderSpinner } from '@components';
import { ApplicationState } from '@store';
import ColorScheme from 'color-scheme';
import React, { Component } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import RNMaterialLetterIcon from 'react-native-material-letter-icon';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FlatList, NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { height, width } = Dimensions.get("window");

interface AppSelectorState {
}

interface AppSelectorProps {
}

type Props = NavigationInjectedProps & AppSelectorProps & ApplicationState;

class AppSelectorScreen extends Component<Props, AppSelectorState> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Uygulama Seçiniz",
        };
    };
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {

        const { container } = styles;
        return (
            <SafeAreaView style={container}>
                <View style={{ width: width }}>

                </View>
            </SafeAreaView>
        )
    }
}

export const AppSelector = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
        };
    }
)(AppSelectorScreen));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    }
});