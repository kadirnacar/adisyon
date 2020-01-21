import { colors, LoaderSpinner } from '@components';
import { CustomerActions, UserActions } from '@reducers';
import { ApplicationState } from '@store';
import React, { Component } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { NavigationEventPayload, NavigationEvents, NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
const { width, scale, height } = Dimensions.get("window");

interface LoginState {
    errorMessage?: string;
    password?: string;
}

interface UserProps {
    UserActions: typeof UserActions;
    CustomerActions: typeof CustomerActions;
}

type Props = NavigationInjectedProps & UserProps & ApplicationState;

class LoginScreen extends Component<Props, LoginState> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Şifre Giriş",
        };
    };
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleComponentMount = this.handleComponentMount.bind(this);
        this.handleComponentUnMount = this.handleComponentUnMount.bind(this);
        this.state = {
            errorMessage: "",
            password: null
        }
    }

    async handleLogin() {
        const isLogin = await this.props.UserActions.getItem(this.state.password);
        if (!isLogin) {
            this.setState({ errorMessage: "Hatalı giriş" })
        } else {
            await this.props.CustomerActions.clear();
            this.props.navigation.navigate("Department");
        }
    }

    async handleComponentMount(payload: NavigationEventPayload) {
        await this.props.UserActions.clear();
    }

    async handleComponentUnMount(payload: NavigationEventPayload) {
        this.setState({
            errorMessage: "",
            password: null
        });
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
                    <LoaderSpinner
                        showLoader={this.props.User.isRequest}
                        onCloseModal={async () => {
                            this.setState({
                                errorMessage: "",
                                password: null
                            });
                            await this.props.UserActions.clear();
                        }} />
                    <View style={styles.formContainer}>
                        {!!this.state.errorMessage && (
                            <View style={{
                                flexDirection: "row",
                                marginHorizontal: 8,
                                marginVertical: 20,
                                borderColor: "#ff0000",
                                borderWidth: 2,
                                padding: 10,
                                backgroundColor: "#ff000011",
                                borderRadius: 25
                            }}>
                                <FontAwesome5Icon
                                    name="times"
                                    size={20}
                                    color={"#ff0000"}
                                    style={{
                                        borderColor: colors.errorTextColor,
                                        borderWidth: 2,
                                        borderRadius: 20,
                                        width: 25,
                                        height: 25,
                                        padding: 2,
                                        alignContent: "center",
                                        alignItems: "center",
                                        textAlign: "center",
                                        marginRight: 10
                                    }}
                                />
                                <Text style={{
                                    color: colors.errorTextColor,
                                    fontSize: 16,
                                    fontWeight: "bold",
                                }}>{this.state.errorMessage} Hata</Text>
                            </View>
                        )}
                        <TextInput
                            placeholder="Şifre"
                            autoFocus={true}
                            // returnKeyType={"send"}
                            clearButtonMode="while-editing"
                            onSubmitEditing={async () => await this.handleLogin()}
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
                            value={this.state.password}
                            onChangeText={text => { this.setState({ password: text }) }}
                            autoCorrect={false}
                            autoCapitalize="none"
                            secureTextEntry
                        />

                    </View>
                    <View style={{ flex: 1, height: 50 }}>
                        <TouchableHighlight underlayColor="#ffffff00"
                            disabled={this.props.User.isRequest}
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
                            onPressIn={async () => await this.handleLogin()}
                        >
                            <Text style={{ color: colors.buttonTextColor, fontSize: 18, fontWeight: "bold" }}>Giriş</Text>
                        </TouchableHighlight>
                    </View>
                </SafeAreaView >
            </React.Fragment>
        )
    }
}

export const Login = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            UserActions: bindActionCreators({ ...UserActions }, dispatch),
            CustomerActions: bindActionCreators({ ...CustomerActions }, dispatch),
        };
    }
)(LoginScreen));

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