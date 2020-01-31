import { AdisyonItem, colors, CustomerInfo, LoaderSpinner } from '@components';
import { AdisyonActions, CustomerActions,  } from '@reducers';
import { ApplicationState } from '@store';
import 'intl';
import 'intl/locale-data/jsonp/tr';
import React, { Component } from 'react';
import { Alert, BackHandler, Dimensions, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FlatList, NavigationEvents, NavigationInjectedProps, withNavigation, ScrollView } from 'react-navigation';
import { HeaderBackButton, StackHeaderLeftButtonProps } from 'react-navigation-stack';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const { width, scale, height } = Dimensions.get("window");

interface AdisyonState {
}

interface AdisyonProps {
    AdisyonActions: typeof AdisyonActions
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
            this.props.AdisyonActions.setCurrent({
                DEPCODE: this.props.Department.current.KODU,
                GARSONID: this.props.User.current.ID,
                GUESTNO: this.props.Customer.current.GUESTNO,
                GUESTID: this.props.Customer.current.GUESTID,
                ITEMS: [],
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
        let discount = this.props.Customer.current.DISCOUNT_RATE;
        this.props.Adisyon.current ? this.props.Adisyon.current.ITEMS.forEach(i => {
            const stokItem = this.props.Stok.items.find(t => t.STOKID == i.ID);
            currentTotal += i.QUANTITY * (stokItem.SFIYAT1 -
                parseFloat((stokItem.SFIYAT1 * (discount/100)).toFixed(2)))
        }) : null;
        return (
            <React.Fragment>
                <LoaderSpinner
                    showLoader={this.props.Adisyon.isRequest}
                    onCloseModal={async () => {
                        this.setState({
                            errorMessage: "",
                            password: null
                        });
                        await this.props.AdisyonActions.setCurrent({
                            DEPCODE: this.props.Department.current.KODU,
                            GARSONID: this.props.User.current.ID,
                            GUESTNO: this.props.Customer.current.GUESTNO,
                            ITEMS: [],
                            NOTES: ""
                        });
                    }} />
                <NavigationEvents
                    onWillFocus={this.handleComponentMount}
                    onWillBlur={this.handleComponentUnmount} />
                <CustomerInfo style={{ height: 120, top: 10 }} total={currentTotal} />
                <View
                    style={{
                        flex: 1,
                        flexGrow: 1,
                        width: width - 10,
                        top: 20,
                        marginBottom: 90,
                        backgroundColor: colors.transparentBackColor,
                        borderRadius: 10,
                        borderColor: colors.borderColor,
                        borderWidth: 2,
                        padding: 5,
                        marginHorizontal: 5
                    }}>
                    <ScrollView keyboardDismissMode="on-drag" style={{ flex: 1 }} keyboardShouldPersistTaps="always">
                        {this.props.Adisyon.current ? this.props.Adisyon.current.ITEMS.map((item, index) => {
                            const stok = this.props.Stok.items.find(itm => itm.STOKID == item.ID);
                            return <AdisyonItem key={index}
                                discountRate = {discount}
                                item={item}
                                stok={stok}
                                onAddPress={(stokId, change) => {
                                    let currentTotal = 0;
                                    let itemPrice = 0;
                                    this.props.Adisyon.current.ITEMS.forEach(i => {
                                        const stokItem = this.props.Stok.items.find(t => t.STOKID == i.ID);
                                        currentTotal += i.QUANTITY * +(stokItem.SFIYAT1 - (stokItem.SFIYAT1 * (discount/100))).toFixed(2);
                                        if (stokItem.STOKID == stokId.ID)
                                            itemPrice = stokItem.SFIYAT1;
                                    });

                                    // if (currentTotal + itemPrice > this.props.Customer.current.BALANCE) {
                                    //     Alert.alert("Uyarı", "Yeterli bakiye yok");
                                    //     return;
                                    // }
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
                            this.props.navigation.navigate("StokSelect")
                        }}>
                        <React.Fragment>
                            <Icon name="plus" size={25} color={colors.inputTextColor} />
                            <Text style={{
                                color: colors.inputTextColor,
                                marginLeft: 5,
                                alignSelf: "center",
                                fontWeight: "bold",
                                fontSize: 16
                            }}>Ürün Ekle</Text>
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
                        onPressIn={async () => {
                            console.log(this.props.Adisyon.current.ITEMS )
                        if(this.props.Adisyon.current.ITEMS.length>0){
                            const isSuccess = await this.props.AdisyonActions.sendItem(this.props.Adisyon.current);
                            if (isSuccess["Success"]) {
                                Alert.alert("Tamam", "Sipariş tamamlandı.");
                                this.props.navigation.navigate("Nfc");
                            }
                            else {
                                Alert.alert("Hata",isSuccess["Message"]);
                            }
                        }
                        else{
                            Alert.alert("Ürün Seçin","Devam etmek için lütfen ürün seçin.")
                        }
                        }}>
                        <React.Fragment>
                            <Icon name="share-square" size={25} color={"#ffffff"} />
                            <Text style={{
                                color: "#ffffff",
                                marginLeft: 5,
                                alignSelf: "center",
                                fontWeight: "bold",
                                fontSize: 16
                            }}>Tamamla</Text>
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

