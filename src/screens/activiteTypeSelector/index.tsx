import { colors } from '@components';
import { ApplicationActions, Applications } from '@reducers';
import { ApplicationState } from '@store';
import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const turnikeLogo = require('../../../assets/turnike.png');
const saleLogo = require('../../../assets/sale.png');

const { height, width } = Dimensions.get("window");

interface ActiviteTypeSelectorState {
}

interface ActiviteTypeSelectorProps {
    ApplicationActions: typeof ApplicationActions
}

type Props = NavigationInjectedProps & ActiviteTypeSelectorProps & ApplicationState;

class ActiviteTypeSelectorScreen extends Component<Props, ActiviteTypeSelectorState> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Aktivite",
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
                    <TouchableHighlight underlayColor="#ffffff00"
                        style={{
                            padding: 0,
                            marginTop: 10,
                            alignContent: "center",
                            alignSelf: "center",
                            alignItems: "center",
                            width: 160,
                            height: 160,
                            borderRadius: 160 / 2,
                            borderColor: colors.borderColor,
                            borderWidth: 2,
                            backgroundColor: '#8487e4'
                        }}
                        onPressIn={async () => {
                            await this.props.ApplicationActions.setCurrent(Applications.AktiviteSatis);
                            await this.props.ApplicationActions.setNfcTitle("Aktivite Satış");

                            this.props.navigation.navigate("Nfc");
                        }}>
                        <View style={{
                            alignItems: "center", alignContent: "center",
                            alignSelf: "center"
                        }}>
                            <Image source={saleLogo}
                                resizeMethod={"resize"}
                                style={{
                                    marginTop: 5,
                                    width: 70,
                                    height: 70,
                                }}
                            ></Image>
                            <Text style={{
                                fontSize: 20,
                                height: 50,
                                color: "#fff",
                                marginTop: 0,
                                flexWrap: "nowrap",
                                textAlignVertical: "center",
                                textAlign: "center"
                            }}>Aktivite Satış</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="#ffffff00"
                        style={{
                            padding: 0,
                            marginTop: 10,
                            alignContent: "center",
                            alignSelf: "center",
                            alignItems: "center",
                            width: 160,
                            height: 160,
                            borderRadius: 160 / 2,
                            borderColor: colors.borderColor,
                            borderWidth: 2,
                            backgroundColor: '#d584e4'
                        }}
                        onPressIn={async () => {
                            await this.props.ApplicationActions.setCurrent(Applications.AktiviteKontrol);
                            await this.props.ApplicationActions.setNfcTitle("Aktivite Geçiş Kontrol");
                            this.props.navigation.navigate("ActivityCheck");
                        }}>
                        <View style={{
                            alignItems: "center", alignContent: "center",
                            alignSelf: "center"
                        }}>
                            <Image source={turnikeLogo}
                                resizeMethod={"resize"}
                                style={{
                                    marginTop: 5,
                                    width: 70,
                                    height: 70,
                                }}
                            ></Image>
                            <Text style={{
                                fontSize: 20,
                                height: 70,
                                color: "#fff",
                                marginTop: 0,
                                flexWrap: "nowrap",
                                textAlignVertical: "center",
                                textAlign: "center"
                            }}>Aktivite Giriş Kontrol</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </SafeAreaView>
        )
    }
}

export const ActiviteTypeSelector = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            ApplicationActions: bindActionCreators({ ...ApplicationActions }, dispatch),
        };
    }
)(ActiviteTypeSelectorScreen));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    content: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: 5,
        backgroundColor: colors.transparentBackColor,
        margin: 2,
        height: 100,
    },
    formContainer: {
        flex: 1,
        marginBottom: 5,
        justifyContent: 'flex-end',
    }
});