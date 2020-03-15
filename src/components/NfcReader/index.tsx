import { colors, LoaderSpinner } from '@components';
import { ActivityOrderActions, AdisyonActions, CustomerActions } from '@reducers';
import { ApplicationState } from '@store';
import React, { Component } from 'react';
import { Dimensions, Text, TouchableHighlight, View, Alert } from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
const { width, scale, height } = Dimensions.get("window");
import 'intl';
import 'intl/locale-data/jsonp/tr';
interface NfcReaderState {
}

interface NfcReaderProps {
    onReadTag?: (tagId: string) => void;
    CustomerActions: typeof CustomerActions;
    AdisyonActions: typeof AdisyonActions;
    ActivityOrderActions: typeof ActivityOrderActions;
}

type Props = NavigationInjectedProps & NfcReaderProps & ApplicationState;

class NfcReaderComp extends Component<Props, NfcReaderState> {
    constructor(props) {
        super(props);

    }
    componentWillUnmount() {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        NfcManager.unregisterTagEvent().catch(() => 0);
    }
    async componentDidMount() {
        NfcManager.isEnabled().then(enabled => {
            NfcManager.start().then(() => {
                if (enabled) {
                    NfcManager.setEventListener(NfcEvents.DiscoverTag, async tag => {
                        if (this.props.onReadTag)
                            this.props.onReadTag(tag.id);
                    });
                    NfcManager.registerTagEvent();
                } else {
                }
            }).catch(ex => {
                console.log("ex", ex)
            })
        })
    }
    render() {
        return (
            <React.Fragment>
                <LoaderSpinner
                    showLoader={this.props.Customer.isRequest}
                    onCloseModal={async () => {
                        await this.props.CustomerActions.clear();
                    }} />
                <TouchableHighlight
                    underlayColor="#ffffff00"
                    style={{
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
                    onPressIn={() => {
                        NfcManager.goToNfcSetting();
                    }}>
                    <Icon name="wrench" size={35} color={colors.inputTextColor} />
                </TouchableHighlight>
                {/* <TouchableHighlight
                    underlayColor="#ffffff00"
                    style={{
                        zIndex: 2,
                        position: "absolute",
                        flex: 1,
                        top: 150,
                        right: 20,
                        backgroundColor: colors.transparentBackColor,
                        borderRadius: 40,
                        borderColor: colors.borderColor,
                        borderWidth: 2,
                        padding: 10
                    }}
                    onPressIn={() => {
                        if (this.props.onReadTag)
                            this.props.onReadTag("5B9865ED");
                    }}>
                    <Icon name="readme" size={35} color={colors.inputTextColor} />
                </TouchableHighlight> */}
                <View style={{
                    alignContent: "center",
                    alignItems: "center",
                    padding: 10
                }}>
                    <Text>{this.props.Application.nfcScreenTitle}</Text>
                </View>
                <View style={{ flex: 1, width: width, height: 500, flexDirection: "row" }}>
                    <LottieView source={require('../../../assets/animation.json')} autoPlay loop />
                </View>
            </React.Fragment>
        )
    }
}

export const NfcReader = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            CustomerActions: bindActionCreators({ ...CustomerActions }, dispatch),
            AdisyonActions: bindActionCreators({ ...AdisyonActions }, dispatch),
            ActivityOrderActions: bindActionCreators({ ...ActivityOrderActions }, dispatch),
        };
    }
)(NfcReaderComp)) as any;