import { ActivityCheckSelect, colors } from '@components';
import { IActivity, IActivityProduct, ISeance } from '@models';
import { ActivityOrderActions, ApplicationActions, Applications } from '@reducers';
import { ApplicationState } from '@store';
import 'intl';
import 'intl/locale-data/jsonp/tr';
import moment from 'moment';
import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
            headerRight: (props) => {
                return <TouchableHighlight
                    underlayColor="#ffffff00"
                    style={{
                        borderRadius: 40,
                        borderColor: colors.borderColor,
                        borderWidth: 2,
                        padding: 5,
                        marginRight: 5
                    }}
                    onPressIn={() => {
                        navigation.navigate("CustomerTrans", { current: true });
                    }}>
                    <FontAwesome5Icon name="user" size={25} color={"#fff"} />
                </TouchableHighlight>
            }
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
                    if (seance)
                        await this.props.ApplicationActions.setNfcTitle("Aktivite Geçiş Kontrol - " + adisyon.NAME + " - " + moment(seance.SEANCESTART).format("HH:mm"));
                    else
                        await this.props.ApplicationActions.setNfcTitle("Aktivite Geçiş Kontrol - " + adisyon.NAME);
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

