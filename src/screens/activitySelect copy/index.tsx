import { ActivitySelect } from '@components';
import { IActivityProduct } from '@models';
import { ActivityOrderActions } from '@reducers';
import { ApplicationState } from '@store';
import 'intl';
import 'intl/locale-data/jsonp/tr';
import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { HeaderBackButton, StackHeaderLeftButtonProps } from 'react-navigation-stack';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const { width, scale, height } = Dimensions.get("window");

interface ActivitySelectState {
    selectedActivities?: { [key: number]: IActivityProduct };
}

interface ActivitySelectProps {
    ActivityOrderActions: typeof ActivityOrderActions
}

type Props = NavigationInjectedProps & ActivitySelectProps & ApplicationState;

class ActivitySelectComp extends Component<Props, ActivitySelectState> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Aktivite",
            headerLeft: (props: StackHeaderLeftButtonProps) => {
                return <HeaderBackButton {...props} label="Tamam" labelVisible={true} />
            }
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
                <ActivitySelect order={this.props.ActivityOrder.current} onPress={(data) => {
                    this.setState({ selectedActivities: data });
                }} />
            </View>
        )
    }
}


export const ActivitySelectScreen = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            ActivityOrderActions: bindActionCreators({ ...ActivityOrderActions }, dispatch),
        };
    }
)(ActivitySelectComp));

