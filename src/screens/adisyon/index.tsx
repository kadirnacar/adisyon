import { colors, CustomerInfo, StokSelect } from '@components';
import { AdisyonActions } from '@reducers';
import { ApplicationState } from '@store';
import 'intl';
import 'intl/locale-data/jsonp/tr';
import React, { Component } from 'react';
import { Alert, Dimensions, Image, ImageBackground, Modal, Picker, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FlatList, NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const { width, scale, height } = Dimensions.get("window");

interface AdisyonState {
    modalVisible: boolean;
    selectedStoks?: { [key: number]: number };
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

                        {/* <View>
                            
                            <TouchableOpacity style={{
                                width: "50%",
                                flex: 1,
                                flexDirection: "column",
                                alignItems: "center",
                                alignSelf: "center",
                                padding: 10,
                                borderColor: colors.borderColor,
                            }} onPress={() => {
                                this.setState({ selectedStoks: {}, modalVisible: false });
                            }}>
                                <Text style={{ color: colors.inputTextColor, fontSize: 18, fontWeight: "bold" }}>İptal</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </Modal>
                <CustomerInfo style={{ height: 120, top: 10 }} />

                <View
                    style={{
                        flex: 1,
                        width: width,
                        height: 80,
                        top: 30,
                        flexDirection: "row",
                        backgroundColor: colors.transparentBackColor,
                        borderRadius: 10,
                        borderColor: colors.borderColor,
                        borderWidth: 2,
                        padding: 10
                    }}>
                    <FlatList data={this.state.selectedStoks ? Object.keys(this.state.selectedStoks) : []}
                        renderItem={({ item, index }) => {
                            const stok = this.props.Stok.items.find(itm => itm.STOKID == parseInt(item))
                            return <View key={index} style={{ flex: 1, flexDirection: 'row', margin: 1, height: 30, marginBottom: 5 }}>
                                <View style={{ flexDirection: "column", marginRight: 5 }}>
                                    <TouchableOpacity
                                        style={{
                                            alignItems: "center",
                                            alignSelf: "center",
                                            alignContent: "center",
                                            borderRadius: 4,
                                            height: 30,
                                            backgroundColor: 'rgba(255,255,255,0.5)',
                                            width: 30
                                        }}
                                        onPress={() => {
                                            const { selectedStoks } = this.state;
                                            selectedStoks[stok.STOKID] = selectedStoks[stok.STOKID] ? selectedStoks[stok.STOKID] - 1 : 0;
                                            if (selectedStoks[stok.STOKID] < 0)
                                                delete selectedStoks[stok.STOKID];
                                            this.setState({ selectedStoks: selectedStoks });
                                        }}>
                                        <Icon name="minus" size={25} color={colors.inputBackColor} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: "column", marginHorizontal: 3 }}>
                                    <Text style={{ color: colors.inputTextColor, fontSize: 18 }}>
                                        {this.state.selectedStoks[stok.STOKID] || 0}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "column", marginRight: 5 }}>
                                    <TouchableOpacity
                                        style={{
                                            alignItems: "center",
                                            alignSelf: "center",
                                            alignContent: "center",
                                            borderRadius: 4,
                                            height: 30,
                                            backgroundColor: 'rgba(255,255,255,0.5)',
                                            width: 30
                                        }}
                                        onPress={() => {
                                            const { selectedStoks } = this.state;
                                            selectedStoks[stok.STOKID] = selectedStoks[stok.STOKID] ? selectedStoks[stok.STOKID] + 1 : 1;
                                            this.setState({ selectedStoks: selectedStoks });
                                        }}>
                                        <Icon name="plus" size={25} color={colors.inputBackColor} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ color: colors.inputTextColor, flexDirection: "column", alignSelf: "center" }}>{stok.ADI} x {this.state.selectedStoks[item]}</Text>
                                <Text style={{ color: colors.inputTextColor, marginLeft: "auto", alignSelf: "center" }}>{Intl.NumberFormat("TR", {
                                    style: "currency",
                                    currency: "TRL"
                                }).format(stok.SFIYAT1 * this.state.selectedStoks[item])}</Text>
                            </View>
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    {/* <View style={{ flexDirection: "row", width: "100%" }}>
                    <Text style={{ color: colors.inputTextColor, flexDirection: "column", alignSelf: "center" }}>Toplam</Text>
                    <Text style={{ color: colors.inputTextColor, marginLeft: "auto", alignSelf: "center" }}>{Intl.NumberFormat("TR", {
                        style: "currency",
                        currency: "TRL"
                    }).format(10000)}</Text>
                </View> */}
                    <View
                        style={{
                            width: width,
                            position: "absolute",
                            height: 90,
                            flexDirection: "row",
                            bottom: 30,
                            left: 0,
                            backgroundColor: colors.transparentBackColor,
                            borderRadius: 10,
                            borderColor: colors.borderColor,
                            borderWidth: 2,
                            padding: 10,
                        }}>

                        <TouchableOpacity style={{
                            backgroundColor: colors.buttonBackColor,
                            borderRadius: 50,
                            height: 50,
                            alignItems: "center",
                            flexDirection: "row",
                            borderColor: colors.borderColor,
                            borderWidth: 2,
                            padding: 10,
                            width: "50%"
                        }}
                            onPress={() => {
                                this.setState({ modalVisible: true })
                            }}>
                            <Icon name="plus" size={30} color={colors.inputTextColor} />
                            <Text style={{ color: colors.inputTextColor, marginLeft: 5, alignSelf: "center", fontWeight: "bold", fontSize: 16 }}>Ürün Ekle</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: "#4dabf7",
                            borderRadius: 50,
                            height: 50,
                            flexDirection: "row",
                            borderColor: colors.borderColor,
                            borderWidth: 2,
                            width: "50%",
                            padding: 10
                        }}
                            onPress={() => {
                                if (Object.keys(this.state.selectedStoks).length > 0) {
                                    Alert.alert("Adisyon işleme konulmuştur");
                                    this.setState({ selectedStoks: {} })
                                }
                            }}>
                            <Icon name="share-square" size={30} color={colors.inputTextColor} />
                            <Text style={{ color: colors.inputTextColor, marginLeft: 5, alignSelf: "center", fontWeight: "bold", fontSize: 16 }}>Adisyon Kes</Text>
                        </TouchableOpacity>
                    </View>
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

