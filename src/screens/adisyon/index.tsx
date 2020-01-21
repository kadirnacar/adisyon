import { colors, CustomerInfo, StokSelect, StokItem, AdisyonItem } from '@components';
import { AdisyonActions } from '@reducers';
import { ApplicationState } from '@store';
import 'intl';
import 'intl/locale-data/jsonp/tr';
import React, { Component } from 'react';
import { Alert, Dimensions, Image, ImageBackground, Modal, Picker, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FlatList, NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IAdisyonProduct } from '@models';
const { width, scale, height } = Dimensions.get("window");

interface AdisyonState {
    modalVisible: boolean;
    selectedStoks?: { [key: number]: IAdisyonProduct };
}

interface AdisyonProps {
    AdisyonActions: typeof AdisyonActions
}

type Props = NavigationInjectedProps & AdisyonProps & ApplicationState;

class AdisyonScreen extends Component<Props, AdisyonState> {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            selectedStoks: {}
        }
    }

    componentDidMount() {
    }
    render() {
        return (
            <React.Fragment>
                <Modal
                    animationType="slide"
                    transparent={false}

                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({ modalVisible: false })
                    }}>
                    <View style={{
                        width: '100%',
                        flexDirection: "row",
                    }}>
                        <StokSelect selectedStoks={this.state.selectedStoks} onPress={(data) => {
                            this.setState({ selectedStoks: data });
                        }} />
                    </View>
                </Modal>
                <CustomerInfo style={{ height: 120, top: 10 }} />
                <View
                    style={{
                        flex: 1,
                        width: width - 10,
                        top: 20,
                        marginBottom: 90,
                        flexDirection: "row",
                        backgroundColor: colors.transparentBackColor,
                        borderRadius: 10,
                        borderColor: colors.borderColor,
                        borderWidth: 2,
                        padding: 5,
                        marginHorizontal: 5
                    }}>
                    <FlatList data={this.state.selectedStoks ? Object.keys(this.state.selectedStoks) : []}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            const stok = this.props.Stok.items.find(itm => itm.STOKID == parseInt(item));
                            const stokItem = this.state.selectedStoks[stok.STOKID];
                            return <AdisyonItem
                                item={stok}
                                selectedStoks={this.state.selectedStoks}
                                onAddPress={(stokId) => {
                                    const { selectedStoks } = this.state;
                                    if (!selectedStoks[stokId])
                                        selectedStoks[stokId] = { ID: stokId, QUANTITY: 0 };
                                    selectedStoks[stokId].QUANTITY = selectedStoks[stokId].QUANTITY + 1;

                                }}
                                onRemovePress={(stokId) => {
                                    const { selectedStoks } = this.state;
                                    if (selectedStoks[stokId] && selectedStoks[stokId].QUANTITY > 0) {
                                        selectedStoks[stokId].QUANTITY = selectedStoks[stokId].QUANTITY - 1;
                                        if (selectedStoks[stok.STOKID].QUANTITY <= 0)
                                            delete selectedStoks[stok.STOKID];
                                        this.setState({ selectedStoks: selectedStoks });
                                    }
                                }}
                            />
                            // return <View key={index} style={{ flex: 1, flexDirection: 'row', margin: 1, height: 30, marginBottom: 5 }}>
                            //     <View style={{ flexDirection: "column", marginRight: 5 }}>
                            //         <TouchableHighlight
                            //             style={{
                            //                 alignItems: "center",
                            //                 alignSelf: "center",
                            //                 alignContent: "center",
                            //                 borderRadius: 4,
                            //                 height: 30,
                            //                 backgroundColor: 'rgba(255,255,255,0.5)',
                            //                 width: 30
                            //             }}
                            //             onPress={() => {
                            //                 const { selectedStoks } = this.state;
                            //                 console.log(selectedStoks)
                            //                 selectedStoks[stok.STOKID].QUANTITY = selectedStoks[stok.STOKID].QUANTITY - 1;
                            //                 if (selectedStoks[stok.STOKID].QUANTITY <= 0)
                            //                     delete selectedStoks[stok.STOKID];
                            //                 this.setState({ selectedStoks: selectedStoks });
                            //             }}>
                            //             <Icon name="minus" size={25} color={colors.inputBackColor} />
                            //         </TouchableHighlight>
                            //     </View>
                            //     <View style={{ flexDirection: "column", marginHorizontal: 3 }}>
                            //         <Text style={{ color: colors.inputTextColor, fontSize: 18 }}>
                            //             {this.state.selectedStoks[stok.STOKID].QUANTITY || 0}
                            //         </Text>
                            //     </View>
                            //     <View style={{ flexDirection: "column", marginRight: 5 }}>
                            //         <TouchableHighlight
                            //             style={{
                            //                 alignItems: "center",
                            //                 alignSelf: "center",
                            //                 alignContent: "center",
                            //                 borderRadius: 4,
                            //                 height: 30,
                            //                 backgroundColor: 'rgba(255,255,255,0.5)',
                            //                 width: 30
                            //             }}
                            //             onPress={() => {
                            //                 const { selectedStoks } = this.state;
                            //                 selectedStoks[stok.STOKID].QUANTITY = selectedStoks[stok.STOKID].QUANTITY + 1;
                            //                 this.setState({ selectedStoks: selectedStoks });
                            //             }}>
                            //             <Icon name="plus" size={25} color={colors.inputBackColor} />
                            //         </TouchableHighlight>
                            //     </View>
                            //     <Text style={{ color: colors.inputTextColor, flexDirection: "column", alignSelf: "center" }}>{stok.ADI} x {this.state.selectedStoks[item].QUANTITY}</Text>
                            //     <Text style={{ color: colors.inputTextColor, marginLeft: "auto", alignSelf: "center" }}>{Intl.NumberFormat("TR", {
                            //         style: "currency",
                            //         currency: "TRL"
                            //     }).format(stok.SFIYAT1 * this.state.selectedStoks[item].QUANTITY)}</Text>
                            // </View>
                        }}
                    />

                </View>
                <View
                    style={{
                        width: width,
                        position: "absolute",
                        height: 70,
                        flexDirection: "row",
                        bottom: 0,
                        left: 0,
                        padding: 5,
                    }}>

                    <TouchableHighlight underlayColor="#ffffff00" style={{
                        flex: 1,
                        backgroundColor: colors.buttonBackColor,
                        borderRadius: 50,
                        height: 50,
                        justifyContent: "center",
                        flexDirection: "row",
                        borderColor: colors.borderColor,
                        borderWidth: 2,
                        paddingVertical: 10,
                        marginHorizontal: 5
                    }}
                        onPressIn={() => {
                            this.setState({ modalVisible: true })
                        }}>
                        <React.Fragment>
                            <Icon name="plus" size={25} color={colors.inputTextColor} />
                            <Text style={{ color: colors.inputTextColor, marginLeft: 5, alignSelf: "center", fontWeight: "bold", fontSize: 16 }}>Ürün Ekle</Text>
                        </React.Fragment>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="#ffffff00" style={{
                        flex: 1,
                        backgroundColor: "#b329de",
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
                        onPressIn={() => {
                            if (Object.keys(this.state.selectedStoks).length > 0) {
                                Alert.alert("Adisyon işleme konulmuştur");
                                this.setState({ selectedStoks: {} })
                            }
                        }}>
                        <React.Fragment>
                            <Icon name="share-square" size={25} color={"#ffffff"} />
                            <Text style={{ color: "#ffffff", marginLeft: 5, alignSelf: "center", fontWeight: "bold", fontSize: 16 }}>Adisyon Kes</Text>
                        </React.Fragment>
                    </TouchableHighlight>
                </View>

            </React.Fragment>
        )
    }
}


export const Adisyon = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            AdisyonActions: bindActionCreators({ ...AdisyonActions }, dispatch),
        };
    }
)(AdisyonScreen));

