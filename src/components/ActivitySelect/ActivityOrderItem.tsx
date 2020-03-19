import { colors } from '@components';
import { IActivity, IActivityProduct } from '@models';
import moment from 'moment';
import React, { Component } from 'react';
import { Dimensions, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NumberFormat from 'react-number-format';

const { width, scale, height } = Dimensions.get("window");

interface Props {
    item: IActivityProduct;
    activity: IActivity;
    onAddPress?: (item: IActivityProduct, change?: boolean) => void;
    onRemovePress?: (item: IActivityProduct) => void;
}

export class ActivityOrderItem extends Component<Props, any> {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        };
    }

    render() {
        const { item, activity } = this.props;
        const seance = activity.Seances ? activity.Seances.find(a => a.SEANCEID == item.SeanceID) : null;
        return (
            <View style={{
                flex: 1,
                borderBottomWidth: 1,
                paddingVertical: 5,
                paddingHorizontal: 5,
                marginVertical: 2,
                borderBottomColor: colors.borderColor,
            }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{
                        flex: 2
                    }}>
                        <TouchableHighlight underlayColor="#ffffff00"
                            style={{}}
                            onPressIn={() => this.setState({ collapsed: !this.state.collapsed })}>
                            <React.Fragment>
                                <Text style={{ fontSize: 16 }}>{activity.NAME}</Text>
                                <Text style={{ fontSize: 16 }}>{seance ? moment(seance.SEANCESTART).format("HH:mm") : ""}</Text>
                            </React.Fragment>
                        </TouchableHighlight>
                    </View>
                    <View style={{
                        flex: 1
                    }}>
                        <View style={{ flex: 1, flexDirection: "row", marginBottom: 3, alignSelf: "flex-end" }}>
                            <NumberFormat
                                value={((activity.ADULTPRICE ? activity.ADULTPRICE : 0) * item.Quantity).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix="₺"
                                renderText={value => <Text style={{
                                    textDecorationLine: "underline",
                                    fontSize: 18
                                }}>{value}</Text>}
                            />
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", marginBottom: 3, alignSelf: "flex-end" }}>
                            <TouchableHighlight underlayColor="#ffffff00"
                                activeOpacity={1}
                                style={{
                                    width: 35,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    backgroundColor: colors.transparentBackColor,
                                    borderColor: colors.inputTextColor,
                                    height: 35,
                                    alignSelf: "center",
                                    alignItems: "center",
                                    alignContent: "center"
                                }}
                                onPressIn={() => {
                                    if (this.props.onRemovePress)
                                        this.props.onRemovePress(item);
                                    this.setState({});
                                }}
                            >
                                <Icon name="minus" size={30} />
                            </TouchableHighlight>
                            <TextInput
                                value={item.Quantity != null ? item.Quantity.toString() : ""}
                                keyboardType="numeric"
                                onChangeText={text => {
                                    const quantity = parseFloat(text);
                                    if (!isNaN(quantity)) {
                                        item.Quantity = quantity;
                                    } else {
                                        item.Quantity = null;
                                    }
                                    if (this.props.onRemovePress)
                                        this.props.onAddPress(item, true);
                                    this.setState({});
                                }}
                                onBlur={() => {
                                    if (!item.Quantity && this.props.onRemovePress)
                                        this.props.onRemovePress(item);
                                    this.setState({})
                                }}
                                style={{
                                    color: colors.inputTextColor,
                                    backgroundColor: "#fff",
                                    borderColor: colors.borderColor,
                                    borderWidth: 1,
                                    paddingVertical: 2,
                                    marginHorizontal: 2,
                                    paddingHorizontal: 5,
                                    textAlign: "center",
                                    fontSize: 16,

                                    height: 35,
                                    alignSelf: "baseline",
                                    borderRadius: 10,
                                    minWidth: 40
                                }} />

                            <TouchableHighlight underlayColor="#ffffff00"
                                activeOpacity={1}
                                style={{
                                    width: 35,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    backgroundColor: colors.transparentBackColor,
                                    borderColor: colors.inputTextColor,
                                    height: 35,
                                    alignSelf: "center",
                                    alignItems: "center",
                                    alignContent: "center"
                                }}
                                onPressIn={() => {
                                    if (this.props.onAddPress)
                                        this.props.onAddPress(item);
                                    this.setState({});
                                }}>
                                <Icon name="plus" size={30} />
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                {/* <Collapsible
                    collapsed={this.state.collapsed}>
                    <View style={{
                    }}>
                        <TextInput
                            value={item ? item.DESC : ""}
                            editable={item && item.QUANTITY > 0 ? true : false}
                            onChangeText={(text) => {
                                item.DESC = text;
                                this.setState({});
                            }}
                            style={{
                                width: "100%",
                                borderColor: colors.inputBackColor,
                                borderWidth: 1,
                                paddingVertical: 1,
                                marginTop: 5,
                                marginBottom: 0
                            }}
                            placeholder="Not" />
                    </View>
                </Collapsible> */}
            </View>
        )
    }
}


