import { colors, CustomerInfo, StokSelect, StokItem, AdisyonItem } from '@components';
import { AdisyonActions } from '@reducers';
import { ApplicationState } from '@store';
import 'intl';
import 'intl/locale-data/jsonp/tr';
import React, { Component } from 'react';
import { Alert, Dimensions, Image, ImageBackground, Modal, Picker, StyleSheet, Text, TextInput, TouchableHighlight, View, KeyboardAvoidingView, BackHandler, NativeEventEmitter, NativeEventSubscription } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FlatList, NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IAdisyonProduct } from '@models';
import { StackHeaderLeftButtonProps, HeaderBackButton } from 'react-navigation-stack';
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
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Kart Oku",
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
        this.state = {
            modalVisible: false,
            selectedStoks: {}
        }
    }
    backHandler: NativeEventSubscription;
    componentDidMount() {
        console.log("componentDidMount")
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackPress
        );
    }
    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackPress
        );
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
                <KeyboardAvoidingView
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
                        }}
                    />

                </KeyboardAvoidingView>
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

