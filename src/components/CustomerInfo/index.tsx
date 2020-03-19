import { colors } from '@components';
import { CustomerActions, ExchangeActions } from '@reducers';
import { ApplicationState } from '@store';
import React, { Component } from 'react';
import { Dimensions, GestureResponderEvent, Modal, StyleProp, Text, TouchableHighlight, View, ViewStyle } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import NumberFormat from 'react-number-format';
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
                                        <NumberFormat
                                            value={((this.props.Customer.current ? this.props.Customer.current.BALANCE : 0) * ex.RATE)}
                                            displayType={"text"}
                                            decimalScale={2}
                                            thousandSeparator={true}
                                            renderText={value => <Text style={{
                                            }}>{value}</Text>}
                                        />
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
                                        <NumberFormat
                                            value={((this.props.total ? this.props.total : 0) * ex.RATE)}
                                            displayType={"text"}
                                            decimalScale={2}
                                            thousandSeparator={true}
                                            renderText={value => <Text style={{
                                            }}>{value}</Text>}
                                        />
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
                                    <Text style={{ fontWeight: "bold" }}>Kalan Bakiye </Text>
                                </View>
                                {this.props.Exchange.items.map((ex, index) => {
                                    return <View key={index} style={{
                                        flexDirection: "row",
                                        alignContent: "flex-start",
                                        alignItems: "flex-start",
                                        alignSelf: "flex-start"
                                    }}>
                                        <Text>{ex.TOCUR} : </Text>
                                        <NumberFormat
                                            value={(((this.props.Customer.current ? this.props.Customer.current.BALANCE : 0) - (this.props.total ? this.props.total : 0)) * ex.RATE)}
                                            displayType={"text"}
                                            decimalScale={2}
                                            thousandSeparator={true}
                                            renderText={value => <Text style={{
                                            }}>{value}</Text>}
                                        />
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
                        height: 170,
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
                            <Text style={{ fontSize: 18, color: colors.borderColor, flexDirection: "row", width: "100%" }}>Misafir Adı</Text>
                            <Text style={{ fontSize: 18, width: "100%", fontWeight: "bold", color: colors.inputTextColor, flexDirection: "row" }}>
                                {this.props.Customer.current ? this.props.Customer.current.NAME + " " + this.props.Customer.current.SURNAME : null}
                            </Text>
                            <View style={{
                                position: "absolute",
                                right: 0,
                                zIndex: 99,
                                alignContent: "flex-end",
                                alignItems: "flex-end",
                            }}>
                                <Text style={{ fontSize: 18, color: colors.borderColor }}>Bakiye</Text>

                                <TouchableHighlight underlayColor="#ffffff00"
                                    onPress={() => {
                                        this.setState({ showExchange: true })
                                    }}>
                                    <NumberFormat
                                        value={(this.props.Customer.current && this.props.Customer.current.BALANCE ? this.props.Customer.current.BALANCE : 0)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        decimalScale={2}
                                        suffix=" ₺"
                                        renderText={value => <Text style={{
                                            textDecorationLine: "underline",
                                            fontSize: 18
                                        }}>{value}</Text>}
                                    />
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row" }}>

                            {this.props.total != null ?
                                <View style={{
                                    flex: 1,
                                    alignContent: "flex-end",
                                    alignItems: "flex-end",
                                }}>
                                    <Text style={{
                                        color: colors.borderColor,
                                        fontSize: 18
                                    }}>Toplam Tutar</Text>
                                    <TouchableHighlight underlayColor="#ffffff00"
                                        onPress={() => {
                                            this.setState({ showExchange: true })
                                        }}>
                                        <NumberFormat
                                            value={(this.props.total ? this.props.total : 0)}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            decimalScale={2}
                                            suffix=" ₺"
                                            renderText={value => <Text style={{
                                                textDecorationLine: "underline",
                                                fontSize: 18
                                            }}>{value}</Text>}
                                        />
                                    </TouchableHighlight>
                                </View> : null}
                            {this.props.total != null ?
                                <View style={{
                                    flex: 1,
                                    alignContent: "flex-end",
                                    alignItems: "flex-end",
                                }}>
                                    <Text style={{
                                        color: colors.borderColor,
                                        fontSize: 18
                                    }}>Kalan</Text>
                                    <TouchableHighlight underlayColor="#ffffff00"
                                        onPress={() => {
                                            this.setState({ showExchange: true })
                                        }}>
                                        <NumberFormat
                                            value={((this.props.Customer.current ? this.props.Customer.current.BALANCE : 0) - (this.props.total ? this.props.total : 0))}
                                            displayType={"text"}
                                            decimalScale={2}
                                            thousandSeparator={true}
                                            suffix=" ₺"
                                            renderText={value => <Text style={{
                                                textDecorationLine: "underline",
                                                fontSize: 18
                                            }}>{value}</Text>}
                                        />
                                    </TouchableHighlight>
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