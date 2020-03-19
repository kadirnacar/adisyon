import { colors } from '@components';
import { IAdisyonProduct, IStok, IDepartment } from '@models';
import { ExchangeActions } from '@reducers';
import { ApplicationState } from '@store';
import React, { Component } from 'react';
import { Dimensions, Text, TextInput, TouchableHighlight, View, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NumberFormat from 'react-number-format';

const { width, scale, height } = Dimensions.get("window");
interface StokItemState {
    showExchange?: boolean;
}
interface StokItemProps {
    item: IAdisyonProduct;
    stok: IStok;
    addable?: boolean;
    isFree: boolean;
    freeQuantity?: number;
    department: IDepartment;
    discountRate: number;
    onAddPress?: (item: IAdisyonProduct) => void;
    onRemovePress?: (item: IAdisyonProduct) => void;
    onTextActive?: (item: IAdisyonProduct) => void;
    onShowExhange?: (fiyat: number) => void;
    ExchangeActions: typeof ExchangeActions;
}
type Props = StokItemProps & ApplicationState;

export class StokItemComp extends Component<Props, StokItemState> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { item, stok, isFree, discountRate, department } = this.props;
        const stokFiyat = this.props.Customer.current && stok && this.props.Customer.current.ALLINCLUSIVE == true && stok.INCLUDEDIN_AI == true && department.AIENABLED == true ? 0 : stok.SFIYAT1;
        const fiyat = isFree == true ? 0 : (stokFiyat - parseFloat((stokFiyat * (+discountRate / 100)).toFixed(2)));
        return (
            <View style={{
                flex: 1,
                borderBottomWidth: 1,
                paddingVertical: 5,
                paddingHorizontal: 5,
                marginVertical: 2,
                borderBottomColor: colors.borderColor,
                backgroundColor: stok.group ? stok.group.color : "",
            }}>
                <View style={{
                    flexDirection: "row",
                    alignContent: "flex-end"
                }}>
                    <Text style={{
                        flex: 1,
                        flexDirection: "row",
                        fontSize: 15,
                        alignSelf: "flex-start",
                        alignItems: "flex-start",
                        alignContent: "flex-start",
                    }}>{stok.ADI}</Text>
                    <TouchableHighlight
                        style={{
                            alignSelf: "flex-end",
                            alignItems: "flex-end",
                            alignContent: "flex-end",
                            right: 0,
                            width: 50
                        }}
                        underlayColor="#ffffff00"
                        onPress={() => {
                            if (this.props.onShowExhange)
                                this.props.onShowExhange(fiyat);
                        }}>
                        <NumberFormat
                            value={fiyat}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix=" ₺"
                            renderText={value => <Text style={{
                                textDecorationLine: "underline",
                                fontSize: 15,
                            }}>{value}</Text>}
                        />
                    </TouchableHighlight>
                </View>
                {this.props.addable ?
                    <View style={{
                        flex: 1,
                        marginTop: 5,
                        flexDirection: "row",
                        alignContent: "flex-end",
                        alignItems: "flex-end",
                        alignSelf: "flex-end"
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
                            onPress={() => {
                                if (this.props.onRemovePress)
                                    this.props.onRemovePress(item);
                                this.setState({})
                            }}
                        >
                            <Icon name="minus" size={30} />
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
                                paddingHorizontal: 5,
                                textAlign: "center",
                                fontSize: 16,
                                borderRadius: 10,
                                minWidth: 75
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
                            onPress={() => {
                                if (this.props.onAddPress)
                                    this.props.onAddPress(item);
                                this.setState({})
                            }}>
                            <Icon name="plus" size={30} style={{
                                alignSelf: "center",
                                alignItems: "center",
                                alignContent: "center"
                            }} />
                        </TouchableHighlight>
                    </View>
                    : null}
                <View style={{
                }}>
                    {item && item.QUANTITY > 0 ?
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
                                backgroundColor: "#ffffff",
                                borderColor: colors.inputBackColor,
                                borderWidth: 1,
                                paddingVertical: 1,
                                marginTop: 5,
                                marginBottom: 0
                            }}
                            placeholder="Not" /> : null}
                </View>
            </View>
        )
    }
}
export const StokItem = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            ExchangeActions: bindActionCreators({ ...ExchangeActions }, dispatch),
        };
    }
)(StokItemComp)) as any;

