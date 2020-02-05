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
import { ApplicationActions, Applications } from '@reducers';

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
                            width: 180,
                            height: 180,
                            borderRadius: 180 / 2,
                            borderColor: colors.borderColor,
                            borderWidth: 2,
                            backgroundColor: '#8487e4'
                        }}
                        onPressIn={async () => {
                            await this.props.ApplicationActions.setCurrent(Applications.AktiviteSatis);
                            this.props.navigation.navigate("Nfc");
                        }}>
                        <View style={{
                            alignItems: "center", alignContent: "center",
                            alignSelf: "center"
                        }}>
                            <Text style={{
                                fontSize: 24,
                                height: 180,
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
                            width: 180,
                            height: 180,
                            borderRadius: 180 / 2,
                            borderColor: colors.borderColor,
                            borderWidth: 2,
                            backgroundColor: '#d584e4'
                        }}
                        onPressIn={async () => {
                            await this.props.ApplicationActions.setCurrent(Applications.AktiviteKontrol);
                            this.props.navigation.navigate("Nfc");
                        }}>
                        <View style={{
                            alignItems: "center", alignContent: "center",
                            alignSelf: "center"
                        }}>
                            <Text style={{
                                fontSize: 24,
                                height: 180,
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