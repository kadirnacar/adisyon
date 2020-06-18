import {
  AdisyonItem,
  BarcodeReader,
  colors,
  CustomerInfo,
  LoaderSpinner,
  NfcReader,
  TableInfo,
} from '@components';
import config from '@config';
import {
  ActivityOrderActions,
  AdisyonActions,
  CustomerActions,
  TableActions,
} from '@reducers';
import {ApplicationState} from '@store';
import 'intl';
import 'intl/locale-data/jsonp/tr';
import React, {Component} from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  Modal,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {
  default as FontAwesome5Icon,
  default as Icon,
} from 'react-native-vector-icons/FontAwesome5';
import {
  NavigationEvents,
  NavigationInjectedProps,
  ScrollView,
  withNavigation,
} from 'react-navigation';
import {
  HeaderBackButton,
  StackHeaderLeftButtonProps,
} from 'react-navigation-stack';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {IStok, ICustomerFreeItems} from '@models';
const {width, scale, height} = Dimensions.get('window');

interface AdisyonState {
  showBarcode?: boolean;
  showNfc?: boolean;
  showTableNo?: boolean;
  showConfirm: boolean;
  tableNo?: string;
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
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Adisyon',
      headerRight: props => {
        return (
          <TouchableHighlight
            underlayColor="#ffffff00"
            style={{
              borderRadius: 40,
              borderColor: colors.borderColor,
              borderWidth: 2,
              padding: 5,
              marginRight: 5,
            }}
            onPressIn={() => {
              navigation.navigate('CustomerTrans', {current: false});
            }}>
            <FontAwesome5Icon name="user" size={25} color={'#fff'} />
          </TouchableHighlight>
        );
      },
      headerLeft: (props: StackHeaderLeftButtonProps) => {
        return (
          <HeaderBackButton
            {...props}
            onPress={() => {
              let goBack = false;
              Alert.alert(
                'Uyarı',
                'Müşteri ve Sipariş bilgisi silinecektir. Emin misiniz?',
                [
                  {
                    text: 'Tamam',
                    style: 'default',
                    onPress: value => {
                      navigation.goBack();
                    },
                  },
                  {
                    text: 'İptal',
                    style: 'cancel',
                    onPress: value => {
                      goBack = false;
                    },
                  },
                ],
                {
                  cancelable: false,
                },
              );
              return goBack;
            }}
          />
        );
      },
    };
  };
  constructor(props) {
    super(props);
    this.handleBackPress = this.handleBackPress.bind(this);
    this.handleComponentMount = this.handleComponentMount.bind(this);
    this.handleComponentUnmount = this.handleComponentUnmount.bind(this);
    this.state = {
      showConfirm: false,
    };
  }

  handleBackPress() {
    Alert.alert(
      'Uyarı',
      'Müşteri ve Sipariş bilgisi silinecektir. Emin misiniz?',
      [
        {
          text: 'Tamam',
          style: 'default',
          onPress: value => {
            this.props.navigation.goBack();
            return false;
          },
        },
        {
          text: 'İptal',
          style: 'cancel',
          onPress: value => {
            return true;
          },
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  }

  async handleComponentMount() {
    if (!this.props.Adisyon.current) {
      if (config.useAlagart && this.props.Table.current) {
        await this.props.TableActions.getTableItems(
          this.props.Department.current.KODU,
          this.props.Table.current.MASANO,
        );
      }
      if (this.props.Department.useTable) {
        this.setState({showTableNo: true});
      }
      this.props.AdisyonActions.setCurrent({
        DEPID: this.props.Department.current.ID,
        GARSONID: this.props.Garson.current.STAFFID,
        GUESTID: this.props.Customer.current
          ? this.props.Customer.current.GUESTNO
          : null,
        ITEMS:
          config.useAlagart &&
          this.props.Table.current &&
          this.props.Table.tableAdisyon
            ? this.props.Table.tableAdisyon
            : [],
        NOTES: '',
      });
    }
    this.setState({});
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  async handleComponentUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  getGroupFreeItem(groupId?) {
    if (!groupId || !this.props.Customer.freeGroups) {
      return null;
    }
    let freeGroup=this.props.Customer.allFreeItems.find(itm=>{
      if(!itm.ITEMGROUPID){
        return false;
      }
      if(itm.DEPID){
        return itm.DEPID==this.props.Department.current.ID && itm.ITEMGROUPID==groupId;
      }else{
        return itm.ITEMID==groupId;
      }
    });
    if (freeGroup) {
      return freeGroup;
    }else{
      return this.getGroupFreeItem(this.props.StokGrup.groups[groupId]?.PARENTGROUPID);
    }
  }
  getFreeItem(stok: IStok): ICustomerFreeItems {
    let freeItem=this.props.Customer.allFreeItems.find(itm=>{
      if(!itm.ITEMID){
        return false;
      }
      if(itm.DEPID){
        return itm.DEPID==this.props.Department.current.ID && itm.ITEMID==stok.STOKID;
      }else{
        return itm.ITEMID==stok.STOKID;
      }
    });
      if (freeItem == null) {
        freeItem = this.getGroupFreeItem(stok.STOKGRUPID);
      }
      if(freeItem && !freeItem.UsedItems){
        freeItem.TotalUsed=0;
        freeItem.UsedItems={};
      }
    return freeItem;
  }
  render() {
    let currentTotal = 0;
    let discount =
      this.props.Customer && this.props.Customer.current
        ? this.props.Customer.current.POSDISCOUNTPERCENT
        : 0;
    this.props.Adisyon.current && this.props.Adisyon.current.ITEMS
      ? this.props.Adisyon.current.ITEMS.forEach(i => {
          const stokItem = this.props.Stok.items.find(t => t.STOKID == i.ID);
          if (stokItem) {
            const isAi =
            this.props.Customer.current &&
            stokItem &&
            this.props.Customer.current.ALLINCLUSIVE == true &&
            stokItem.INCLUDEDIN_AI == true &&
            this.props.Department.current.AIENABLED == true
              ? true
              : false;
            let freeItem =!isAi ? this.getFreeItem(stokItem):null;
            const stokFiyat =
              isAi
                ? 0
                : stokItem.SFIYAT1;
            const birimFiyat =
              stokFiyat -
              parseFloat((stokFiyat * (+discount / 100)).toFixed(2));
              const quantity = freeItem
              ? freeItem.TotalUsed >= freeItem.QUANTITY - freeItem.USEDQUANTITY
                ? i.ID in freeItem.UsedItems
                  ? freeItem.UsedItems[i.ID].unused
                  : 0
                : 0
              : i.QUANTITY;
            const fiyat =quantity * birimFiyat;
            currentTotal += fiyat;
          }
        })
      : null;
    return (
      <React.Fragment>
        <LoaderSpinner
          showLoader={
            this.props.Adisyon.isRequest ||
            this.props.Table.isRequest ||
            this.props.Customer.isRequest
          }
          onCloseModal={async () => {
            this.setState({
              errorMessage: '',
              password: null,
            });
            await this.props.AdisyonActions.setCurrent({
              DEPID: this.props.Department.current.ID,
              GARSONID: this.props.Garson.current.STAFFID,
              ITEMS: [],
              NOTES: '',
            });
          }}
        />
        <Modal
          visible={this.state.showBarcode || false}
          transparent={false}
          onRequestClose={() => {
            this.setState({showBarcode: false});
          }}>
          <BarcodeReader
            onBarcodePress={barcode => {
              const stokItem = this.props.Stok.items.find(i => {
                return i.BARKOD.indexOf(barcode)>-1 && i.departments.indexOf(this.props.Department.current.KODU) > -1;
              });
              if (stokItem) {
                const adisyon = this.props.Adisyon.current;

                let currentTotal = 0;

                adisyon.ITEMS.forEach(i => {
                  const stokItem1 = this.props.Stok.items.find(
                    t => t.STOKID == i.ID,
                  );
                  if (stokItem1) {
                    const stokFiyat =
                      this.props.Customer.current &&
                      stokItem1 &&
                      this.props.Customer.current.ALLINCLUSIVE == true &&
                      stokItem1.INCLUDEDIN_AI == true &&
                      this.props.Department.current.AIENABLED == true
                        ? 0
                        : stokItem1.SFIYAT1;
                    currentTotal +=
                      i.QUANTITY *
                      (stokFiyat -
                        parseFloat((stokFiyat * (+discount / 100)).toFixed(2)));
                  }
                });

                // if (
                //   this.props.Customer.current &&
                //   stokItem &&
                //   currentTotal + stokItem.SFIYAT1 >
                //     this.props.Customer.current.BALANCE
                // ) {
                //   Alert.alert('Uyarı', 'Yeterli bakiye yok');
                //   return;
                // }
                if (stokItem) {
                  
                  const adisyonIndex = adisyon.ITEMS.findIndex(
                    i => i.ID == stokItem.STOKID,
                  );
                  if (adisyonIndex < 0)
                    adisyon.ITEMS.unshift({ID: stokItem.STOKID, QUANTITY: 1});
                  else
                    adisyon.ITEMS[adisyonIndex].QUANTITY =
                      adisyon.ITEMS[adisyonIndex].QUANTITY + 1;
                }
                this.setState({});
              } else {
                Alert.alert('Bu barkoda ait ürün bulunamadı.');
              }
              this.setState({showBarcode: false});
            }}
            onClose={() => {
              this.setState({showBarcode: false});
            }}
          />
        </Modal>
        <Modal
          visible={this.state.showNfc || false}
          transparent={false}
          onRequestClose={() => {
            this.setState({showNfc: false});
          }}>
          <NfcReader
            onReadTag={async tag => {
              const isFind = await this.props.CustomerActions.getItem(tag);
              if (!isFind) Alert.alert('Kart Bilgisi Bulunamadı.');
              else {
                await this.props.CustomerActions.getTrans(tag);
                await this.props.CustomerActions.getFreeItems(
                  this.props.Customer.current.GUESTNO,
                );
                this.props.Adisyon.current.TABLENO = this.props.Table.current
                  ? this.props.Table.current.MASANO
                  : '';
                this.props.Adisyon.current.GUESTID = this.props.Customer.current
                  ? this.props.Customer.current.GUESTNO
                  : null;
                this.props.Adisyon.current.ITEMS = [];

                const isSuccess = await this.props.AdisyonActions.payItem(
                  this.props.Adisyon.current,
                  this.props.Customer.current,
                );
                if (isSuccess['Success']) {
                  Alert.alert('Tamam', 'Sipariş tamamlandı.');
                  this.props.navigation.navigate('TableSelect');
                } else {
                  // Alert.alert('Hata', isSuccess['Message']);
                }
              }
              this.setState({showNfc: false});
            }}
          />
          <CustomerInfo style={{height: 130, top: -10}} total={currentTotal} />
        </Modal>
        <Modal
          visible={this.state.showTableNo || false}
          transparent={true}
          onRequestClose={() => {
            this.setState({showTableNo: false});
          }}>
          <View
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: 'rgba(255,255,255,0.7)',
            }}>
            <View
              style={{
                flex: 1,
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                width: '80%',
                marginHorizontal: 20,
                borderRadius: 10,
                backgroundColor: '#fff',
                borderColor: colors.borderColor,
                borderWidth: 2,
              }}>
              <TextInput
                placeholder="Masa No"
                value={this.state.tableNo}
                style={{
                  backgroundColor: colors.buttonBackColor,
                  color: colors.inputTextColor,
                  width: '100%',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginVertical: 10,
                  marginHorizontal: 10,
                  textAlign: 'center',
                }}
                onChangeText={text => {
                  this.setState({tableNo: text});
                }}
              />
              <TouchableHighlight
                disabled={!this.state.tableNo}
                underlayColor="#ffffff00"
                style={{
                  backgroundColor: this.state.tableNo ? '#b329de' : '#ccc',
                  marginVertical: 10,
                  borderRadius: 50,
                  height: 50,

                  justifyContent: 'center',
                  flexDirection: 'row',
                  borderColor: this.state.tableNo ? '#b329de' : '#ccc',
                  borderWidth: 2,
                  paddingVertical: 10,
                  marginHorizontal: 5,
                  padding: 10,
                }}
                onPress={async () => {
                  this.props.TableActions.setCurrent({
                    MASANO: this.state.tableNo,
                    MASAGRUP: '',
                  });

                  this.setState({showTableNo: false});
                }}>
                <Text
                  style={{color: '#ffffff', fontWeight: 'bold', fontSize: 18}}>
                  Tamam
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <Modal
          visible={this.state.showConfirm || false}
          transparent={true}
          onRequestClose={() => {
            this.setState({showConfirm: false});
          }}>
          <View
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: 'rgba(255,255,255,0.7)',
            }}>
            <View
              style={{
                flex: 1,
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                width: '80%',
                marginHorizontal: 20,
                borderRadius: 10,
                backgroundColor: '#fff',
                borderColor: colors.borderColor,
                borderWidth: 2,
                padding: 10,
              }}>
              <Text style={{fontSize: 18}}>
                Sipariş tamamlanıp, ödeme işlemi gerçekleşecektir.
                Onaylıyormusunuz?
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'left',
                  fontWeight: 'bold',
                  alignSelf: 'flex-start',
                }}>
                Masa No
              </Text>
              <TextInput
                placeholder="Masa No"
                value={this.state.tableNo}
                style={{
                  backgroundColor: colors.buttonBackColor,
                  color: colors.inputTextColor,
                  width: '100%',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginVertical: 10,
                  marginHorizontal: 10,
                  textAlign: 'center',
                }}
                onChangeText={text => {
                  this.setState({tableNo: text});
                }}
              />
              <View style={{flexDirection: 'row'}}>
                <TouchableHighlight
                  underlayColor="#ffffff00"
                  style={{
                    width: '50%',
                    backgroundColor: colors.buttonBackColor,
                    borderRadius: 0,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    borderColor: colors.buttonBackColor,
                    padding: 10,
                  }}
                  onPress={async () => {
                    this.setState({showConfirm: false});
                  }}>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    İptal
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  disabled={!this.state.tableNo}
                  underlayColor="#ffffff00"
                  style={{
                    width: '50%',
                    backgroundColor: '#b329de',
                    borderRadius: 0,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    borderColor: '#b329de',
                    padding: 10,
                  }}
                  onPress={async () => {
                    this.props.TableActions.setCurrent({
                      MASANO: this.state.tableNo,
                      MASAGRUP: '',
                    });
                    this.props.Adisyon.current.TABLENO = this.props.Table
                      .current
                      ? this.props.Table.current.MASANO
                      : '';
                    this.props.Adisyon.current.POSCHECKTYPEID = this.props.Customer.current.POSCHECKTYPEID;
                    this.setState({showTableNo: false});
                    const items = [];
                    this.props.Adisyon.current.ITEMS.forEach(item => {
                      if (item.ISFREEITEM) {
                        const stokItem = this.props.Stok.items.find(
                          t => t.STOKID == item.ID,
                        );
                        const isAi =
            this.props.Customer.current &&
            stokItem &&
            this.props.Customer.current.ALLINCLUSIVE == true &&
            stokItem.INCLUDEDIN_AI == true &&
            this.props.Department.current.AIENABLED == true
              ? true
              : false;
                        const freeItem =!isAi ? this.getFreeItem(stokItem):null;
                        if(freeItem && item.ID in freeItem.UsedItems){
                          const usedItem=freeItem.UsedItems[item.ID];
                          if(usedItem.used>0){
                            items.push({
                              ...item,
                              ...{
                                QUANTITY:usedItem.used
                              }
                            })
                          }
                          if(usedItem.unused>0){
                            items.push({
                              ...item,
                              ...{
                                QUANTITY:usedItem.unused,
                                ISFREEITEM: false,
                                FREEITEMTRANSID: null
                              }
                            })
                          }
                        }
                        
                      } else {
                        items.push(item);
                      }
                    });
                    this.props.Adisyon.current.ITEMS = items;
                    const isSuccess = await this.props.AdisyonActions.payItem(
                      this.props.Adisyon.current,
                      this.props.Customer.current,
                    );

                    if (isSuccess) {
                      Alert.alert('Tamam', 'Sipariş tamamlandı.');
                      this.props.navigation.navigate('Nfc');
                    } else {
                      console.log(isSuccess);
                      // Alert.alert('Hata', isSuccess['Message']);
                      this.setState({showConfirm: false});
                    }
                  }}>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    Tamam
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>

        <NavigationEvents
          onWillFocus={this.handleComponentMount}
          onWillBlur={this.handleComponentUnmount}
        />
        {config.useAlagart ? (
          <React.Fragment>
            {!this.props.Table.current ? (
              <CustomerInfo
                style={{height: 130, top: 10}}
                total={currentTotal}
              />
            ) : null}
            {this.props.Table.current ? (
              <TableInfo style={{height: 120, top: 10}} total={currentTotal} />
            ) : null}
          </React.Fragment>
        ) : (
          <CustomerInfo style={{height: 130, top: 10}} total={currentTotal} />
        )}
        {!config.useAlagart && this.props.Department.useTable ? (
          <View
            style={{
              marginTop: 12,
              height: 50,
            }}>
            <TouchableHighlight
              underlayColor="#ffffff00"
              style={{
                flex: 1,
                backgroundColor: colors.buttonBackColor,
                borderRadius: 50,
                height: 50,
                justifyContent: 'center',
                flexDirection: 'row',
                borderWidth: 0,
                paddingVertical: 10,
                marginHorizontal: 5,
              }}
              onPressIn={async () => {
                this.setState({showTableNo: true});
              }}>
              <React.Fragment>
                <Icon name="chair" size={25} color={'#ffffff'} />
                <Text
                  style={{
                    color: '#ffffff',
                    marginLeft: 5,
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  {/* {this.props.Table.current && this.props.Table.current.MASANO ? "Masa No : " + this.props.Table.current.MASANO : "Masa Seçiniz"} */}
                  {this.state.tableNo
                    ? 'Masa No : ' + this.state.tableNo
                    : 'Masa Seçiniz'}
                </Text>
              </React.Fragment>
            </TouchableHighlight>
          </View>
        ) : null}
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
            marginHorizontal: 5,
          }}>
          <ScrollView
            keyboardDismissMode="on-drag"
            style={{flex: 1}}
            keyboardShouldPersistTaps="always">
            {this.props.Adisyon.current && this.props.Adisyon.current.ITEMS
              ? this.props.Adisyon.current.ITEMS.map((item, index) => {
                  const stok = this.props.Stok.items.find(
                    itm => itm.STOKID == item.ID,
                  );
                  const isAi =
                  this.props.Customer.current &&
                  stok &&
                  this.props.Customer.current.ALLINCLUSIVE == true &&
                  stok.INCLUDEDIN_AI == true &&
                  this.props.Department.current.AIENABLED == true
                    ? true
                    : false;
                  let freeItem =!isAi ? this.getFreeItem(stok):null;
                  return (
                    <AdisyonItem
                      key={index}
                      discountRate={discount}
                      department={this.props.Department.current}
                      item={item}
                      stok={stok}
                      freeItem={!isAi ? freeItem : null}
                      customer={this.props.Customer.current}
                      onAddPress={(stokId, change) => {
                        this.props.Adisyon.current.ITEMS.filter(
                          i => !i.OLD,
                        ).forEach(i => {
                          const stokItem = this.props.Stok.items.find(
                            t => t.STOKID == i.ID,
                          );
                          if (stokItem) {
                            const stokFiyat =
                              this.props.Customer.current &&
                              stokItem &&
                              this.props.Customer.current.ALLINCLUSIVE ==
                                true &&
                              stokItem.INCLUDEDIN_AI == true &&
                              this.props.Department.current.AIENABLED == true
                                ? 0
                                : stokItem.SFIYAT1;
                            currentTotal +=
                              i.QUANTITY *
                              (stokFiyat -
                                parseFloat(
                                  (stokFiyat * (+discount / 100)).toFixed(2),
                                ));
                          }
                        });
                        if (!change) item.QUANTITY = item.QUANTITY + 1;
                        if(freeItem!=null){
                          freeItem.TotalUsed++;
                          if(freeItem.TotalUsed<=(freeItem.QUANTITY-freeItem.USEDQUANTITY)){
                            if(freeItem.UsedItems[item.ID]){
                              if(!freeItem.UsedItems[item.ID].used){
                                freeItem.UsedItems[item.ID].used=0;
                                freeItem.UsedItems[item.ID].unused=0;
                              }
                              freeItem.UsedItems[item.ID].used++;
                            }else{
                              freeItem.UsedItems[item.ID]={used:1,unused:0};
                            }
                          }else{
                            if(freeItem.UsedItems[item.ID]){
                              if(freeItem.UsedItems[item.ID].used == null){
                                freeItem.UsedItems[item.ID].used=0;
                                freeItem.UsedItems[item.ID].unused=0;
                              }
                              freeItem.UsedItems[item.ID].unused++;
                            }else{
                              freeItem.UsedItems[item.ID]={used:0,unused:1};
                            }
                          }
                        }
                        this.setState({});
                      }}
                      onRemovePress={stokId => {
                        if (stokId && stokId.QUANTITY > 0) {
                          stokId.QUANTITY = stokId.QUANTITY - 1;
                          if (stokId.QUANTITY <= 0)
                            this.props.Adisyon.current.ITEMS.splice(index, 1);
                            if(freeItem!=null){
                              if(freeItem.TotalUsed>0 && item.QUANTITY >= 0){
                              freeItem.TotalUsed--;
                              }
                              if(freeItem.TotalUsed==0){
                                freeItem.UsedItems={};
                              }
                              
                              let totalused=0;
                              let totalunused=0;
                              Object.keys(freeItem.UsedItems).forEach(key=>{
                                totalused+=freeItem.UsedItems[key].used;
                                totalunused+=freeItem.UsedItems[key].unused;
                              });
                              if(item.ID in freeItem.UsedItems){
                                if(freeItem.UsedItems[item.ID].unused>0){
                                  freeItem.UsedItems[item.ID].unused--;
                                  totalunused--;
                                }else if(freeItem.UsedItems[item.ID].used>0){
                                  freeItem.UsedItems[item.ID].used--;
                                  totalused--;
                                }
                              if(freeItem.TotalUsed <= freeItem.QUANTITY-freeItem.USEDQUANTITY && totalunused>0){
                                Object.keys(freeItem.UsedItems).forEach(key=>{
                                  freeItem.UsedItems[key].used += freeItem.UsedItems[key].unused;
                                  freeItem.UsedItems[key].unused=0;;
                                });
                              }
  
                              }
                            }
                          this.setState({});
                        } else if (index >= 0) {
                          this.props.Adisyon.current.ITEMS.splice(index, 1);
                          if(freeItem!=null){
                            if(freeItem.TotalUsed>0 && item.QUANTITY >= 0){
                            freeItem.TotalUsed--;
                            }
                            if(freeItem.TotalUsed==0){
                              freeItem.UsedItems={};
                            }
                            
                            let totalused=0;
                            let totalunused=0;
                            Object.keys(freeItem.UsedItems).forEach(key=>{
                              totalused+=freeItem.UsedItems[key].used;
                              totalunused+=freeItem.UsedItems[key].unused;
                            });
                            if(item.ID in freeItem.UsedItems){
                              if(freeItem.UsedItems[item.ID].unused>0){
                                freeItem.UsedItems[item.ID].unused--;
                                totalunused--;
                              }else if(freeItem.UsedItems[item.ID].used>0){
                                freeItem.UsedItems[item.ID].used--;
                                totalused--;
                              }
                            if(freeItem.TotalUsed <= freeItem.QUANTITY-freeItem.USEDQUANTITY && totalunused>0){
                              Object.keys(freeItem.UsedItems).forEach(key=>{
                                freeItem.UsedItems[key].used += freeItem.UsedItems[key].unused;
                                freeItem.UsedItems[key].unused=0;;
                              });
                            }

                            }
                          }
                          this.setState({});
                        }
                        
                      }}
                    />
                  );
                })
              : null}
          </ScrollView>
        </View>
        <View
          style={{
            width: width,
            flex: 1,
            position: 'absolute',
            height: 60,
            flexDirection: 'row',
            bottom: 0,
            left: 0,
            padding: 0,
          }}>
          <TouchableHighlight
            underlayColor="#ffffff00"
            style={{
              flex: 1,
              backgroundColor: colors.buttonBackColor,
              borderRadius: 0,
              height: '100%',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              borderColor: colors.borderColor,
              borderWidth: 2,
              paddingVertical: 0,
              marginHorizontal: 0,
            }}
            onPressIn={() => {
              this.props.navigation.navigate('StokSelect');
            }}>
            <React.Fragment>
              <Icon
                name="plus"
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  textAlign: 'center',
                  width: '100%',
                }}
                size={25}
                color={colors.inputTextColor}
              />
              <Text
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  textAlign: 'center',
                  width: '100%',
                  color: colors.inputTextColor,
                  marginLeft: 5,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}>
                Ürün Ekle
              </Text>
            </React.Fragment>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#ffffff00"
            style={{
              flex: 1,
              backgroundColor: '#292fde',
              borderRadius: 0,
              height: '100%',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              borderColor: '#292fde',
              borderWidth: 2,
              paddingVertical: 0,
              marginHorizontal: 0,
              padding: 0,
            }}
            onPressIn={async () => {
              this.setState({showBarcode: true});
            }}>
            <React.Fragment>
              <Icon
                name="barcode"
                size={25}
                color={'#ffffff'}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  textAlign: 'center',
                  width: '100%',
                }}
              />
              <Text
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  textAlign: 'center',
                  width: '100%',
                  color: '#ffffff',
                  marginLeft: 5,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}>
                Barkod
              </Text>
            </React.Fragment>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#ffffff00"
            style={{
              flex: 1,
              backgroundColor: '#b329de',
              borderRadius: 0,
              height: '100%',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              borderColor: '#b329de',
              borderWidth: 2,
              paddingVertical: 0,
              marginHorizontal: 0,
              padding: 0,
            }}
            onPressIn={async () => {
              if (
                this.props.Customer.current &&
                currentTotal > this.props.Customer.current.BALANCE
              ) {
                Alert.alert('Uyarı', 'Yeterli bakiye yok');
                return;
              }
              if (
                this.props.Adisyon.current.ITEMS &&
                this.props.Adisyon.current.ITEMS.length > 0
              ) {
                if (this.props.Customer.current) {
                  this.setState({showConfirm: true});
                } else {
                  // this.setState({showNfc: true});
                }
              } else {
                Alert.alert(
                  'Ürün Seçin',
                  'Devam etmek için lütfen ürün seçin.',
                );
              }
            }}>
            <React.Fragment>
              <Icon
                name="money-bill"
                size={25}
                color={'#ffffff'}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  textAlign: 'center',
                  width: '100%',
                }}
              />
              <Text
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  textAlign: 'center',
                  width: '100%',
                  color: '#ffffff',
                  marginLeft: 5,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}>
                Öde
              </Text>
            </React.Fragment>
          </TouchableHighlight>
          {config.useAlagart && this.props.Table.current ? (
            <TouchableHighlight
              underlayColor="#ffffff00"
              style={{
                flex: 1,
                backgroundColor: '#de2974',
                borderRadius: 0,
                height: '100%',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                borderColor: '#de2974',
                borderWidth: 2,
                paddingVertical: 0,
                marginHorizontal: 0,
              }}
              onPressIn={async () => {
                if (
                  this.props.Adisyon.current.ITEMS &&
                  this.props.Adisyon.current.ITEMS.filter(i => !i.OLD).length >
                    0
                ) {
                  this.props.Adisyon.current.TABLENO = this.props.Table.current
                    ? this.props.Table.current.MASANO
                    : '';
                  this.props.Adisyon.current.POSCHECKTYPEID = this.props.Customer.current.POSCHECKTYPEID;
                  const isSuccess = await this.props.AdisyonActions.sendItem(
                    this.props.Adisyon.current,
                    this.props.Customer.current,
                  );
                  if (isSuccess) {
                    Alert.alert('Tamam', 'Sipariş tamamlandı.');
                    if (this.props.Department.useTable)
                      this.props.navigation.navigate('TableSelect');
                    else this.props.navigation.navigate('Nfc');
                  } else {
                    console.log(isSuccess);
                    // Alert.alert('Hata', isSuccess['Message']);
                  }
                } else {
                  Alert.alert(
                    'Ürün Seçin',
                    'Devam etmek için lütfen ürün seçin.',
                  );
                }
              }}>
              <React.Fragment>
                <Icon
                  name="share-square"
                  size={25}
                  color={'#ffffff'}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    textAlign: 'center',
                    width: '100%',
                  }}
                />
                <Text
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    textAlign: 'center',
                    width: '100%',
                    color: '#ffffff',
                    marginLeft: 5,
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  Sipariş
                </Text>
              </React.Fragment>
            </TouchableHighlight>
          ) : null}
        </View>
      </React.Fragment>
    );
  }
}

export const Adisyon = withNavigation(
  connect(
    (state: ApplicationState) => state,
    dispatch => {
      return {
        TableActions: bindActionCreators({...TableActions}, dispatch),
        AdisyonActions: bindActionCreators({...AdisyonActions}, dispatch),
        CustomerActions: bindActionCreators({...CustomerActions}, dispatch),
        ActivityOrderActions: bindActionCreators(
          {...ActivityOrderActions},
          dispatch,
        ),
      };
    },
  )(AdisyonScreen),
);
