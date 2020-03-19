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
    onAddPress?: (item: IActivityProduct) => void;
    onRemovePress?: (item: IActivityProduct) => void;
    onTextActive?: (item: IActivityProduct) => void;
    onShowExhange?: (fiyat: number) => void;

}

export class OrderItem extends Component<Props, any> {
    constructor(props) {
        super(props);
        this.state = {
            selectedSeance: null
        };
    }

    render() {
        const { item, activity } = this.props;
        const hasSeans = (activity && activity.Seances) //? (item && item.Quantity > 0) : false;
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
                        flex: 2,
                        flexDirection: "row"
                    }}>
                        <Text style={{ fontSize: 15, marginRight: 10 }}>{activity.NAME}</Text>
                        <TouchableHighlight
                            style={{
                                alignItems: "flex-end",
                                alignContent: "flex-end",
                                right: 0,
                            }}
                            underlayColor="#ffffff00"
                            onPress={() => {
                                if (this.props.onShowExhange)
                                    this.props.onShowExhange(activity.ADULTPRICE ? activity.ADULTPRICE : 0);
                            }}>
                            <NumberFormat
                                value={(activity.ADULTPRICE ? activity.ADULTPRICE : 0)}
                                displayType={"text"}
                                thousandSeparator={true}
                                decimalScale={2}
                                suffix=" ₺"
                                renderText={value => <Text style={{
                                    textDecorationLine: "underline",
                                    fontSize: 15,
                                }}>{value}</Text>}
                            />
                        </TouchableHighlight>
                    </View>
                    <View style={{
                        flex: 1,
                        alignSelf: "flex-end",
                        alignContent: "flex-end",
                        flexDirection: "row",

                    }}>
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
                                this.setState({})
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
                                this.setState({})
                            }}
                            onBlur={() => {
                                if (!item.Quantity && this.props.onRemovePress)
                                    this.props.onRemovePress(item)
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
                                borderRadius: 10,
                                width: 40
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
                                this.setState({})
                            }}>
                            <Icon name="plus" size={30} />
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    width: "100%",
                    flexWrap: "wrap"
                }}>

                    {hasSeans ? activity.Seances.sort((a, b) => {
                        if (a.SEANCESTART > b.SEANCESTART)
                            return 1;
                        else if (a.SEANCESTART < b.SEANCESTART)
                            return -1
                        else
                            return 0;
                    }).map((act, index) => {
                        return <TouchableHighlight key={index}
                            onPress={() => {
                                item.SeanceID = act.SEANCEID;
                                this.setState({})
                            }}
                            style={{
                                backgroundColor: item.SeanceID == act.SEANCEID ? colors.inputBackColor : "transparent",
                                margin: 3,
                                width: 70,
                                alignContent: "center",
                                alignItems: "center",
                                paddingHorizontal: 5,
                                paddingVertical: 3,
                                borderWidth: 1,
                                borderRadius: 6
                            }}>
                            <Text>{moment(act.SEANCESTART).format("HH:mm")}</Text>
                        </TouchableHighlight>
                    }) : null}
                </View>
            </View>
        )
    }
}


