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
                        width: "50%"
                    }}>
                        <TouchableHighlight underlayColor="#ffffff00"
                            style={{  }}
                            onPressIn={() => this.setState({ collapsed: !this.state.collapsed })}>
                            <React.Fragment>
                                {/* <Icon style={{
                                    borderWidth: 1,
                                    alignContent: "center",
                                    alignSelf: "center",
                                    alignItems: "center",
                                    textAlign: "center",
                                    padding: 3,
                                    height: 20,
                                    marginRight: 5,
                                    borderRadius: 20,
                                    width: 20
                                }}
                                    name={this.state.collapsed ? "angle-down" : "angle-up"} size={15} /> */}
                                <Text>{activity.NAME}</Text>
                                <Text>{seance ? moment(seance.SEANCESTART).format("HH:mm") : ""}</Text>
                            </React.Fragment>
                        </TouchableHighlight>
                    </View>
                    <View style={{
                        width: "30%",
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
                                this.setState({});
                            }}
                        >
                            <Icon name="minus" size={25} />
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
                                marginTop: 2,
                                paddingHorizontal: 10,
                                textAlign: "center",
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
                                this.setState({});
                            }}>
                            <Icon name="plus" size={25} />
                        </TouchableHighlight>
                    </View>
                    <View style={{ width: "20%" }}>
                        <Text style={{ textAlign: "right", width: "100%" }}>
                            {((activity.ADULTPRICE ? activity.ADULTPRICE : 0) * item.Quantity).toFixed(2)}</Text>
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


