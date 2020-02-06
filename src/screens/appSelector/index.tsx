import { colors } from '@components';
import { ApplicationActions } from '@reducers';
import { ApplicationState } from '@store';
import React, { Component } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Applications } from '@reducers';

const { height, width } = Dimensions.get("window");

interface AppSelectorState {
}

interface AppSelectorProps {
    ApplicationActions: typeof ApplicationActions
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
                <View style={{ width: width, alignContent: "center", alignSelf: "center", alignItems: "center" }}>
                    <TouchableHighlight underlayColor="#ffffff00"
                        style={{
                            padding: 0,
                            marginTop: 10,
                            alignContent: "center",
                            alignSelf: "center",
                            alignItems: "center",
                            width: 180,
                            height: 180,
                            borderRadius: 180 / 2,
                            borderColor: colors.borderColor,
                            borderWidth: 2,
                            backgroundColor: '#8487e4'
                        }}
                        onPressIn={async () => {
                            await this.props.ApplicationActions.setCurrent(Applications.Siparis);
                            this.props.navigation.navigate("Department");
                        }}>
                        <View style={{
                            alignItems: "center", alignContent: "center",
                            alignSelf: "center"
                        }}>
                            <Text style={{
                                fontSize: 34,
                                height: 180,
                                color: "#fff",
                                marginTop: 0,
                                flexWrap: "nowrap",
                                textAlignVertical: "center",
                                textAlign: "center"
                            }}>Sipariş</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="#ffffff00"
                        style={{
                            padding: 0,
                            marginTop: 10,
                            alignContent: "center",
                            alignSelf: "center",
                            alignItems: "center",
                            width: 180,
                            height: 180,
                            borderRadius: 180 / 2,
                            borderColor: colors.borderColor,
                            borderWidth: 2,
                            backgroundColor: '#d584e4'
                        }}
                        onPressIn={async () => {
                            this.props.navigation.navigate("ActiviteTypeSelector");
                        }}>
                        <View style={{
                            alignItems: "center", alignContent: "center",
                            alignSelf: "center"
                        }}>
                            <Text style={{
                                fontSize: 34,
                                height: 180,
                                color: "#fff",
                                marginTop: 0,
                                flexWrap: "nowrap",
                                textAlignVertical: "center",
                                textAlign: "center"
                            }}>Aktivite</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="#ffffff00"
                        style={{
                            padding: 0,
                            marginTop: 10,
                            alignContent: "center",
                            alignSelf: "center",
                            alignItems: "center",
                            width: 180,
                            height: 180,
                            borderRadius: 180 / 2,
                            borderColor: colors.borderColor,
                            borderWidth: 2,
                            backgroundColor: '#84c9e4'
                        }}
                        onPressIn={async () => {
                            // await this.props.ApplicationActions.setCurrent(Applications.Turnike);
                            // this.props.navigation.navigate("Turnike");
                            await this.props.ApplicationActions.setCurrent(Applications.AktiviteKontrol);
                            this.props.navigation.navigate("ActivityCheck");
                        }}>
                        <View style={{
                            alignItems: "center", alignContent: "center",
                            alignSelf: "center"
                        }}>
                            <Text style={{
                                fontSize: 34,
                                height: 180,
                                color: "#fff",
                                marginTop: 0,
                                flexWrap: "nowrap",
                                textAlignVertical: "center",
                                textAlign: "center"
                            }}>Turnike</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </SafeAreaView>
        )
    }
}

export const AppSelector = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            ApplicationActions: bindActionCreators({ ...ApplicationActions }, dispatch),
        };
    }
)(AppSelectorScreen));

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});