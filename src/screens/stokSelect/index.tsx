import { StokSelect } from '@components';
import { IAdisyonProduct } from '@models';
import { AdisyonActions } from '@reducers';
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

interface StokSelectState {
    selectedStoks?: { [key: number]: IAdisyonProduct };
}

interface StokSelectProps {
    AdisyonActions: typeof AdisyonActions
}

type Props = NavigationInjectedProps & StokSelectProps & ApplicationState;

class StokSelectComp extends Component<Props, StokSelectState> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Sipariş",
            headerLeft: (props: StackHeaderLeftButtonProps) => {
                return <HeaderBackButton {...props} label="Tamam" labelVisible={true} />
            }
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            selectedStoks: {}
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <StokSelect adisyon={this.props.Adisyon.current} onPress={(data) => {
                    this.setState({ selectedStoks: data });
                }} />
            </View>
        )
    }
}


export const StokSelectScreen = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            AdisyonActions: bindActionCreators({ ...AdisyonActions }, dispatch),
        };
    }
)(StokSelectComp));

