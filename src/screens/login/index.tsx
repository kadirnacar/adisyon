import { ApplicationState } from '@store';
import React, { Component } from 'react';
import { TouchableHighlight, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Dimensions, ImageBackground } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';
import { colors } from '@components';
import { bindActionCreators } from 'redux';
import { UserActions, CustomerActions } from '@reducers';
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

    render() {
        const { container, content } = styles;

        return (
            <React.Fragment>
                <SafeAreaView style={container}>
                    <View style={styles.formContainer}>
                        {!!this.state.errorMessage && (
                            <View style={{ marginHorizontal: 8, marginVertical: 20 }}>
                                <Text style={{ color: "#f1c6c6" }}>{this.state.errorMessage}</Text>
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
                            style={{
                                width: "100%",
                                alignItems: "center",
                                paddingVertical: 10,
                                marginTop: 10,
                                borderColor: colors.borderColor,
                                borderWidth: 1,
                                backgroundColor: colors.buttonBackColor,
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