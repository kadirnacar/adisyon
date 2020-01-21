import { colors } from '@components';
import { IAdisyonProduct, IStok } from '@models';
import React, { Component } from 'react';
import { Dimensions, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width, scale, height } = Dimensions.get("window");

interface Props {
    item: IStok;
    selectedStoks?: { [key: number]: IAdisyonProduct };
    onAddPress?: (stokId: number) => void;
    onRemovePress?: (stokId: number) => void;
}

export class StokItem extends Component<Props, any> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { item } = this.props;
        const stok = this.props.selectedStoks[item.STOKID];

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
                        width: "63%"
                    }}>
                        <Text>{item.ADI}    ({item.SFIYAT1.toFixed(2)})</Text>
                    </View>
                    <View style={{
                        width: "37%",
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
                                    this.props.onRemovePress(item.STOKID);
                                this.setState({})
                            }}
                        >
                            <Icon name="minus" size={25} />
                        </TouchableHighlight>
                        <Text style={{
                            width: 28,
                            alignSelf: "center",
                            alignItems: "center",
                            textAlign: "center",
                            fontSize: 18,
                            fontWeight: "bold"
                        }}>
                            {stok ? stok.QUANTITY : 0}
                        </Text>
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
                                    this.props.onAddPress(item.STOKID);
                                this.setState({})
                            }}>
                            <Icon name="plus" size={25} />
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={{
                }}>
                    <TextInput
                        value={this.props.selectedStoks[item.STOKID] ? this.props.selectedStoks[item.STOKID].DESC : ""}
                        editable={this.props.selectedStoks[item.STOKID] && this.props.selectedStoks[item.STOKID].QUANTITY > 0 ? true : false}
                        onChangeText={(text) => {
                            this.props.selectedStoks[item.STOKID].DESC = text;
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


