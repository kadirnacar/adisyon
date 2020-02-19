import { colors } from '@components';
import { CustomerActions, ExchangeActions } from '@reducers';
import { ApplicationState } from '@store';
import React, { Component } from 'react';
import { Dimensions, GestureResponderEvent, Modal, StyleProp, Text, TouchableHighlight, View, ViewStyle } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const { width, scale, height } = Dimensions.get("window");

interface CustomerState {
    showExchange?: boolean;
}

interface CustomerProps {
    style?: StyleProp<ViewStyle>;
    total?: number;
    onPress?: (event: GestureResponderEvent) => void;
    ExchangeActions: typeof ExchangeActions;
}

type Props = NavigationInjectedProps & CustomerProps & ApplicationState;

class CustomerInfoComp extends Component<Props, CustomerState> {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <React.Fragment>
                <Modal visible={this.state.showExchange || false}
                    transparent={true}
                    onRequestClose={() => {

                    }}>
                    <View style={{
                        flex: 1,
                        width: "100%",
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        backgroundColor: "rgba(255,255,255,0.7)"
                    }}>
                        <View style={{
                            flex: 1,
                            alignContent: "center",
                            alignItems: "center",
                            alignSelf: "center",
                            width: "80%",
                            padding: 20,
                            marginHorizontal: 20,
                            borderRadius: 10,
                            backgroundColor: "#fff",
                            borderColor: colors.borderColor,
                            borderWidth: 2,
                        }}>

                            <View style={{
                                flexDirection: "column",
                                alignContent: "flex-start",
                                alignItems: "flex-start",
                                alignSelf: "flex-start",
                                width: "100%"
                            }}>
                                <View style={{
                                    flexDirection: "row",
                                    alignContent: "center",
                                    alignItems: "center",
                                    alignSelf: "center"
                                }} >
                                    <Text style={{ fontWeight: "bold" }}>Bakiye Bilgisi </Text>
                                </View>
                                {this.props.Exchange.items.map((ex, index) => {
                                    return <View key={index} style={{
                                        flexDirection: "row",
                                        alignContent: "flex-start",
                                        alignItems: "flex-start",
                                        alignSelf: "flex-start"
                                    }}>
                                        <Text>{ex.TOCUR} : </Text>
                                        <Text>{((this.props.Customer.current ? this.props.Customer.current.BALANCE : 0) * ex.RATE).toFixed(2)}</Text>
                                    </View>
                                })}
                            </View>
                            <View style={{
                                flexDirection: "column",
                                alignContent: "flex-start",
                                alignItems: "flex-start",
                                alignSelf: "flex-start",
                                width: "100%"
                            }}>
                                <View style={{
                                    flexDirection: "row",
                                    alignContent: "center",
                                    alignItems: "center",
                                    alignSelf: "center"
                                }} >
                                    <Text style={{ fontWeight: "bold" }}>Adisyon Tutarı </Text>
                                </View>
                                {this.props.Exchange.items.map((ex, index) => {
                                    return <View key={index} style={{
                                        flexDirection: "row",
                                        alignContent: "flex-start",
                                        alignItems: "flex-start",
                                        alignSelf: "flex-start"
                                    }}>
                                        <Text>{ex.TOCUR} : </Text>
                                        <Text>{((this.props.total ? this.props.total : 0) * ex.RATE).toFixed(2)}</Text>
                                    </View>
                                })}
                            </View>
                            <TouchableHighlight
                                underlayColor="#ffffff00" style={{
                                    width: "100%",

                                    backgroundColor: "#b329de",
                                    marginVertical: 10,
                                    borderRadius: 50,
                                    height: 50,
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    borderColor: "#b329de",
                                    borderWidth: 2,
                                    paddingVertical: 10,
                                    marginHorizontal: 5,
                                    padding: 10
                                }}
                                onPress={async () => {
                                    this.setState({ showExchange: false })
                                }}>
                                <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Tamam</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                <TouchableHighlight underlayColor="#ffffff00"
                    disabled={this.props.Customer.current == null}
                    onPressIn={this.props.onPress ? this.props.onPress.bind(this) : null}
                    style={[{
                        flex: 0,
                        width: width - 10,
                        height: 150,
                        flexDirection: "row",
                        backgroundColor: colors.transparentBackColor,
                        borderRadius: 10,
                        borderColor: colors.borderColor,
                        borderWidth: 2,
                        padding: 10,
                        marginHorizontal: 5
                    }, this.props.style]}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            <Text style={{ color: colors.borderColor, flexDirection: "row", width: "100%" }}>Misafir Adı</Text>
                            <Text style={{ width: "100%", fontWeight: "bold", fontSize: 18, color: colors.inputTextColor, flexDirection: "row" }}>
                                {this.props.Customer.current ? this.props.Customer.current.NAME + " " + this.props.Customer.current.SURNAME : null}
                            </Text>

                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{
                                width: "33%"
                            }}>
                                <Text style={{ color: colors.borderColor }}>Bakiye</Text>
                                <TouchableHighlight underlayColor="#ffffff00"
                                    onPress={() => {
                                        this.setState({ showExchange: true })
                                    }}>
                                    <Text style={{
                                        color: colors.borderColor,
                                        textDecorationLine: "underline"
                                    }}>
                                        {Intl.NumberFormat("TR", {
                                            style: "currency",
                                            currency: "TRL"
                                        }).format((this.props.Customer.current ? this.props.Customer.current.BALANCE : 0))}</Text>
                                </TouchableHighlight>
                            </View>
                            {this.props.total != null ?
                                <View style={{
                                    width: "33%",
                                    alignContent: "flex-end",
                                    alignItems: "flex-end",
                                    alignSelf: "flex-end"
                                }}>
                                    <Text style={{ color: colors.borderColor }}>Toplam Tutar</Text>
                                    <TouchableHighlight underlayColor="#ffffff00"
                                        onPress={() => {
                                            this.setState({ showExchange: true })
                                        }}>
                                        <Text style={{
                                            color: colors.borderColor,
                                            textDecorationLine: "underline"
                                        }}>{Intl.NumberFormat("TR", {
                                            style: "currency",
                                            currency: "TRL"
                                        }).format((this.props.total ? this.props.total : 0))}</Text>
                                    </TouchableHighlight>
                                </View> : null}
                            {this.props.total != null ?
                                <View style={{
                                    width: "33%",
                                    alignContent: "flex-end",
                                    alignItems: "flex-end",
                                    alignSelf: "flex-end"
                                }}>
                                    <Text style={{ color: colors.borderColor }}>Kalan</Text>
                                    <Text style={{ color: colors.inputTextColor }}>{Intl.NumberFormat("TR", {
                                        style: "currency",
                                        currency: "TRL"
                                    }).format((this.props.Customer.current ? this.props.Customer.current.BALANCE : 0) - (this.props.total ? this.props.total : 0))}</Text>
                                </View> : null}
                        </View>
                    </View>
                </TouchableHighlight>
            </React.Fragment>
        )
    }
}

export const CustomerInfo = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            CustomerActions: bindActionCreators({ ...CustomerActions }, dispatch),
            ExchangeActions: bindActionCreators({ ...ExchangeActions }, dispatch),
        };
    }
)(CustomerInfoComp)) as any;