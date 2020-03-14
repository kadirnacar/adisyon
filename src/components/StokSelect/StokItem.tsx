import { colors } from '@components';
import { IAdisyonProduct, IStok } from '@models';
import { ExchangeActions } from '@reducers';
import { ApplicationState } from '@store';
import React, { Component } from 'react';
import { Dimensions, Text, TextInput, TouchableHighlight, View, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { width, scale, height } = Dimensions.get("window");
interface StokItemState {
    showExchange?: boolean;
}
interface StokItemProps {
    item: IAdisyonProduct;
    stok: IStok;
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
        const { item, stok, discountRate } = this.props;
        const stokFiyat = this.props.Customer.current && stok && this.props.Customer.current.ALLINCLUSIVE == true && stok.INCLUDEDIN_AI == true ? 0 : stok.SFIYAT1;
        const fiyat = (stokFiyat - parseFloat((stokFiyat * (+discountRate / 100)).toFixed(2)));
        return (
            <View style={{
                flex: 1,
                borderBottomWidth: 1,
                paddingVertical: 5,
                paddingHorizontal: 5,
                marginVertical: 2,
                borderBottomColor: colors.borderColor,
                backgroundColor: stok.group ? stok.group.color : ""
            }}>
                {/* <Modal visible={this.state.showExchange || false}
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
                                    <Text style={{ fontWeight: "bold" }}>Fiyat Bilgisi </Text>
                                </View>
                                {this.props.Exchange.items.map((ex, index) => {
                                    return <View key={index} style={{
                                        flexDirection: "row",
                                        alignContent: "flex-start",
                                        alignItems: "flex-start",
                                        alignSelf: "flex-start"
                                    }}>
                                        <Text>{ex.TOCUR} : </Text>
                                        <Text>{(fiyat * ex.RATE).toFixed(2)}</Text>
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
                </Modal>*/}
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{
                        width: "60%"
                    }}>
                        <Text>{stok.ADI}</Text>
                        <TouchableHighlight underlayColor="#ffffff00"
                            onPress={() => {
                                // this.setState({ showExchange: true })
                                if (this.props.onShowExhange)
                                    this.props.onShowExhange(fiyat);
                            }}>
                            <Text style={{
                                color: "#000000",
                                textDecorationLine: "underline"
                            }}>{fiyat}</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{
                        width: "40%",
                        flexDirection: "row",
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
                            onPress={() => {
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
                            onPress={() => {
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

