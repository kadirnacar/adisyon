import { ApplicationState } from '@store';
import LottieView from 'lottie-react-native';
import React, { Component } from 'react';
import { Dimensions, ImageBackground, View, TouchableOpacity, Text, Modal, Picker, StyleSheet, Image } from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import { withNavigation, NavigationInjectedProps, ScrollView, FlatList } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AdisyonActions } from '@reducers';
const { width, scale, height } = Dimensions.get("window");
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '@components';
import 'intl';
import 'intl/locale-data/jsonp/tr';

interface AdisyonState {
    modalVisible: boolean;
    selectedGrup: any;
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
            selectedGrup: null,
            selectedStoks: {}
        }
    }

    componentDidMount() {
    }
    render() {
        return (<ImageBackground source={require("../../../assets/background.jpg")}
            style={{ flex: 1, width: width, height: height }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                }}>
                <View style={{
                    flex: 1,
                    padding: 5,
                    borderRadius: 20,
                    borderColor: colors.borderColor,
                    borderWidth: 1,
                    marginHorizontal: 10,
                    marginVertical: 10,
                    backgroundColor: 'rgba(0,0,0,0.8)'
                }}>

                    <View style={{ flex: 1 }}>
                        <View style={{
                            flexDirection: "column",
                            height: 50,
                            alignSelf: "center",
                            alignContent: "center",
                            width: "100%",
                            borderRadius: 10,
                            padding: 3,
                            backgroundColor: colors.inputTextColor
                        }}>
                            <Picker
                                selectedValue={this.state.selectedGrup}
                                mode="dropdown"
                                style={{ height: 40, backgroundColor: colors.inputTextColor, borderRadius: 10 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ selectedGrup: itemValue })
                                }>
                                <Picker.Item label={"Tümü"} value={null} />
                                {this.props.StokGrup.items ? this.props.StokGrup.items.map((grp, index) => {
                                    return <Picker.Item label={grp.ADI} value={grp.STOKGRUPID} />
                                }) : null}
                            </Picker>
                        </View>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            {this.props.Stok.items ?
                                <FlatList
                                    data={this.props.Stok.items.filter(itm => this.state.selectedGrup ? itm.STOKGRUPID == this.state.selectedGrup : true)}
                                    numColumns={2}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => {
                                        return <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                                            <View style={styles.imageThumbnail}>
                                                <TouchableOpacity style={{
                                                    alignItems: "center",
                                                    alignSelf: "center",
                                                    alignContent: "center",
                                                    position: "absolute",
                                                    height: 45,
                                                    zIndex: 2,
                                                    top: 0,
                                                    backgroundColor: 'rgba(255,255,255,0.5)',
                                                    width: "100%"
                                                }}
                                                    onPress={() => {
                                                        const { selectedStoks } = this.state;
                                                        selectedStoks[item.STOKID] = selectedStoks[item.STOKID] ? selectedStoks[item.STOKID] + 1 : 1;
                                                        this.setState({ selectedStoks: selectedStoks });
                                                    }}>
                                                    <Icon name="plus" size={35} color={colors.inputBackColor} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{
                                                    alignItems: "center",
                                                    alignSelf: "center",
                                                    alignContent: "center",
                                                    position: "absolute",
                                                    height: 45,
                                                    zIndex: 2,
                                                    top: 45,
                                                    backgroundColor: 'rgba(255,255,255,0.5)',
                                                    width: "100%"
                                                }}
                                                    onPress={() => {
                                                        const { selectedStoks } = this.state;
                                                        selectedStoks[item.STOKID] = selectedStoks[item.STOKID] ? selectedStoks[item.STOKID] - 1 : 0;
                                                        if (selectedStoks[item.STOKID] < 0)
                                                            delete selectedStoks[item.STOKID];
                                                        this.setState({ selectedStoks: selectedStoks });
                                                    }}>
                                                    <Icon name="minus" size={35} color={colors.buttonBackColor} />
                                                </TouchableOpacity>
                                                <Image style={{
                                                    width: '100%',
                                                    height: 80,
                                                    top: 5,
                                                    position: "absolute",
                                                    resizeMode: "cover",
                                                    borderRadius: 10
                                                }} source={{ uri: item.FOTO, cache: 'force-cache' }} />
                                                <Text style={{
                                                    position: "absolute",
                                                    fontWeight: "bold",
                                                    color: colors.buttonBackColor,
                                                    fontSize: 16,
                                                    top: 85
                                                }}>{this.state.selectedStoks[item.STOKID]}</Text>
                                                <Text style={{
                                                    position: "absolute",
                                                    color: colors.inputTextColor,
                                                    fontSize: 14,
                                                    bottom: 0
                                                }}>{item.ADI}</Text>
                                            </View>
                                        </View>
                                    }}
                                /> : null}
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        flexDirection: "row",
                        height: 70,
                        borderBottomEndRadius: 15,
                        borderBottomStartRadius: 15,
                        backgroundColor: colors.inputBackColor
                    }}>
                        <TouchableOpacity
                            style={{
                                width: "50%",
                                flex: 1,
                                flexDirection: "column",
                                alignItems: "center",
                                alignSelf: "center",
                                padding: 10,
                                borderColor: colors.borderColor,
                            }}
                            onPress={() => {
                                this.setState({ modalVisible: false })
                            }}
                        >
                            <Text style={{ color: colors.inputTextColor, fontSize: 18, fontWeight: "bold" }}>Ekle</Text>
                        </TouchableOpacity>
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
                    </View>
                </View>
            </Modal>
            <TouchableOpacity style={{
                zIndex: 1,
                position: "absolute",
                flex: 1,
                bottom: 50,
                right: 20,
                backgroundColor: colors.buttonBackColor,
                borderRadius: 50,
                width: 55,
                alignItems: "center",
                borderColor: colors.borderColor,
                borderWidth: 2,
                padding: 10
            }}
                onPress={() => {
                    this.setState({ modalVisible: true })
                }}>
                <Icon name="plus" size={30} color={colors.inputTextColor} />
            </TouchableOpacity>
            <TouchableOpacity style={{
                zIndex: 1,
                position: "absolute",
                flex: 1,
                bottom: 120,
                right: 20,
                backgroundColor: "#4dabf7",
                borderRadius: 50,
                width: 55,
                alignItems: "center",
                borderColor: colors.borderColor,
                borderWidth: 2,
                padding: 10
            }}
                onPress={() => {
                    this.setState({ modalVisible: true })
                }}>
                <Icon name="share-square" size={30} color={colors.inputTextColor} />
            </TouchableOpacity>
            <View
                style={{
                    flex: 0,
                    width: width,
                    height: 80,
                    top: 20,
                    flexDirection: "row",
                    backgroundColor: colors.transparentBackColor,
                    borderRadius: 10,
                    borderColor: colors.borderColor,
                    borderWidth: 2,
                    padding: 10
                }}>
                <View>
                    <Text style={{ fontWeight: "bold", fontSize: 18, color: colors.inputTextColor }}>
                        {this.props.Customer.current ? this.props.Customer.current.ADI + " " + this.props.Customer.current.SOYADI : null}
                    </Text>
                    <Text style={{ color: colors.inputTextColor }}>Bakiye : {Intl.NumberFormat("TR", {
                        style: "currency",
                        currency: "TRL"
                    }).format((this.props.Customer.current ? this.props.Customer.current.BAKIYE : 0))}</Text>
                </View>
            </View>
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
                    renderItem={({ item }) => {
                        const stok = this.props.Stok.items.find(itm => itm.STOKID == parseInt(item))
                        return <View style={{ flex: 1, flexDirection: 'row', margin: 1 }}>
                            <Text style={{ color: colors.inputTextColor, flexDirection: "column" }}>{stok.ADI}</Text>
                            <Text style={{ color: colors.inputTextColor, marginLeft: "auto" }}>{Intl.NumberFormat("TR", {
                                style: "currency",
                                currency: "TRL"
                            }).format(stok.SFIYAT1 * this.state.selectedStoks[item])}</Text>
                        </View>
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </ImageBackground>
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

const styles = StyleSheet.create({

    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: 5,
        backgroundColor: "rgba(27,27,27,0.8)",
        margin: 2,
        height: 150,
    }
});