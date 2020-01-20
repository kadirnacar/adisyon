import { ApplicationState } from '@store';
import LottieView from 'lottie-react-native';
import React, { Component } from 'react';
import { Dimensions, ImageBackground, View, TouchableOpacity, Text } from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import { withNavigation, NavigationInjectedProps, NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CustomerActions } from '@reducers';
const { width, scale, height } = Dimensions.get("window");
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, CustomerInfo } from '@components';
import 'intl';
import 'intl/locale-data/jsonp/tr';

interface CustomerState {
}

interface CustomerProps {
    CustomerActions: typeof CustomerActions
}

type Props = NavigationInjectedProps & CustomerProps & ApplicationState;

class NfcScreen extends Component<Props, any> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Kart Oku",
        };
    };
    constructor(props) {
        super(props);
        this.handleComponentMount = this.handleComponentMount.bind(this);
    }

    async componentDidMount() {
        NfcManager.isEnabled().then(enabled => {
            NfcManager.start().then(() => {
                if (enabled) {
                    NfcManager.setEventListener(NfcEvents.DiscoverTag, async tag => {
                        await this.props.CustomerActions.getItem(tag.id);
                    });
                    NfcManager.registerTagEvent();
                } else {
                    console.log("disabled");
                }
            }).catch(ex => {
                console.log("ex", ex)
            })
        })
    }

    componentWillUnmount() {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        NfcManager.unregisterTagEvent().catch(() => 0);
    }

    async handleComponentMount() {
        await this.props.CustomerActions.clear();
    }

    render() {
        return (
            <React.Fragment>
                <NavigationEvents
                    onWillFocus={this.handleComponentMount} />
                <TouchableOpacity style={{
                    zIndex: 2,
                    position: "absolute",
                    flex: 1,
                    top: 50,
                    right: 20,
                    backgroundColor: colors.transparentBackColor,
                    borderRadius: 40,
                    borderColor: colors.borderColor,
                    borderWidth: 2,
                    padding: 10
                }}
                    onPress={() => {
                        NfcManager.goToNfcSetting();
                    }}>
                    <Icon name="wrench" size={35} color={colors.inputTextColor} />
                </TouchableOpacity>
                <View style={{ flex: 1, width: width, height: 500, flexDirection: "row" }}>
                    <LottieView source={require('../../../assets/animation.json')} autoPlay loop />
                </View>
                <CustomerInfo style={{ height: 120, bottom: 20 }} onPress={() => { this.props.navigation.navigate("Adisyon") }} />
            </React.Fragment>
        )
    }
}


export const Nfc = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            CustomerActions: bindActionCreators({ ...CustomerActions }, dispatch),
        };
    }
)(NfcScreen));