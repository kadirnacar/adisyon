import { ActivityCheckSelect } from '@components';
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

interface ActivityCheckState {
    selectedActivities?: { [key: number]: IActivityProduct };
}

interface ActivityCheckProps {
    ActivityOrderActions: typeof ActivityOrderActions;
    ApplicationActions: typeof ApplicationActions;
}

type Props = NavigationInjectedProps & ActivityCheckProps & ApplicationState;

class ActivityCheckComp extends Component<Props, ActivityCheckState> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Aktivite",
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
                <ActivityCheckSelect order={this.props.ActivityOrder.current} onPress={async (adisyon: IActivity, seance: ISeance) => {
                    await this.props.ActivityOrderActions.setCheckItem(adisyon, seance);
                    await this.props.ApplicationActions.setCurrent(Applications.AktiviteKontrol);
                    await this.props.ApplicationActions.setNfcTitle("Aktivite Geçiş Kontrol - " + adisyon.NAME + " - " + moment(seance.SEANCESTART).format("HH:mm"));
                    this.props.navigation.navigate("Nfc");
                }} />
            </View>
        )
    }
}


export const ActivityCheckScreen = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            ActivityOrderActions: bindActionCreators({ ...ActivityOrderActions }, dispatch),
            ApplicationActions: bindActionCreators({ ...ApplicationActions }, dispatch),
        };
    }
)(ActivityCheckComp));

