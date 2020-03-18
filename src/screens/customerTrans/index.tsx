import { colors } from '@components';
import { ICustomerTrans } from '@models';
import { ActivityOrderActions, AdisyonActions, ApplicationActions, Applications, CustomerActions } from '@reducers';
import { ApplicationState } from '@store';
import moment from 'moment';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { FlatList, NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const { height, width } = Dimensions.get("window");

interface CustomerTransState {
    selectedItem: ICustomerTrans;
}

interface CustomerTransProps {
    CustomerActions: typeof CustomerActions,
    ApplicationActions: typeof ApplicationActions,
    ActivityOrderActions: typeof ActivityOrderActions,
    AdisyonActions: typeof AdisyonActions,
}

type Props = NavigationInjectedProps & CustomerTransProps & ApplicationState;

class CustomerTransScreen extends Component<Props, CustomerTransState> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Misafir İşlem Geçmişi",
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null
        }
    }

    async UNSAFE_componentWillMount() {
        if (!this.props.Customer.current || this.props.navigation.getParam("current")) {
            await this.props.ApplicationActions.setCurrent(Applications.CustomerInfo);
            await this.props.ApplicationActions.setNfcTitle("Misafir İşlem Geçmişi");

            this.props.navigation.navigate("Nfc");
        } else if (!this.props.Customer.currentTrans) {
            // this.props.CustomerActions.getTrans(this.props.Customer.current.GUESTNO);
        }
    }
    componentDidMount() {
    }
    render() {
        const { container } = styles;
        return (
            this.props.Customer.current ?
                <SafeAreaView style={container}>
                    <View style={{ borderWidth: 2 }}>
                        <Text>{this.props.Customer.current.NAME}</Text>
                        <Text>{this.props.Customer.current.SURNAME}</Text>
                    </View>
                    <View style={{

                    }}>
                        <FlatList
                            data={this.props.Customer.currentTrans ? this.props.Customer.currentTrans.sort((a, b) => {
                                if (a.DATE > b.DATE)
                                    return -1;
                                else if (a.DATE < b.DATE)
                                    return 1;
                                else
                                    if (a.TIME > b.TIME)
                                        return -1;
                                    else if (a.TIME < b.TIME)
                                        return 1;
                                    else
                                        return 0;
                            }) : []}
                            style={{ height: height - 160 }}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ borderBottomWidth: 1, flex: 1, flexDirection: "row" }}>
                                        <View style={{ borderWidth: 0, flexDirection: "column", flex: 1 }}>

                                            <Text>{item.LOCATION}</Text>
                                            <Text>{item.PRODUCT}</Text>
                                        </View>
                                        <View style={{ borderWidth: 0, flexDirection: "column", flex: 1 }}>
                                            <View style={{ borderWidth: 0, flexWrap: "nowrap", alignContent: "flex-end", alignItems: "flex-end", alignSelf: "flex-end" }}>
                                                <Text>{moment.utc(item.DATE).local().format("DD.MM.YYYY")} {moment.utc(item.TIME).local().format("HH:mm")}</Text>
                                            </View>
                                            <View style={{
                                                borderWidth: 0,
                                                marginTop: 2,
                                                flexDirection: "row",
                                                alignContent: "flex-end",
                                                alignItems: "flex-end",
                                                alignSelf: "flex-end",
                                                flexWrap: "nowrap",
                                                justifyContent: "flex-end"
                                            }}>
                                                <Text style={{}}>{item.AMOUNT} x {item.CTOTAL.toFixed(2)} = {(item.CTOTAL * item.AMOUNT).toFixed(2)}</Text>
                                                <FontAwesome5Icon name="lira-sign" size={14} style={{
                                                    marginLeft: 3,
                                                    alignSelf: "baseline"
                                                }} />
                                            </View>
                                        </View>
                                    </View>
                                )
                            }}
                            numColumns={1}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View style={{ position: "absolute", bottom: 10, width: width }}>
                        <TouchableHighlight underlayColor="#ffffff00"
                            style={{
                                width: width - 20,
                                alignItems: "center",
                                alignSelf: "center",
                                alignContent: "center",
                                justifyContent: "center",
                                marginHorizontal: 10,
                                height: 50,
                                borderColor: colors.borderColor,
                                backgroundColor: "#51bdec",
                                borderRadius: 25
                            }}
                            onPressIn={async () => {
                                // await this.props.CustomerActions.clear();
                                // await this.props.AdisyonActions.setCurrent(null);
                                // await this.props.ActivityOrderActions.setCurrent(null);
                                this.props.navigation.goBack();
                            }}
                        >
                            <Text style={{ color: colors.buttonTextColor, fontSize: 18, fontWeight: "bold" }}>Tamam</Text>
                        </TouchableHighlight>
                    </View>
                </SafeAreaView> : null
        )
    }
}

export const CustomerTrans = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            CustomerTransActions: bindActionCreators({ ...CustomerActions }, dispatch),
            ApplicationActions: bindActionCreators({ ...ApplicationActions }, dispatch),
            AdisyonActions: bindActionCreators({ ...AdisyonActions }, dispatch),
            ActivityOrderActions: bindActionCreators({ ...ActivityOrderActions }, dispatch),
        };
    }
)(CustomerTransScreen));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    content: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: 5,
        backgroundColor: colors.transparentBackColor,
        margin: 2,
        height: 100,
    },
    formContainer: {
        flex: 1,
        marginBottom: 5,
        justifyContent: 'flex-end',
    }
});