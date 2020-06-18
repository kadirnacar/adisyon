import {
  ActivityOrderItem,
  colors,
  CustomerInfo,
  LoaderSpinner,
} from '@components';
import {ActivityOrderActions, EcrActions} from '@reducers';
import {ApplicationState} from '@store';
import 'intl';
import 'intl/locale-data/jsonp/tr';
import React, {Component} from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  Text,
  TouchableHighlight,
  View,
  Picker,
} from 'react-native';
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
const {width, scale, height} = Dimensions.get('window');

interface AktiviteState {}

interface AktiviteProps {
  ActivityOrderActions: typeof ActivityOrderActions;
  EcrActions: typeof EcrActions;
}
type Props = NavigationInjectedProps & AktiviteProps & ApplicationState;

class AktiviteScreen extends Component<Props, AktiviteState> {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Aktivite',
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
    this.state = {};
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
    if (!this.props.ActivityOrder.current) {
      this.props.ActivityOrderActions.setCurrent({
        GARSONID: this.props.Garson.current.STAFFID,
        GUESTID: this.props.Customer.current.GUESTNO,
        ITEMS: [],
        NOTES: '',
      });
    }
    this.setState({});
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  async handleComponentUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  render() {
    let currentTotal = 0;
    this.props.ActivityOrder.current && this.props.ActivityOrder.current.ITEMS
      ? this.props.ActivityOrder.current.ITEMS.forEach(i => {
          const stokItem = this.props.Activity.items.find(
            t => t.ID == i.ItemID,
          );
          if (stokItem) currentTotal += i.Quantity * stokItem.ADULTPRICE;
        })
      : null;
    return (
      <React.Fragment>
        <LoaderSpinner
          showLoader={
            this.props.ActivityOrder.isRequest || this.props.Activity.isRequest
          }
          onCloseModal={async () => {
            this.setState({
              errorMessage: '',
              password: null,
            });
            await this.props.ActivityOrderActions.setCurrent({
              GARSONID: this.props.Garson.current.STAFFID,
              ITEMS: [],
              NOTES: '',
            });
          }}
        />
        <NavigationEvents
          onWillFocus={this.handleComponentMount}
          onWillBlur={this.handleComponentUnmount}
        />
        <CustomerInfo style={{height: 130, margin: 5}} total={currentTotal} />
        <View
          style={{
            flex: 0,
            height: 50,
            flexDirection: 'row',
            backgroundColor: colors.transparentBackColor,
            borderRadius: 10,
            borderColor: colors.borderColor,
            borderWidth: 2,
            padding: 5,
            margin: 5,
          }}>
          <Text style={{flex: 1, height: 35, textAlignVertical: 'center'}}>
            Yazarkasa :{' '}
          </Text>
          <View
            style={{
              flex: 3,
              backgroundColor: colors.inputBackColor,
              borderRadius: 5,
            }}>
            <Picker
              selectedValue={
                this.props.Ecr.current ? this.props.Ecr.current.ID : null
              }
              style={{height: 35}}
              onValueChange={(itemValue, itemIndex) => {
                if (this.props.Ecr.items)
                  this.props.EcrActions.setCurrent(
                    this.props.Ecr.items.find(itm => itm.ID == itemValue),
                  );
              }}>
              <Picker.Item label="Seçiniz.." value="" />
              {this.props.Ecr.items
                ? this.props.Ecr.items.map((itm, index) => (
                    <Picker.Item key={index} label={itm.NAME} value={itm.ID} />
                  ))
                : null}
            </Picker>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            width: width - 10,
            top: 0,
            marginBottom: 70,
            backgroundColor: colors.transparentBackColor,
            borderRadius: 10,
            borderColor: colors.borderColor,
            borderWidth: 2,
            padding: 5,
            margin: 5,
          }}>
          <ScrollView
            keyboardDismissMode="on-drag"
            style={{flex: 1}}
            keyboardShouldPersistTaps="always">
            {this.props.ActivityOrder.current &&
            this.props.ActivityOrder.current.ITEMS
              ? this.props.ActivityOrder.current.ITEMS.map((item, index) => {
                  const stok = this.props.Activity.items.find(
                    itm => itm.ID == item.ItemID,
                  );
                  return (
                    <ActivityOrderItem
                      key={index}
                      item={item}
                      activity={stok}
                      onAddPress={(stokId, change) => {
                        let currentTotal = 0;
                        let itemPrice = 0;
                        this.props.ActivityOrder.current.ITEMS.forEach(i => {
                          const stokItem = this.props.Activity.items.find(
                            t => t.ID == i.ItemID,
                          );
                          currentTotal += i.Quantity * stokItem.ADULTPRICE;
                          if (stokItem.ID == stokId.ItemID)
                            itemPrice = stokItem.ADULTPRICE;
                        });

                        if (
                          currentTotal + itemPrice >
                          this.props.Customer.current.BALANCE
                        ) {
                          Alert.alert('Uyarı', 'Yeterli bakiye yok');
                          return;
                        }
                        if (!change) item.Quantity = item.Quantity + 1;
                        this.setState({});
                      }}
                      onRemovePress={stokId => {
                        if (stokId && stokId.Quantity > 0) {
                          stokId.Quantity = stokId.Quantity - 1;
                          if (stokId.Quantity <= 0)
                            this.props.ActivityOrder.current.ITEMS.splice(
                              index,
                              1,
                            );
                          this.setState({});
                        } else if (index >= 0) {
                          this.props.ActivityOrder.current.ITEMS.splice(
                            index,
                            1,
                          );
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
            position: 'absolute',
            height: 70,
            flexDirection: 'row',
            bottom: 0,
            left: 0,
            padding: 5,
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
              borderColor: colors.borderColor,
              borderWidth: 2,
              paddingVertical: 10,
              marginHorizontal: 5,
            }}
            onPressIn={() => {
              this.props.navigation.navigate('ActivitySelect');
            }}>
            <React.Fragment>
              <Icon name="plus" size={25} color={colors.inputTextColor} />
              <Text
                style={{
                  color: colors.inputTextColor,
                  marginLeft: 5,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Aktivite Ekle
              </Text>
            </React.Fragment>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#ffffff00"
            style={{
              flex: 1,
              backgroundColor: '#b329de',
              borderRadius: 50,
              height: 50,
              justifyContent: 'center',
              flexDirection: 'row',
              borderColor: '#b329de',
              borderWidth: 2,
              paddingVertical: 10,
              marginHorizontal: 5,
              padding: 10,
            }}
            onPressIn={async () => {
              if (this.props.Ecr.current && this.props.Ecr.current.ID > 0) {
                if (this.props.ActivityOrder.current.ITEMS.length > 0) {
                  const isSuccess = await this.props.ActivityOrderActions.sendItem(
                    this.props.ActivityOrder.current,
                    this.props.Ecr.current.ID,
                  );
                  if (isSuccess['SUCCESS']) {
                    Alert.alert('Tamam', 'Sipariş tamamlandı.');
                    this.props.navigation.navigate('Nfc');
                  } else {
                    // Alert.alert("Hata", isSuccess["Message"]);
                  }
                } else {
                  Alert.alert(
                    'Ürün Seçin',
                    'Devam etmek için lütfen ürün seçin.',
                  );
                }
              } else {
                Alert.alert(
                  'Yazarkasa',
                  'Devam etmek için lütfen yazarkasa seçin.',
                );
              }
            }}>
            <React.Fragment>
              <Icon name="share-square" size={25} color={'#ffffff'} />
              <Text
                style={{
                  color: '#ffffff',
                  marginLeft: 5,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Tamamla
              </Text>
            </React.Fragment>
          </TouchableHighlight>
        </View>
      </React.Fragment>
    );
  }
}

export const Aktivite = withNavigation(
  connect(
    (state: ApplicationState) => state,
    dispatch => {
      return {
        ActivityOrderActions: bindActionCreators(
          {...ActivityOrderActions},
          dispatch,
        ),
        EcrActions: bindActionCreators({...EcrActions}, dispatch),
      };
    },
  )(AktiviteScreen),
);
