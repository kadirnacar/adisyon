import { colors, StokSelect } from '@components';
import { IAdisyonProduct } from '@models';
import { AdisyonActions } from '@reducers';
import { ApplicationState } from '@store';
import 'intl';
import 'intl/locale-data/jsonp/tr';
import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { HeaderBackButton, StackHeaderLeftButtonProps } from 'react-navigation-stack';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const { width, scale, height } = Dimensions.get("window");

interface StokSelectState {
    selectedStoks?: { [key: number]: IAdisyonProduct };
    showBarcode?: boolean;
}

interface StokSelectProps {
    AdisyonActions: typeof AdisyonActions
}

type Props = NavigationInjectedProps & StokSelectProps & ApplicationState;

class StokSelectComp extends Component<Props, StokSelectState> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "F&B",
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
            },
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
    showBarcode() {
        this.setState({ showBarcode: true })
    }
    componentDidMount() {
    }
    render() {
        return (
            <View style={{ flex: 1 }} >

                <StokSelect adisyon={this.props.Adisyon.current} onlyList={this.props.navigation.state.params.current} onPress={(data) => {
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

