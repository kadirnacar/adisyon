import { ActivityOrderItem, colors, CustomerInfo, LoaderSpinner } from '@components';
import { ActivityOrderActions } from '@reducers';
import { ApplicationState } from '@store';
import 'intl';
import 'intl/locale-data/jsonp/tr';
import React, { Component } from 'react';
import { Alert, BackHandler, Dimensions, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationEvents, NavigationInjectedProps, ScrollView, withNavigation } from 'react-navigation';
import { HeaderBackButton, StackHeaderLeftButtonProps } from 'react-navigation-stack';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const { width, scale, height } = Dimensions.get("window");

interface AktiviteState {
}

interface AktiviteProps {
    ActivityOrderActions: typeof ActivityOrderActions
}
type Props = NavigationInjectedProps & AktiviteProps & ApplicationState;

class AktiviteScreen extends Component<Props, AktiviteState> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Aktivite",
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
        if (!this.props.ActivityOrder.current) {
            this.props.ActivityOrderActions.setCurrent({
                GARSONID: this.props.Garson.current.ID,
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
        this.props.ActivityOrder.current ? this.props.ActivityOrder.current.ITEMS.forEach(i => {
            const stokItem = this.props.Activity.items.find(t => t.ID == i.ItemID);
            if (stokItem)
                currentTotal += i.Quantity * stokItem.ADULTPRICE
        }) : null;
        return (
            <React.Fragment>
                <LoaderSpinner
                    showLoader={this.props.ActivityOrder.isRequest || this.props.Activity.isRequest}
                    onCloseModal={async () => {
                        this.setState({
                            errorMessage: "",
                            password: null
                        });
                        await this.props.ActivityOrderActions.setCurrent({
                            GARSONID: this.props.Garson.current.ID,
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
                        {this.props.ActivityOrder.current ? this.props.ActivityOrder.current.ITEMS.map((item, index) => {
                            const stok = this.props.Activity.items.find(itm => itm.ID == item.ItemID);
                            return <ActivityOrderItem key={index}
                                item={item}
                                activity={stok}
                                onAddPress={(stokId, change) => {
                                    let currentTotal = 0;
                                    let itemPrice = 0;
                                    this.props.ActivityOrder.current.ITEMS.forEach(i => {
                                        const stokItem = this.props.Activity.items.find(t => t.ID == i.ItemID);
                                        currentTotal += i.Quantity * stokItem.ADULTPRICE;
                                        if (stokItem.ID == stokId.ItemID)
                                            itemPrice = stokItem.ADULTPRICE;
                                    });

                                    if (currentTotal + itemPrice > this.props.Customer.current.BALANCE) {
                                        Alert.alert("Uyarı", "Yeterli bakiye yok");
                                        return;
                                    }
                                    if (!change)
                                        item.Quantity = item.Quantity + 1;
                                    this.setState({});
                                }}
                                onRemovePress={(stokId) => {
                                    if (stokId && stokId.Quantity > 0) {
                                        stokId.Quantity = stokId.Quantity - 1;
                                        if (stokId.Quantity <= 0)
                                            this.props.ActivityOrder.current.ITEMS.splice(index, 1);
                                        this.setState({});
                                    } else if (index >= 0) {
                                        this.props.ActivityOrder.current.ITEMS.splice(index, 1);
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
                            this.props.navigation.navigate("ActivitySelect")
                        }}>
                        <React.Fragment>
                            <Icon name="plus" size={25} color={colors.inputTextColor} />
                            <Text style={{
                                color: colors.inputTextColor,
                                marginLeft: 5,
                                alignSelf: "center",
                                fontWeight: "bold",
                                fontSize: 16
                            }}>Aktivite Ekle</Text>
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
                            if (this.props.ActivityOrder.current.ITEMS.length > 0) {
                                const isSuccess = await this.props.ActivityOrderActions.sendItem(this.props.ActivityOrder.current);
                                if (isSuccess["SUCCESS"]) {
                                    Alert.alert("Tamam", "Sipariş tamamlandı.");
                                    this.props.navigation.navigate("Nfc");
                                }else {
                                    Alert.alert("Hata", isSuccess["Message"]);
                                }
                            }
                            else {
                                Alert.alert("Ürün Seçin", "Devam etmek için lütfen ürün seçin.")
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


export const Aktivite = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            ActivityOrderActions: bindActionCreators({ ...ActivityOrderActions }, dispatch),
        };
    }
)(AktiviteScreen));

