import { colors } from '@components';
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
    selectedGrup: any;
    search: string;
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
            search: "",
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
                            <View style={{
                                flexDirection: "column",
                                height: 50,
                                alignSelf: "center",
                                alignContent: "center",
                                width: "100%",
                                borderRadius: 10,
                                marginTop: 5,
                                padding: 3,
                                backgroundColor: colors.inputTextColor
                            }}>
                                <TextInput
                                    style={{ backgroundColor: colors.inputTextColor }}
                                    placeholder="Ürün Ara"
                                    value={this.state.search}
                                    onChangeText={text => { this.setState({ search: text }) }} />
                            </View>
                            <View style={{ flex: 1, marginTop: 10 }}>
                                {this.props.Stok.items ?
                                    <FlatList
                                        data={this.props.Stok.items.filter(itm => (this.state.selectedGrup ? itm.STOKGRUPID == this.state.selectedGrup : true) && (this.state.search ? itm.ADI.indexOf(this.state.search) > -1 : true))}
                                        numColumns={1}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) => {
                                            return <View style={[styles.imageThumbnail, { height: 60, flexDirection: "row", width: "100%", justifyContent: "flex-start" }]}>
                                                <View style={{ flexDirection: "column" }}>
                                                    <Image style={{
                                                        width: 40,
                                                        height: 40,
                                                        resizeMode: "cover",
                                                        borderRadius: 2,
                                                        marginRight: 5
                                                    }} source={{ uri: item.FOTO, cache: 'force-cache' }} />
                                                </View>
                                                <View style={{ flexDirection: "column" }}>
                                                    <Text style={{
                                                        color: colors.inputTextColor,
                                                        fontSize: 14,
                                                    }}>{item.ADI}</Text>
                                                </View>
                                                <View style={{ flexDirection: "column" }}>
                                                    <Text style={{
                                                        color: colors.inputTextColor,
                                                        fontSize: 12,
                                                    }}>{item.SFIYAT1}</Text>
                                                </View>
                                                <View style={{ flex: 1, flexDirection: "column", alignItems: "flex-end" }}>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <View style={{ flexDirection: "column", marginRight: 5 }}>
                                                            <TouchableOpacity
                                                                style={{
                                                                    alignItems: "center",
                                                                    alignSelf: "center",
                                                                    alignContent: "center",
                                                                    borderRadius: 4,
                                                                    height: 40,
                                                                    backgroundColor: 'rgba(255,255,255,0.5)',
                                                                    width: 40
                                                                }}
                                                                onPress={() => {
                                                                    const { selectedStoks } = this.state;
                                                                    selectedStoks[item.STOKID] = selectedStoks[item.STOKID] ? selectedStoks[item.STOKID] - 1 : 0;
                                                                    if (selectedStoks[item.STOKID] < 0)
                                                                        delete selectedStoks[item.STOKID];
                                                                    this.setState({ selectedStoks: selectedStoks });
                                                                }}>
                                                                <Icon name="minus" size={35} color={colors.inputBackColor} />
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={{ flexDirection: "column", marginHorizontal: 3 }}>
                                                            <Text style={{ color: colors.inputTextColor, fontSize: 18 }}>
                                                                {this.state.selectedStoks[item.STOKID] || 0}
                                                            </Text>
                                                        </View>
                                                        <View style={{ flexDirection: "column" }}>
                                                            <TouchableOpacity
                                                                style={{
                                                                    alignItems: "center",
                                                                    alignSelf: "center",
                                                                    alignContent: "center",
                                                                    borderRadius: 4,
                                                                    height: 40,
                                                                    backgroundColor: 'rgba(255,255,255,0.5)',
                                                                    width: 40
                                                                }}
                                                                onPress={() => {
                                                                    const { selectedStoks } = this.state;
                                                                    selectedStoks[item.STOKID] = selectedStoks[item.STOKID] ? selectedStoks[item.STOKID] + 1 : 1;
                                                                    this.setState({ selectedStoks: selectedStoks });
                                                                }}>
                                                                <Icon name="plus" size={35} color={colors.inputBackColor} />
                                                            </TouchableOpacity>
                                                        </View>

                                                    </View>
                                                </View>
                                            </View>
                                        }}
                                    /> : null}
                                {/* {this.props.Stok.items ?
                                <FlatList
                                    data={this.props.Stok.items.filter(itm => (this.state.selectedGrup ? itm.STOKGRUPID == this.state.selectedGrup : true) && (this.state.search ? itm.ADI.indexOf(this.state.search) > -1 : true))}
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
                                /> : null} */}
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
                        <Text style={{ color: colors.inputTextColor }}>Kalan : {Intl.NumberFormat("TR", {
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