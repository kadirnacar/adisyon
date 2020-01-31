import { colors } from '@components';
import { IAdisyonProduct, IStok, ICustomer } from '@models';
import React, { Component } from 'react';
import { Dimensions, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width, scale, height } = Dimensions.get("window");

interface Props {
    item: IAdisyonProduct;
    stok: IStok;
    discountRate:number;
    onAddPress?: (item: IAdisyonProduct) => void;
    onRemovePress?: (item: IAdisyonProduct) => void;
    onTextActive?: (item: IAdisyonProduct) => void;
}

export class StokItem extends Component<Props, any> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { item, stok , discountRate } = this.props;

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
                        <Text>{stok.ADI}    (
                            {stok.SFIYAT1- parseFloat((stok.SFIYAT1*(+discountRate/100)).toFixed(2))})</Text>
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
                    <TextInput
                        value={item ? item.DESC : ""}
                        editable={item && item.QUANTITY > 0 ? true : false}
                        onChangeText={(text) => {
                            item.DESC = text;
                            this.setState({});
                        }}
                        onFocus={() => {
                            if (this.props.onTextActive)
                                this.props.onTextActive(item);
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
            </View>
        )
    }
}


