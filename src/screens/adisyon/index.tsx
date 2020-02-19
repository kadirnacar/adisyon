import { AdisyonItem, colors, CustomerInfo, LoaderSpinner, BarcodeReader, TableInfo, NfcReader } from '@components';
import { AdisyonActions, CustomerActions, ActivityOrderActions, Applications, TableActions } from '@reducers';
import { ApplicationState } from '@store';
import 'intl';
import 'intl/locale-data/jsonp/tr';
import React, { Component } from 'react';
import { Alert, BackHandler, Dimensions, Text, TouchableHighlight, View, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationEvents, NavigationInjectedProps, ScrollView, withNavigation } from 'react-navigation';
import { HeaderBackButton, StackHeaderLeftButtonProps } from 'react-navigation-stack';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput } from 'react-native-gesture-handler';
const { width, scale, height } = Dimensions.get("window");

interface AdisyonState {
    showBarcode?: boolean;
    showNfc?: boolean;
    errorMessage?: string;
    password?: any;
}

interface AdisyonProps {
    AdisyonActions: typeof AdisyonActions;
    TableActions: typeof TableActions;
    CustomerActions: typeof CustomerActions;
    ActivityOrderActions: typeof ActivityOrderActions;
}
type Props = NavigationInjectedProps & AdisyonProps & ApplicationState;

