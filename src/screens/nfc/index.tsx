import { CustomerInfo, NfcReader } from '@components';
import { ActivityOrderActions, AdisyonActions, Applications, CustomerActions } from '@reducers';
import { ApplicationState } from '@store';
import React, { Component } from 'react';
import { Alert, Dimensions } from 'react-native';
import { NavigationEvents, NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { width, scale, height } = Dimensions.get("window");

interface CustomerState {
}

interface CustomerProps {
    CustomerActions: typeof CustomerActions;
    AdisyonActions: typeof AdisyonActions;
    ActivityOrderActions: typeof ActivityOrderActions;
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
        this.handleComponentUnMount = this.handleComponentUnMount.bind(this);
    }

    componentWillUnmount() {
    }

    async handleComponentMount() {
        await this.props.CustomerActions.clear();
        await this.props.AdisyonActions.setCurrent(null);
        await this.props.ActivityOrderActions.setCurrent(null);
    }
    async handleComponentUnMount() {
        // NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        // NfcManager.unregisterTagEvent().catch(() => 0);
    }
    render() {
        return (
            <React.Fragment>
                <NavigationEvents
                    onWillBlur={this.handleComponentUnMount}
                    onWillFocus={this.handleComponentMount} />
                <NfcReader onReadTag={async (tag) => {
                    const isFind = await this.props.CustomerActions.getItem(tag);
                    if (!isFind)
                        Alert.alert("Kart Bilgisi Bulunamadı.");
                    else {
                        if (this.props.Application.current == Applications.Siparis)
                            this.props.navigation.navigate("Adisyon")
                        else if (this.props.Application.current == Applications.AktiviteSatis)
                            this.props.navigation.navigate("Aktivite")
                        else if (this.props.Application.current == Applications.AktiviteKontrol) {
                            const result = await this.props.ActivityOrderActions.checkItem(this.props.ActivityOrder.checkItem, this.props.ActivityOrder.checkItemSeance, tag);
                            if (result) {
                                Alert.alert(result["MESSAGE"]);
                            }
                        } else if (this.props.Application.current == Applications.Turnike) {
                            const result = await this.props.ActivityOrderActions.checkItem(this.props.ActivityOrder.checkItem, null, tag);
                            if (result) {
                                Alert.alert(result["MESSAGE"]);
                            }
                        }
                    }
                }} />
                <CustomerInfo style={{ height: 120, bottom: 20 }} onPress={() => {
                    // this.props.navigation.navigate("Adisyon")
                }} />
            </React.Fragment>
        )
    }
}


export const Nfc = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            CustomerActions: bindActionCreators({ ...CustomerActions }, dispatch),
            AdisyonActions: bindActionCreators({ ...AdisyonActions }, dispatch),
            ActivityOrderActions: bindActionCreators({ ...ActivityOrderActions }, dispatch),
        };
    }
)(NfcScreen));