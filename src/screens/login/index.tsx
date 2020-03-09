import { colors, LoaderSpinner } from '@components';
import { CustomerActions, UserActions, GarsonActions, DepartmentActions, StokActions, StokGrupActions, ActivityActions, ExchangeActions } from '@reducers';
import { ApplicationState } from '@store';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { NavigationEventPayload, NavigationEvents, NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
const { width, scale, height } = Dimensions.get("window");

interface LoginState {
    errorMessage?: string;
    username?: string;
    password?: string;
    isRequest: boolean;
}

interface UserProps {
    UserActions: typeof UserActions;
    CustomerActions: typeof CustomerActions;
    GarsonActions: typeof GarsonActions;
    DepartmentActions: typeof DepartmentActions;
    StokActions: typeof StokActions;
    StokGrupActions: typeof StokGrupActions;
    ActivityActions: typeof ActivityActions;
    ExchangeActions: typeof ExchangeActions;
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
            password: null,//"123",
            username: null,//"posmobil",
            isRequest: false
        }
    }

    async handleLogin() {
        this.setState({ isRequest: true })
        const isLogin = await this.props.UserActions.getItem(this.state.username, this.state.password);
        if (!isLogin) {
            this.setState({ errorMessage: "Hatalı giriş" })
        } else {
            await this.loadDataFromServer();
            await this.props.CustomerActions.clear();
            const getGarson = await this.props.GarsonActions.getItem(this.props.User.current.GARSONID);
            if (!getGarson) {
                this.setState({ errorMessage: "Garson Bilgisi Bulunamadı." })
            } else {
                this.props.navigation.navigate("AppSelector");
            }
        }
        this.setState({ isRequest: false })

    }

    async loadDataFromServer() {
        await this.props.DepartmentActions.getItems();
        await this.props.StokGrupActions.getItems();
        await this.props.StokActions.getItems();
        await this.props.ExchangeActions.getItems();
        await this.props.ActivityActions.getItems(new Date());
        await this.props.ActivityActions.getTurnikeItems(new Date());
    }

    async handleComponentMount(payload: NavigationEventPayload) {
        await this.props.UserActions.clear();
        await this.props.GarsonActions.clear();
    }

    async handleComponentUnMount(payload: NavigationEventPayload) {
        this.setState({
            errorMessage: "",
            password: null,
            username: null
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
                        showLoader={this.state.isRequest}
                        onCloseModal={async () => {
                            this.setState({
                                errorMessage: "",
                                password: null
                            });
                            await this.props.UserActions.clear();
                        }} />
                    <View style={styles.formContainer}>
                        <TouchableHighlight
                            onPress={() => {
                                this.props.navigation.navigate("Config");
                            }}
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                                borderColor: colors.borderColor,
                                borderWidth: 2,
                                borderRadius: 30,
                                padding: 10,
                                alignContent: "center",
                                alignItems: "center",
                            }}>
                            <FontAwesome5Icon
                                name="cogs"
                                size={20}
                                color={colors.borderColor}
                            />
                        </TouchableHighlight>
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
                                }}>{this.state.errorMessage}</Text>
                            </View>
                        )}
                        <TextInput
                            placeholder="Kullanıcı Adı"
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
                                borderRadius: 25,
                                marginBottom: 5
                            }}
                            value={this.state.username}
                            onChangeText={text => { this.setState({ username: text }) }}
                            autoCorrect={false}
                            autoCapitalize="none"
                        />
                        <TextInput
                            placeholder="Şifre"
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
            ExchangeActions: bindActionCreators({ ...ExchangeActions }, dispatch),
            UserActions: bindActionCreators({ ...UserActions }, dispatch),
            CustomerActions: bindActionCreators({ ...CustomerActions }, dispatch),
            GarsonActions: bindActionCreators({ ...GarsonActions }, dispatch),
            DepartmentActions: bindActionCreators({ ...DepartmentActions }, dispatch),
            StokActions: bindActionCreators({ ...StokActions }, dispatch),
            StokGrupActions: bindActionCreators({ ...StokGrupActions }, dispatch),
            ActivityActions: bindActionCreators({ ...ActivityActions }, dispatch),
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