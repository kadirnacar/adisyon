import { colors } from '@components';
import { IActivity, IActivityProduct } from '@models';
import moment from 'moment';
import React, { Component } from 'react';
import { Dimensions, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width, scale, height } = Dimensions.get("window");

interface Props {
    item: IActivityProduct;
    activity: IActivity;
    onAddPress?: (item: IActivityProduct) => void;
    onRemovePress?: (item: IActivityProduct) => void;
    onTextActive?: (item: IActivityProduct) => void;
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
                            {(activity.ADULTPRICE ? activity.ADULTPRICE : 0).toFixed(2)})</Text>
                    </View>
                    <View style={{
                        width: "40%",
                        flexDirection: "row",

                    }}>
                        <TouchableHighlight underlayColor="#ffffff00"
                            activeOpacity={1}
                            disabled={item.SeanceID == null}
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
                            value={item.Quantity != null ? item.Quantity.toString() : ""}
                            keyboardType="numeric"
                            editable={item.SeanceID != null}
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
                            disabled={item.SeanceID == null}
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
                    flex: 1,
                    flexDirection: "row",
                    width: "100%",
                    flexWrap: "wrap"
                }}>

                    {activity.Seances.sort((a, b) => {
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
                    })}
                </View>
            </View>
        )
    }
}


