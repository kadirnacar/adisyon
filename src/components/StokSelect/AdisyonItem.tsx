import { colors } from '@components';
import { IAdisyonProduct, ICustomer, IStok } from '@models';
import React, { Component } from 'react';
import { Text, TextInput, TouchableHighlight, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
    item: IAdisyonProduct;
    stok: IStok;
    customer: ICustomer;
    onAddPress?: (item: IAdisyonProduct, change?: boolean) => void;
    onRemovePress?: (item: IAdisyonProduct) => void;
    discountRate: number;
}

export class AdisyonItem extends Component<Props, any> {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        };
    }

    render() {
        const { item, stok, customer, discountRate } = this.props;
        const stokFiyat = customer && stok && customer.ALLINCLUSIVE == true && stok.INCLUDEDIN_AI == true ? 0 : stok.SFIYAT1;
        const fiyat = (parseFloat((stokFiyat - (stokFiyat * (discountRate / 100))).toFixed(2)) * item.QUANTITY).toFixed(2);

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
                            style={{ flexDirection: "row" }}
                            onPressIn={() => this.setState({ collapsed: !this.state.collapsed })}>
                            <React.Fragment>
                                <Icon style={{
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
                                    name={this.state.collapsed ? "angle-down" : "angle-up"} size={15} />
                                <Text>{stok.ADI}</Text>
                            </React.Fragment>
                        </TouchableHighlight>
                    </View>
                    <View style={{
                        width: "30%",
                        flexDirection: "row"
                    }}>
                        {!this.props.item.OLD ?
                            <React.Fragment>
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
                                    value={item.QUANTITY != null ? item.QUANTITY.toString() : ""}
                                    keyboardType="numeric"
                                    onChangeText={text => {
                                        const quantity = parseFloat(text);
                                        if (!isNaN(quantity)) {
                                            item.QUANTITY = quantity;
                                        } else {
                                            item.QUANTITY = null;
                                        }
                                        if (this.props.onRemovePress)
                                            this.props.onAddPress(item, true);
                                        this.setState({});
                                    }}
                                    onBlur={() => {
                                        if (!item.QUANTITY && this.props.onRemovePress)
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
                                </TouchableHighlight></React.Fragment>
                            : <Text>{item.QUANTITY}</Text>}
                    </View>
                    <View style={{ width: "20%" }}>
                        <Text style={{ textAlign: "right", width: "100%" }}>
                            {fiyat}</Text>
                    </View>
                </View>
                <Collapsible
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
                </Collapsible>
            </View>
        )
    }
}


