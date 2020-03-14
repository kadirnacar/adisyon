import { colors } from '@components';
import config from '@config';
import { IConfig } from '@models';
import { ConfigActions } from '@reducers';
import { ApplicationState } from '@store';
import React, { Component } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { NavigationEventPayload, NavigationEvents, NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const { width, scale, height } = Dimensions.get("window");

interface ConfigState {
    config: IConfig;
}

interface UserProps {
    ConfigActions: typeof ConfigActions;
}

type Props = NavigationInjectedProps & UserProps & ApplicationState;

class ConfigScreen extends Component<Props, ConfigState> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Ayarlar",
        };
    };
    constructor(props) {
        super(props);
        this.handleConfig = this.handleConfig.bind(this);
        this.handleComponentMount = this.handleComponentMount.bind(this);
        this.handleComponentUnMount = this.handleComponentUnMount.bind(this);
        this.state = {
            config: {
                restUrl: config.restUrl,
                tenant: config.tenant,
                useAlagart: config.useAlagart
            }
        }
    }

    async handleConfig() {
        await this.props.ConfigActions.setConfig(this.state.config);
        Alert.alert("Ayarlar kaydedilmiştir.");

    }

    async loadDataFromServer() {
    }

    async handleComponentMount(payload: NavigationEventPayload) {
    }

    async handleComponentUnMount(payload: NavigationEventPayload) {
    }
    render() {
        const { container } = styles;
        return (
            <React.Fragment>
                <NavigationEvents
                    onWillFocus={this.handleComponentMount}
                    onWillBlur={this.handleComponentUnMount}
                />
                <SafeAreaView style={container}>
                    <View style={styles.formContainer}>

                        <TextInput
                            placeholder="Server Url"
                            autoFocus={true}
                            // returnKeyType={"send"}
                            clearButtonMode="while-editing"
                            style={{
                                color: colors.inputTextColor,
                                backgroundColor: colors.inputBackColor,
                                borderColor: colors.borderColor,
                                borderWidth: 1,
                                paddingVertical: 10,
                                paddingHorizontal: 15,
                                textAlign: "center",
                                fontSize: 20,
                                borderRadius: 25,
                                marginBottom: 5
                            }}
                            value={this.state.config.restUrl}
                            onChangeText={text => {
                                const stateConfig = this.state.config;
                                stateConfig.restUrl = text;
                                this.setState({ config: stateConfig })
                            }}
                            autoCorrect={false}
                            autoCapitalize="none"
                        />
                        <TextInput
                            placeholder="Tenant"
                            // returnKeyType={"send"}
                            clearButtonMode="while-editing"
                            style={{
                                color: colors.inputTextColor,
                                backgroundColor: colors.inputBackColor,
                                borderColor: colors.borderColor,
                                borderWidth: 1,
                                paddingVertical: 10,
                                paddingHorizontal: 15,
                                textAlign: "center",
                                fontSize: 20,
                                borderRadius: 25
                            }}
                            value={this.state.config.tenant.toString()}
                            onChangeText={text => {
                                const stateConfig = this.state.config;
                                const numberTenant = parseInt(text);
                                if (!isNaN(numberTenant))
                                    stateConfig.tenant = numberTenant;
                                this.setState({ config: stateConfig })
                            }}
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="number-pad"
                        />

                    </View>
                    <View style={{ flex: 1, height: 50 }}>
                        <TouchableHighlight underlayColor="#ffffff00"
                            style={{
                                width: "100%",
                                alignItems: "center",
                                paddingVertical: 10,
                                marginTop: 10,
                                borderColor: colors.borderColor,
                                borderWidth: 1,
                                backgroundColor: this.props.User.isRequest ? colors.inputBackColor : colors.buttonBackColor,
                                borderRadius: 25
                            }}
                            onPressIn={async () => await this.handleConfig()}
                        >
                            <Text style={{ color: colors.buttonTextColor, fontSize: 18, fontWeight: "bold" }}>Kaydet</Text>
                        </TouchableHighlight>
                    </View>
                </SafeAreaView >
            </React.Fragment>
        )
    }
}

export const Config = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            ConfigActions: bindActionCreators({ ...ConfigActions }, dispatch)
        };
    }
)(ConfigScreen));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "transparent",
    },
    content: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    formContainer: {
        flex: 1,
        marginBottom: 5,
        justifyContent: 'flex-end',
    }
});