import {colors} from '../colors';
import {IActivity, IActivityOrder} from '@models';
import {ActivityActions} from '@reducers';
import {ApplicationState} from '@store';
import fuzzysort from 'fuzzysort';
import moment from 'moment';
import React, {Component} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Modal,
  StyleProp,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import NumberFormat from 'react-number-format';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {OrderItem} from './OrderItem';

const {width, scale, height} = Dimensions.get('window');

interface ActivitySelectState {
  search?: string;
  source?: IActivity[];
  scrollIndex: number;
  showExchange: boolean;
  currentFiyat: number;
  date?: Date;
}

interface ActivitySelectProps {
  style?: StyleProp<ViewStyle>;
  order: IActivityOrder;
  onPress?: (adisyon: IActivityOrder) => void;
  ActivityActions: typeof ActivityActions;
}
type Props = NavigationInjectedProps & ActivitySelectProps & ApplicationState;

class ActivitySelectInfoComp extends Component<Props, ActivitySelectState> {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      source: [],
      scrollIndex: 0,
      currentFiyat: 0,
      showExchange: false,
      date: new Date(),
    };
  }

  componentDidMount() {
    const source = this.props.Activity.items;
    this.setState({
      source,
      date: this.props.Activity.date,
    });
  }
  searchData(search: string) {
    return fuzzysort
      .go(search, this.state.source, {
        limit: 20,
        allowTypo: true,
        threshold: -50000,
        key: 'NAME',
      })
      .map(i => i.obj);
  }
  render() {
    return (
      <View
        style={{
          width: width,
          height: height - 70,
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            width: width - 5,
            height: height,
            flexDirection: 'row',
            marginBottom: 0,
            padding: 5,
            paddingBottom: 0,
          }}>
          <Modal
            visible={this.state.showExchange || false}
            transparent={true}
            onRequestClose={() => {
              this.setState({showExchange: false});
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
                  padding: 20,
                  marginHorizontal: 20,
                  borderRadius: 10,
                  backgroundColor: '#fff',
                  borderColor: colors.borderColor,
                  borderWidth: 2,
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    alignContent: 'flex-start',
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold'}}>Fiyat Bilgisi </Text>
                  </View>
                  {this.props.Exchange && this.props.Exchange.items
                    ? this.props.Exchange.items.map((ex, index) => {
                        if (
                          ex.TOCUR == 'TRY' ||
                          ex.TOCUR == 'EUR' ||
                          ex.TOCUR == 'USD'
                        ) {
                          return (
                            <View
                              key={index}
                              style={{
                                flexDirection: 'row',
                                alignContent: 'flex-start',
                                alignItems: 'flex-start',
                                alignSelf: 'flex-start',
                              }}>
                              <Text>{ex.TOCUR} : </Text>
                              <NumberFormat
                                value={this.state.currentFiyat * ex.RATE}
                                displayType={'text'}
                                decimalScale={2}
                                thousandSeparator={true}
                                renderText={value => (
                                  <Text
                                    style={{
                                      textDecorationLine: 'underline',
                                    }}>
                                    {value}
                                  </Text>
                                )}
                              />
                            </View>
                          );
                        } else {
                          return null;
                        }
                      })
                    : null}
                </View>
                <Button
                  title="Tamam"
                  onPress={async () => {
                    this.setState({showExchange: false});
                  }}
                />
              </View>
            </View>
          </Modal>

          <View
            style={{
              borderWidth: 1,
              borderColor: colors.borderColor,
              flexDirection: 'column',
              width: '100%',
              marginRight: 5,
            }}>
            <View
              style={{
                borderColor: colors.borderColor,
                borderBottomWidth: 1,
                flexDirection: 'row',
                width: '100%',
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <TouchableHighlight
                disabled={this.state.date <= new Date()}
                onPress={() => {
                  this.setState(
                    {
                      date: moment(this.state.date)
                        .add(-1, 'day')
                        .toDate(),
                    },
                    () => {
                      this.props.ActivityActions.getItems(this.state.date);
                      this.setState({source: this.props.Activity.items});
                    },
                  );
                }}
                style={{
                  backgroundColor: colors.buttonBackColor,
                  width: 35,
                  height: 35,
                  borderRadius: 18,
                  borderWidth: 2,
                  margin: 5,
                  borderColor: colors.borderColor,
                  padding: 3,
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <FontAwesome5Icon name="chevron-left" size={25} color="#fff" />
              </TouchableHighlight>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                }}>
                {moment(this.state.date).format('DD.MM.YYYY')}
              </Text>
              <TouchableHighlight
                onPress={() => {
                  this.setState(
                    {
                      date: moment(this.state.date)
                        .add(1, 'day')
                        .toDate(),
                    },
                    () => {
                      this.props.ActivityActions.getItems(this.state.date);
                      this.setState({source: this.props.Activity.items});
                    },
                  );
                }}
                style={{
                  backgroundColor: colors.buttonBackColor,
                  width: 35,
                  height: 35,
                  borderRadius: 18,
                  borderWidth: 2,
                  margin: 5,
                  borderColor: colors.borderColor,
                  padding: 3,
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <FontAwesome5Icon name="chevron-right" size={25} color="#fff" />
              </TouchableHighlight>
            </View>
            {this.props.order ? (
              <FlatList
                keyboardDismissMode="on-drag"
                style={{flex: 1}}
                keyboardShouldPersistTaps="always"
                updateCellsBatchingPeriod={10}
                windowSize={10}
                maxToRenderPerBatch={10}
                initialNumToRender={10}
                removeClippedSubviews={false}
                data={
                  this.state.source && this.state.search
                    ? this.searchData(this.state.search)
                    : this.state.source
                    ? this.state.source
                    : []
                }
                renderItem={({item, index}) => {
                  let adisyonItem = this.props.order.ITEMS
                    ? this.props.order.ITEMS.find(itm => itm.ItemID == item.ID)
                    : null;
                  if (!adisyonItem)
                    adisyonItem = {ItemID: item.ID, Quantity: 0};
                  return (
                    <OrderItem
                      activity={item}
                      item={adisyonItem}
                      onShowExhange={fiyat => {
                        this.setState({
                          showExchange: true,
                          currentFiyat: fiyat,
                        });
                      }}
                      onTextActive={item => {
                        this.setState({scrollIndex: index});
                      }}
                      onAddPress={itm => {
                        const {order} = this.props;

                        let currentTotal = 0;

                        order.ITEMS.forEach(i => {
                          const stokItem = this.props.Activity.items.find(
                            t => t.ID == i.ItemID,
                          );
                          currentTotal += i.Quantity * stokItem.ADULTPRICE;
                        });
                        const activityItem = this.props.Activity.items.find(
                          t => t.ID == itm.ItemID,
                        );
                        if (
                          currentTotal + activityItem.ADULTPRICE >
                          this.props.Customer.current.BALANCE
                        ) {
                          Alert.alert('Uyarı', 'Yeterli bakiye yok');
                          return;
                        }

                        const adisyonIndex = order.ITEMS.findIndex(
                          i => i.ItemID == itm.ItemID,
                        );
                        if (adisyonIndex < 0) order.ITEMS.unshift(itm);
                        itm.Quantity = itm.Quantity + 1;
                        if (this.props.onPress) this.props.onPress(order);
                        this.setState({});
                      }}
                      onRemovePress={itm => {
                        const {order} = this.props;
                        const adisyonIndex = order.ITEMS.findIndex(
                          i => i.ItemID == itm.ItemID,
                        );
                        if (itm.Quantity - 1 > 0) {
                          itm.Quantity = itm.Quantity - 1;
                        } else if (adisyonIndex >= 0) {
                          order.ITEMS.splice(adisyonIndex, 1);
                        }
                        if (this.props.onPress) this.props.onPress(order);
                      }}
                    />
                  );
                }}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : null}
          </View>
        </View>

        <TextInput
          placeholder="Tüm ürünlerde ara"
          autoFocus={true}
          clearButtonMode="always"
          clearTextOnFocus
          onChangeText={text => {
            this.setState({search: text});
          }}
          style={{
            color: colors.inputTextColor,
            backgroundColor: '#fff',
            borderColor: colors.borderColor,
            borderWidth: 1,
            paddingVertical: 5,
            marginHorizontal: 5,
            marginTop: 5,
            paddingHorizontal: 15,
            textAlign: 'left',
            fontSize: 20,
            borderRadius: 0,
          }}
        />
      </View>
    );
  }
}

export const ActivitySelect = withNavigation(
  connect(
    (state: ApplicationState) => state,
    dispatch => {
      return {
        ActivitySelectActions: bindActionCreators(
          {...ActivityActions},
          dispatch,
        ),
        ActivityActions: bindActionCreators({...ActivityActions}, dispatch),
      };
    },
  )(ActivitySelectInfoComp),
) as any;