class AdisyonScreen extends Component<Props, AdisyonState> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Adisyon",
            headerLeft: (props: StackHeaderLeftButtonProps) => {
                return <HeaderBackButton {...props}
                    onPress={() => {
                        let goBack = false;
                        Alert.alert("Uyarı",
                            "Müşteri ve Sipariş bilgisi silinecektir. Emin misiniz?",
                            [{
                                text: "Tamam",
                                style: "default",
                                onPress: (value) => {
                                    navigation.goBack();
                                }
                            },
                            {
                                text: "İptal",
                                style: "cancel",
                                onPress: (value) => {
                                    goBack = false;
                                }
                            }],
                            {
                                cancelable: false
                            }
                        )
                        return goBack;
                    }} />
            },
        };
    };
    constructor(props) {
        super(props);
        this.handleBackPress = this.handleBackPress.bind(this);
        this.handleComponentMount = this.handleComponentMount.bind(this);
        this.handleComponentUnmount = this.handleComponentUnmount.bind(this);
        this.state = {
        }
    }

    handleBackPress() {
        Alert.alert("Uyarı",
            "Müşteri ve Sipariş bilgisi silinecektir. Emin misiniz?",
            [{
                text: "Tamam",
                style: "default",
                onPress: (value) => {
                    this.props.navigation.goBack();
                    return false;
                }
            },
            {
                text: "İptal",
                style: "cancel",
                onPress: (value) => {
                    return true;
                }
            }],
            {
                cancelable: false
            }
        )
        return true;
    }

    async handleComponentMount() {
        if (!this.props.Adisyon.current) {
            if (this.props.Table.current) {
                await this.props.TableActions.getTableItems(this.props.Department.current.KODU, this.props.Table.current.MASANO);
            }
            this.props.AdisyonActions.setCurrent({
                DEPCODE: this.props.Department.current.KODU,
                GARSONID: this.props.Garson.current.ID,
                GUESTNO: this.props.Customer.current ? this.props.Customer.current.GUESTNO : null,
                GUESTID: this.props.Customer.current ? this.props.Customer.current.GUESTID : null,
                ITEMS: this.props.Table.current && this.props.Table.tableAdisyon ? this.props.Table.tableAdisyon : [],
                NOTES: ""
            });
        }
        this.setState({});
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackPress
        );
    }

    async handleComponentUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackPress
        );
    }

    render() {
        let currentTotal = 0;
        let discount = this.props.Customer && this.props.Customer.current ? this.props.Customer.current.DISCOUNT_RATE : 0;
        this.props.Adisyon.current && this.props.Adisyon.current.ITEMS ? this.props.Adisyon.current.ITEMS.forEach(i => {
            const stokItem = this.props.Stok.items.find(t => t.STOKID == i.ID);
            if (stokItem)
                currentTotal += i.QUANTITY * (stokItem.SFIYAT1 -
                    parseFloat((stokItem.SFIYAT1 * (discount / 100)).toFixed(2)))
        }) : null;
        return (
            <React.Fragment>
                <LoaderSpinner
                    showLoader={this.props.Adisyon.isRequest || this.props.Table.isRequest || this.props.Customer.isRequest}
                    onCloseModal={async () => {
                        this.setState({
                            errorMessage: "",
                            password: null
                        });
                        await this.props.AdisyonActions.setCurrent({
                            DEPCODE: this.props.Department.current.KODU,
                            GARSONID: this.props.Garson.current.ID,
                            GUESTNO: this.props.Customer.current ? this.props.Customer.current.GUESTNO : null,
                            ITEMS: [],
                            NOTES: ""
                        });
                    }} />
                <Modal visible={this.state.showBarcode || false}
                    transparent={false}
                    onRequestClose={() => {

                    }}>
                    <BarcodeReader
                        onBarcodePress={(barcode) => {
                            const stokItem = this.props.Stok.items.find(i => {
                                return i.BARKOD == barcode
                            });
                            if (stokItem) {
                                const adisyon = this.props.Adisyon.current;

                                let currentTotal = 0;

                                adisyon.ITEMS.forEach(i => {
                                    const stokItem1 = this.props.Stok.items.find(t => t.STOKID == i.ID);
                                    currentTotal += i.QUANTITY * stokItem1.SFIYAT1
                                });

                                if (this.props.Customer.current && stokItem && (currentTotal + stokItem.SFIYAT1) > this.props.Customer.current.BALANCE) {
                                    Alert.alert("Uyarı", "Yeterli bakiye yok");
                                    return;
                                }
                                if (stokItem) {
                                    const adisyonIndex = adisyon.ITEMS.findIndex(i => i.ID == stokItem.STOKID);
                                    if (adisyonIndex < 0)
                                        adisyon.ITEMS.push({ ID: stokItem.STOKID, QUANTITY: 1 });
                                    else
                                        adisyon.ITEMS[adisyonIndex].QUANTITY = adisyon.ITEMS[adisyonIndex].QUANTITY + 1;
                                }
                                this.setState({});
                            } else {
                                Alert.alert("Bu barkoda ait ürün bulunamadı.")
                            }
                            this.setState({ showBarcode: false })
                        }}
                        onClose={() => {
                            this.setState({ showBarcode: false })
                        }} />
                </Modal>
                <Modal visible={this.state.showNfc || false}
                    transparent={false}
                    onRequestClose={() => {

                    }}>
                    <NfcReader onReadTag={async (tag) => {
                        const isFind = await this.props.CustomerActions.getItem(tag);
                        if (!isFind)
                            Alert.alert("Kart Bilgisi Bulunamadı.");
                        else {
                            this.props.Adisyon.current.TABLENO = this.props.Table.current ? this.props.Table.current.MASANO : "";
                            this.props.Adisyon.current.GUESTID = this.props.Customer.current ? this.props.Customer.current.GUESTID : null;
                            this.props.Adisyon.current.GUESTNO = this.props.Customer.current ? this.props.Customer.current.GUESTNO : null;
                            this.props.Adisyon.current.ITEMS = [];

                            const isSuccess = await this.props.AdisyonActions.payItem(this.props.Adisyon.current);
                            if (isSuccess["Success"]) {
                                Alert.alert("Tamam", "Sipariş tamamlandı.");
                                this.props.navigation.navigate("TableSelect");
                            } else {
                                Alert.alert("Hata", isSuccess["Message"]);
                            }
                        }
                        this.setState({ showNfc: false })
                    }} />
                    <CustomerInfo style={{ height: 120, top: -10 }} total={currentTotal} />
                </Modal>


                <NavigationEvents
                    onWillFocus={this.handleComponentMount}
                    onWillBlur={this.handleComponentUnmount} />
                {!this.props.Table.current ?
                    <CustomerInfo style={{ height: 120, top: 10 }} total={currentTotal} /> : null}
                {this.props.Table.current ?
                    <TableInfo style={{ height: 120, top: 10 }} total={currentTotal} /> : null}
                <View
                    style={{
                        flex: 1,
                        flexGrow: 1,
                        width: width - 10,
                        top: 12,
                        marginBottom: 70,
                        backgroundColor: colors.transparentBackColor,
                        borderRadius: 10,
                        borderColor: colors.borderColor,
                        borderWidth: 2,
                        padding: 5,
                        marginHorizontal: 5
                    }}>
                    <ScrollView keyboardDismissMode="on-drag" style={{ flex: 1 }} keyboardShouldPersistTaps="always">
                        {this.props.Adisyon.current && this.props.Adisyon.current.ITEMS ? this.props.Adisyon.current.ITEMS.map((item, index) => {
                            const stok = this.props.Stok.items.find(itm => itm.STOKID == item.ID);
                            return <AdisyonItem key={index}
                                discountRate={discount}
                                item={item}
                                stok={stok}
                                onAddPress={(stokId, change) => {
                                    let currentTotal = 0;
                                    let itemPrice = 0;
                                    this.props.Adisyon.current.ITEMS.filter(i => !i.OLD).forEach(i => {
                                        const stokItem = this.props.Stok.items.find(t => t.STOKID == i.ID);
                                        if (stokItem) {
                                            currentTotal += i.QUANTITY * +(stokItem.SFIYAT1 - (stokItem.SFIYAT1 * (discount / 100))).toFixed(2);
                                            if (stokItem.STOKID == stokId.ID)
                                                itemPrice = stokItem.SFIYAT1;
                                        }
                                    });

                                    if (this.props.Customer.current && currentTotal + itemPrice > this.props.Customer.current.BALANCE) {
                                        Alert.alert("Uyarı", "Yeterli bakiye yok");
                                        return;
                                    }
                                    if (!change)
                                        item.QUANTITY = item.QUANTITY + 1;
                                    this.setState({});
                                }}
                                onRemovePress={(stokId) => {
                                    if (stokId && stokId.QUANTITY > 0) {
                                        stokId.QUANTITY = stokId.QUANTITY - 1;
                                        if (stokId.QUANTITY <= 0)
                                            this.props.Adisyon.current.ITEMS.splice(index, 1);
                                        this.setState({});
                                    } else if (index >= 0) {
                                        this.props.Adisyon.current.ITEMS.splice(index, 1);
                                        this.setState({});
                                    }
                                }}
                            />
                        }) : null}
                    </ScrollView>
                </View>
                <View
                    style={{
                        width: width,
                        flex: 1,
                        position: "absolute",
                        height: 60,
                        flexDirection: "row",
                        bottom: 0,
                        left: 0,
                        padding: 0,
                    }}>

                    <TouchableHighlight underlayColor="#ffffff00" style={{
                        flex: 1,
                        backgroundColor: colors.buttonBackColor,
                        borderRadius: 0,
                        height: "100%",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        borderColor: colors.borderColor,
                        borderWidth: 2,
                        paddingVertical: 0,
                        marginHorizontal: 0
                    }}
                        onPressIn={() => {
                            this.props.navigation.navigate("StokSelect")
                        }}>
                        <React.Fragment>
                            <Icon name="plus"
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    textAlign: "center",
                                    width: "100%"
                                }}
                                size={25}
                                color={colors.inputTextColor} />
                            <Text style={{
                                flex: 1,
                                flexDirection: "row",
                                textAlign: "center",
                                width: "100%",
                                color: colors.inputTextColor,
                                marginLeft: 5,
                                alignSelf: "center",
                                fontWeight: "bold",
                                fontSize: 14
                            }}>Ürün Ekle</Text>
                        </React.Fragment>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="#ffffff00" style={{
                        flex: 1,
                        backgroundColor: "#292fde",
                        borderRadius: 0,
                        height: "100%",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        borderColor: "#292fde",
                        borderWidth: 2,
                        paddingVertical: 0,
                        marginHorizontal: 0,
                        padding: 0
                    }}
                        onPressIn={async () => {
                            this.setState({ showBarcode: true })
                        }}>
                        <React.Fragment>
                            <Icon name="barcode" size={25} color={"#ffffff"}
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    textAlign: "center",
                                    width: "100%"
                                }} />
                            <Text style={{
                                flex: 1,
                                flexDirection: "row",
                                textAlign: "center",
                                width: "100%",
                                color: "#ffffff",
                                marginLeft: 5,
                                alignSelf: "center",
                                fontWeight: "bold",
                                fontSize: 14
                            }}>Barkod</Text>
                        </React.Fragment>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="#ffffff00" style={{
                        flex: 1,
                        backgroundColor: "#b329de",
                        borderRadius: 0,
                        height: "100%",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        borderColor: "#b329de",
                        borderWidth: 2,
                        paddingVertical: 0,
                        marginHorizontal: 0,
                        padding: 0
                    }}
                        onPressIn={async () => {
                            if (this.props.Adisyon.current.ITEMS && this.props.Adisyon.current.ITEMS.length > 0) {
                                if (this.props.Customer.current) {
                                    this.props.Adisyon.current.TABLENO = this.props.Table.current ? this.props.Table.current.MASANO : "";
                                    const isSuccess = await this.props.AdisyonActions.payItem(this.props.Adisyon.current);
                                    if (isSuccess["Success"]) {
                                        Alert.alert("Tamam", "Sipariş tamamlandı.");
                                        this.props.navigation.navigate("Nfc");
                                    } else {
                                        Alert.alert("Hata", isSuccess["Message"]);
                                    }
                                } else {
                                    this.setState({ showNfc: true })
                                }
                            }
                            else {
                                Alert.alert("Ürün Seçin", "Devam etmek için lütfen ürün seçin.")
                            }
                        }}>
                        <React.Fragment>
                            <Icon name="money-bill" size={25} color={"#ffffff"}
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    textAlign: "center",
                                    width: "100%"
                                }} />
                            <Text style={{
                                flex: 1,
                                flexDirection: "row",
                                textAlign: "center",
                                width: "100%",
                                color: "#ffffff",
                                marginLeft: 5,
                                alignSelf: "center",
                                fontWeight: "bold",
                                fontSize: 14
                            }}>Öde</Text>
                        </React.Fragment>
                    </TouchableHighlight>
                    {this.props.Table.current ?
                        <TouchableHighlight underlayColor="#ffffff00" style={{
                            flex: 1,
                            backgroundColor: "#de2974",
                            borderRadius: 0,
                            height: "100%",
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                            alignSelf: "center",
                            borderColor: "#de2974",
                            borderWidth: 2,
                            paddingVertical: 0,
                            marginHorizontal: 0,
                        }}
                            onPressIn={async () => {
                                if (this.props.Adisyon.current.ITEMS && this.props.Adisyon.current.ITEMS.filter(i => !i.OLD).length > 0) {
                                    this.props.Adisyon.current.TABLENO = this.props.Table.current ? this.props.Table.current.MASANO : "";
                                    const isSuccess = await this.props.AdisyonActions.sendItem(this.props.Adisyon.current);
                                    if (isSuccess["Success"]) {
                                        Alert.alert("Tamam", "Sipariş tamamlandı.");
                                        if (this.props.Department.useTable)
                                            this.props.navigation.navigate("TableSelect");
                                        else
                                            this.props.navigation.navigate("Nfc");
                                    } else {
                                        Alert.alert("Hata", isSuccess["Message"]);
                                    }
                                }
                                else {
                                    Alert.alert("Ürün Seçin", "Devam etmek için lütfen ürün seçin.")
                                }
                            }}>
                            <React.Fragment>
                                <Icon name="share-square" size={25} color={"#ffffff"}
                                    style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        textAlign: "center",
                                        width: "100%"
                                    }} />
                                <Text style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    textAlign: "center",
                                    width: "100%",
                                    color: "#ffffff",
                                    marginLeft: 5,
                                    alignSelf: "center",
                                    fontWeight: "bold",
                                    fontSize: 14
                                }}>Sipariş</Text>
                            </React.Fragment>
                        </TouchableHighlight> : null
                    }
                </View>

            </React.Fragment>
        )
    }
}


export const Adisyon = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            TableActions: bindActionCreators({ ...TableActions }, dispatch),
            AdisyonActions: bindActionCreators({ ...AdisyonActions }, dispatch),
            CustomerActions: bindActionCreators({ ...CustomerActions }, dispatch),
            ActivityOrderActions: bindActionCreators({ ...ActivityOrderActions }, dispatch),
        };
    }
)(AdisyonScreen));

