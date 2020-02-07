import { TurnikeCheckSelect } from '@components';
import { IActivityProduct, IActivity, ISeance } from '@models';
import { ActivityOrderActions, ApplicationActions, Applications } from '@reducers';
import { ApplicationState } from '@store';
import 'intl';
import 'intl/locale-data/jsonp/tr';
import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { HeaderBackButton, StackHeaderLeftButtonProps } from 'react-navigation-stack';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
const { width, scale, height } = Dimensions.get("window");

interface TurnikeCheckState {
    selectedActivities?: { [key: number]: IActivityProduct };
}

interface TurnikeCheckProps {
    ActivityOrderActions: typeof ActivityOrderActions;
    ApplicationActions: typeof ApplicationActions;
}

type Props = NavigationInjectedProps & TurnikeCheckProps & ApplicationState;

class TurnikeCheckComp extends Component<Props, TurnikeCheckState> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Turnike Geçiş",
            // headerLeft: (props: StackHeaderLeftButtonProps) => {
            //     return <HeaderBackButton {...props} label="Tamam" labelVisible={true} />
            // }
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            selectedActivities: {}
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <TurnikeCheckSelect onPress={async (adisyon: IActivity) => {
                    await this.props.ActivityOrderActions.setCheckItem(adisyon, null);
                    await this.props.ApplicationActions.setCurrent(Applications.Turnike);
                    await this.props.ApplicationActions.setNfcTitle("Turnike Geçiş Kontrol - " + adisyon.NAME);
                    this.props.navigation.navigate("Nfc");
                }} />
            </View>
        )
    }
}


export const TurnikeCheckScreen = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            ActivityOrderActions: bindActionCreators({ ...ActivityOrderActions }, dispatch),
            ApplicationActions: bindActionCreators({ ...ApplicationActions }, dispatch),
        };
    }
)(TurnikeCheckComp));

