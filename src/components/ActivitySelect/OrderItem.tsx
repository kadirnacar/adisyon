import { colors } from '@components';
import { IActivityProduct, IActivity, ICustomer } from '@models';
import React, { Component } from 'react';
import { Dimensions, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

const { width, scale, height } = Dimensions.get("window");

interface Props {
    item: IActivityProduct;
    activity: IActivity;
    discountRate: number;
    onAddPress?: (item: IActivityProduct) => void;
    onRemovePress?: (item: IActivityProduct) => void;
    onTextActive?: (item: IActivityProduct) => void;
}

export class OrderItem extends Component<Props, any> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { item, activity, discountRate } = this.props;

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
                        width: "60%"
                    }}>
                        <Text>{activity.NAME}    (
                            {activity.ADULTPRICE - parseFloat((activity.ADULTPRICE * (+discountRate / 100)).toFixed(2))})</Text>
                    </View>
                    <View style={{
                        width: "40%",
                        flexDirection: "row"
                    }}>
                        <TouchableHighlight underlayColor="#ffffff00"
                            activeOpacity={1}
                            style={{
                                width: 30,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: colors.inputBackColor,
                                height: 30,
                                alignSelf: "center",
                                alignItems: "center"
                            }}
                            onPressIn={() => {
                                if (this.props.onRemovePress)
                                    this.props.onRemovePress(item);
                                this.setState({})
                            }}
                        >
                            <Icon name="minus" size={25} />
                        </TouchableHighlight>
                        <TextInput
                            value={item.QUANTITY != null ? item.QUANTITY.toString() : ""}
                            keyboardType="numeric"
                            onChangeText={text => {
                                const quantity = parseFloat(text);
                                if (!isNaN(quantity)) {
                                    item.QUANTITY = quantity;
                                } else {
                                    item.QUANTITY = null;
                                }
                                this.setState({})
                            }}
                            onBlur={() => {
                                if (!item.QUANTITY && this.props.onRemovePress)
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
                                marginTop: 2,
                                paddingHorizontal: 5,
                                height: 35,
                                textAlign: "center",
                                alignSelf: "center",
                                alignItems: "center",
                                fontSize: 14,
                                borderRadius: 20
                            }} />
                        {/* <Text style={{
                            width: 28,
                            alignSelf: "center",
                            alignItems: "center",
                            textAlign: "center",
                            fontSize: 18,
                            fontWeight: "bold"
                        }}>
                            {item ? item.QUANTITY : 0}
                        </Text> */}
                        <TouchableHighlight underlayColor="#ffffff00"
                            activeOpacity={1}
                            style={{
                                width: 30,
                                borderRadius: 10,
                                borderColor: colors.inputBackColor,
                                borderWidth: 1,
                                height: 30,
                                alignSelf: "center",
                                alignItems: "center"
                            }}
                            onPressIn={() => {
                                if (this.props.onAddPress)
                                    this.props.onAddPress(item);
                                this.setState({})
                            }}>
                            <Icon name="plus" size={25} />
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={{
                }}>

                    {activity.Seances.map((act, index) => {
                        return <Text key={index}>{moment(act.SEANCESTART).format("HH:mm")}</Text>
                    })}
                </View>
            </View>
        )
    }
}


