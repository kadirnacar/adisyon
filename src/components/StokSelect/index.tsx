import {IAdisyon, IStok, IStokGrup} from '@models';
import {StokActions} from '@reducers';
import {ApplicationState} from '@store';
import {distinct} from '@utils';
import fuzzysort from 'fuzzysort';
import React, {Component} from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  Modal,
  StyleProp,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import NumberFormat from 'react-number-format';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {colors} from '../colors';
import {GroupItem} from './GroupItem';
import {StokItem} from './StokItem';

const {width, scale, height} = Dimensions.get('window');

interface StokSelectState {
  selectedGrup?: IStokGrup;
  groupIds?: number[];
  search?: string;
  source?: IStok[];
  scrollIndex: number;
  showExchange: boolean;
  currentFiyat: number;
  exchangeText: string;
}

interface StokSelectProps {
  style?: StyleProp<ViewStyle>;
  adisyon: IAdisyon;
  onlyList?: boolean;
  isSelected?: boolean;
  onPress?: (adisyon: IAdisyon) => void;
}
type Props = NavigationInjectedProps & StokSelectProps & ApplicationState;

class StokSelectInfoComp extends Component<Props, StokSelectState> {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      source: [],
      groupIds: [],
      scrollIndex: 0,
      showExchange: false,
      currentFiyat: 0,
      exchangeText: '',
    };
  }

  componentDidMount() {
    const source = this.props.Stok.items.filter(t =>
      t.departments
        ? t.departments.indexOf(this.props.Department.current.KODU) > -1
        : false,
    );
    const groups = source.map(x => x.STOKGRUPID).filter(distinct);
    this.setState({
      source,
      groupIds: groups,
    });
  }
  searchData(search: string) {
    return fuzzysort
      .go(search, this.state.source, {
        limit: 20,
        allowTypo: true,
        threshold: -50000,
        keys: ['ADI', 'group.ADI'],
      })
      .map(i => i.obj);
  }
  render() {
    return (
      <React.Fragment>
        <Modal
          visible={this.state.showExchange || false}
          transparent={true}
          onRequestClose={() => {
            this.setState({showExchange: false, exchangeText: ''});
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
                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <Text>{this.state.exchangeText} </Text>
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
                  this.setState({showExchange: false, exchangeText: ''});
                }}
              />
              {/* <TouchableHighlight
                                underlayColor="#ffffff00" style={{
                                    width: "100%",

                                    backgroundColor: "#b329de",
                                    marginVertical: 10,
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
                                >
                                <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Tamam</Text>
                            </TouchableHighlight> */}
            </View>
          </View>
        </Modal>

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
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.borderColor,
                flexDirection: 'column',
                width: '70%',
                marginRight: 5,
              }}>
              {this.props.adisyon || this.props.onlyList == true ? (
                <FlatList
                  keyboardDismissMode="on-drag"
                  style={{flex: 1}}
                  keyboardShouldPersistTaps="always"
                  updateCellsBatchingPeriod={10}
                  windowSize={20}
                  maxToRenderPerBatch={20}
                  initialNumToRender={10}
                  removeClippedSubviews={true}
                  data={(this.state.source && this.state.search
                    ? this.searchData(this.state.search)
                    : this.state.source
                    ? this.state.source
                    : []
                  ).filter(stk =>
                    this.state.selectedGrup &&
                    this.state.selectedGrup.STOKGRUPID
                      ? stk.STOKGRUPID == this.state.selectedGrup.STOKGRUPID
                      : true,
                  )}
                  renderItem={({item, index}) => {
                    let adisyonItem =
                      !this.props.onlyList && this.props.adisyon.ITEMS
                        ? this.props.adisyon.ITEMS.find(
                            itm => itm.ID == item.STOKID && !itm.OLD,
                          )
                        : null;
                    let discountRate = this.props.Customer.current
                      ? this.props.Customer.current.POSDISCOUNTPERCENT
                      : 0;
                    if (!adisyonItem)
                      adisyonItem = {ID: item.STOKID, QUANTITY: 0};

                    const isAi =
                      this.props.Customer.current &&
                      this.props.Department.current &&
                      item &&
                      this.props.Customer.current.ALLINCLUSIVE == true &&
                      item.INCLUDEDIN_AI == true &&
                      this.props.Department.current.AIENABLED == true
                        ? true
                        : false;
                    adisyonItem.ISAI = isAi;
                    let isFree = this.props.Customer.freeItems
                      ? this.props.Customer.freeItems[item.STOKID.toString()] !=
                        null
                      : false;
                    if (!isFree)
                      isFree = this.props.Customer.freeGroups
                        ? this.props.Customer.freeGroups[
                            item.STOKGRUPID.toString()
                          ] != null
                        : false;

                    return (
                      <StokItem
                        discountRate={discountRate}
                        stok={item}
                        isFree={isFree}
                        addable={!this.props.onlyList}
                        item={adisyonItem}
                        department={this.props.Department.current}
                        onShowExhange={fiyat => {
                          this.setState({
                            showExchange: true,
                            currentFiyat: fiyat,
                            exchangeText: item.ADI,
                          });
                        }}
                        onTextActive={item => {
                          this.setState({scrollIndex: index});
                        }}
                        onAddPress={itm => {
                          const {adisyon} = this.props;

                          let currentTotal = 0;
                          let count = 1;
                          adisyon.ITEMS.filter(i => !i.OLD).forEach(i => {
                            const stokItem = this.props.Stok.items.find(
                              t => t.STOKID == i.ID,
                            );
                            currentTotal += i.QUANTITY * stokItem.SFIYAT1;
                          });

                          const stokItem = this.props.Stok.items.find(
                            t => t.STOKID == itm.ID,
                          );
                          // if (
                          //   this.props.Customer.current &&
                          //   currentTotal + stokItem.SFIYAT1 * count >
                          //     this.props.Customer.current.BALANCE
                          // ) {
                          //   Alert.alert('Uyarı', 'Yeterli bakiye yok');
                          //   return;
                          // }

                          const adisyonIndex = adisyon.ITEMS.findIndex(
                            i => i.ID == itm.ID && !i.OLD,
                          );
                          if (adisyonIndex < 0) adisyon.ITEMS.unshift(itm);
                          itm.QUANTITY = itm.QUANTITY + count;
                          if (this.props.onPress) this.props.onPress(adisyon);
                          this.setState({});
                        }}
                        onRemovePress={itm => {
                          const {adisyon} = this.props;
                          const adisyonIndex = adisyon.ITEMS.findIndex(
                            i => i.ID == itm.ID && !i.OLD,
                          );
                          if (itm.QUANTITY - 1 > 0) {
                            itm.QUANTITY = itm.QUANTITY - 1;
                          } else if (adisyonIndex >= 0) {
                            adisyon.ITEMS.splice(adisyonIndex, 1);
                          }
                          if (this.props.onPress) this.props.onPress(adisyon);
                        }}
                      />
                    );
                  }}
                  numColumns={1}
                  keyExtractor={(item, index) => item.STOKID.toString()}
                />
              ) : null}
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.borderColor,
                flexDirection: 'column',
                width: '30%',
              }}>
              <FlatList
                ListHeaderComponent={
                  <GroupItem
                    selected={
                      !this.state.selectedGrup ||
                      this.state.selectedGrup.STOKGRUPID == 0
                    }
                    group={{ADI: 'Hepsi', STOKGRUPID: 0, color: '#ffffff'}}
                    onPress={group => {
                      this.setState({selectedGrup: group});
                    }}
                  />
                }
                keyboardDismissMode="on-drag"
                style={{flex: 1}}
                keyboardShouldPersistTaps="always"
                data={
                  this.props.StokGrup && this.props.StokGrup.items
                    ? this.props.StokGrup.items.filter(
                        g => this.state.groupIds.indexOf(g.STOKGRUPID) > -1,
                      )
                    : []
                }
                updateCellsBatchingPeriod={10}
                windowSize={20}
                maxToRenderPerBatch={20}
                initialNumToRender={10}
                removeClippedSubviews={true}
                renderItem={({item, index}) => {
                  return (
                    <GroupItem
                      key={index}
                      group={item}
                      selected={this.state.selectedGrup == item}
                      index={index}
                      onPress={group => {
                        this.setState({selectedGrup: group});
                      }}
                    />
                  );
                }}
                numColumns={1}
                keyExtractor={(item, index) => item.STOKGRUPID.toString()}
              />
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
      </React.Fragment>
    );
  }
}

export const StokSelect = withNavigation(
  connect(
    (state: ApplicationState) => state,
    dispatch => {
      return {
        StokSelectActions: bindActionCreators({...StokActions}, dispatch),
      };
    },
  )(StokSelectInfoComp),
);
