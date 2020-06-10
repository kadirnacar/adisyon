import {colors, LoaderSpinner} from '@components';
import {
  ActivityActions,
  ApplicationActions,
  Applications,
  CustomerActions,
  DepartmentActions,
  ExchangeActions,
  GarsonActions,
  StokActions,
  StokGrupActions,
  UserActions,
} from '@reducers';
import {ApplicationState} from '@store';
import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FileService} from '@services';
import {setStore, store} from '../../tools/store';

const activityLogo = require('../../../assets/dolphin.png');
const turnikeLogo = require('../../../assets/turnike.png');
const {height, width} = Dimensions.get('window');

interface AppSelectorState {
  loading?: boolean;
}

interface AppSelectorProps {
  ApplicationActions: typeof ApplicationActions;
  UserActions: typeof UserActions;
  CustomerActions: typeof CustomerActions;
  GarsonActions: typeof GarsonActions;
  DepartmentActions: typeof DepartmentActions;
  StokActions: typeof StokActions;
  StokGrupActions: typeof StokGrupActions;
  ActivityActions: typeof ActivityActions;
  ExchangeActions: typeof ExchangeActions;
}

type Props = NavigationInjectedProps & AppSelectorProps & ApplicationState;

class AppSelectorScreen extends Component<Props, AppSelectorState> {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Uygulama Seçiniz',
      headerRight: props => {
        return (
          <View style={{flexDirection: 'row'}}>
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
                navigation.navigate('CustomerTrans', {current: true});
              }}>
              <FontAwesome5Icon name="user" size={25} color={'#fff'} />
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#ffffff00"
              style={{
                borderRadius: 40,
                borderColor: colors.borderColor,
                borderWidth: 2,
                padding: 5,
                marginRight: 5,
              }}
              onPressIn={async () => {
                if (store) {
                  await DepartmentActions.getItems()(
                    store.dispatch,
                    store.getState,
                  );
                  await ExchangeActions.getItems()(
                    store.dispatch,
                    store.getState,
                  );
                  await ActivityActions.getItems(new Date())(
                    store.dispatch,
                    store.getState,
                  );
                  await ActivityActions.getTurnikeItems(new Date())(
                    store.dispatch,
                    store.getState,
                  );
                  await StokActions.getItems()(store.dispatch, store.getState);
                }
              }}>
              <FontAwesome5Icon name="sync" size={25} color={'#fff'} />
            </TouchableHighlight>
          </View>
        );
      },
    };
  };
  constructor(props) {
    super(props);
    this.state = {loading: false};
  }
  async componentDidMount() {
    if (FileService.date.getDate() < new Date().getDate()) {
      this.setState({loading: true}, async () => {
        await this.loadDataFromServer();
      });
    }
  }
  async loadDataFromServer() {
    await this.props.DepartmentActions.getItems();
    await this.props.ExchangeActions.getItems();
    await this.props.ActivityActions.getItems(new Date());
    await this.props.ActivityActions.getTurnikeItems(new Date());
    await this.props.StokActions.getItems();
    this.setState({loading: false});
  }
  render() {
    const {container} = styles;
    return (
      <SafeAreaView style={container}>
        <LoaderSpinner
          infoText="Veriler Güncelleniyor..."
          showLoader={this.props.Stok.isRequest}
          onCloseModal={async () => {}}
        />
        <View
          style={{
            width: width,
            alignContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <TouchableHighlight
            underlayColor="#ffffff00"
            style={{
              padding: 0,
              marginTop: 10,
              alignContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              width: 160,
              height: 160,
              borderRadius: 160 / 2,
              borderColor: colors.borderColor,
              borderWidth: 2,
              backgroundColor: '#8487e4',
            }}
            onPressIn={async () => {
              await this.props.ApplicationActions.setCurrent(
                Applications.Siparis,
              );
              await this.props.ApplicationActions.setNfcTitle('F&B');
              this.props.navigation.navigate('Department');
            }}>
            <View
              style={{
                alignItems: 'center',
                alignContent: 'center',
                alignSelf: 'center',
              }}>
              <MaterialIcon name="food" size={60} color={'#fff'} />
              <Text
                style={{
                  fontSize: 34,
                  height: 50,
                  color: '#fff',
                  marginTop: 0,
                  flexWrap: 'nowrap',
                  textAlignVertical: 'center',
                  textAlign: 'center',
                }}>
                F&B
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#ffffff00"
            style={{
              padding: 0,
              marginTop: 10,
              alignContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              width: 160,
              height: 160,
              borderRadius: 160 / 2,
              borderColor: colors.borderColor,
              borderWidth: 2,
              backgroundColor: '#d584e4',
            }}
            onPressIn={async () => {
              await this.props.ApplicationActions.setNfcTitle('Aktivite');
              this.props.navigation.navigate('ActiviteTypeSelector');
            }}>
            <View
              style={{
                alignItems: 'center',
                alignContent: 'center',
                alignSelf: 'center',
              }}>
              <Image
                source={activityLogo}
                resizeMethod={'resize'}
                style={{
                  width: 70,
                  height: 70,
                }}
              />
              <Text
                style={{
                  fontSize: 34,
                  height: 50,
                  color: '#fff',
                  marginTop: 0,
                  flexWrap: 'nowrap',
                  textAlignVertical: 'center',
                  textAlign: 'center',
                }}>
                Aktivite
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#ffffff00"
            style={{
              padding: 0,
              marginTop: 10,
              alignContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              width: 160,
              height: 160,
              borderRadius: 160 / 2,
              borderColor: colors.borderColor,
              borderWidth: 2,
              backgroundColor: '#84c9e4',
            }}
            onPressIn={async () => {
              // await this.props.ApplicationActions.setCurrent(Applications.Turnike);
              // this.props.navigation.navigate("Turnike");
              await this.props.ApplicationActions.setCurrent(
                Applications.AktiviteKontrol,
              );
              await this.props.ApplicationActions.setNfcTitle('Turnike Geçiş');
              this.props.navigation.navigate('TurnikeCheck');
            }}>
            <View
              style={{
                alignItems: 'center',
                alignContent: 'center',
                alignSelf: 'center',
              }}>
              <Image
                source={turnikeLogo}
                resizeMethod={'resize'}
                style={{
                  marginTop: 5,
                  width: 70,
                  height: 70,
                }}
              />
              <Text
                style={{
                  fontSize: 34,
                  height: 50,
                  color: '#fff',
                  marginTop: 0,
                  flexWrap: 'nowrap',
                  textAlignVertical: 'center',
                  textAlign: 'center',
                }}>
                Turnike
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }
}

export const AppSelector = withNavigation(
  connect(
    (state: ApplicationState) => state,
    dispatch => {
      return {
        ApplicationActions: bindActionCreators(
          {...ApplicationActions},
          dispatch,
        ),
        ExchangeActions: bindActionCreators({...ExchangeActions}, dispatch),
        UserActions: bindActionCreators({...UserActions}, dispatch),
        CustomerActions: bindActionCreators({...CustomerActions}, dispatch),
        GarsonActions: bindActionCreators({...GarsonActions}, dispatch),
        DepartmentActions: bindActionCreators({...DepartmentActions}, dispatch),
        StokActions: bindActionCreators({...StokActions}, dispatch),
        StokGrupActions: bindActionCreators({...StokGrupActions}, dispatch),
        ActivityActions: bindActionCreators({...ActivityActions}, dispatch),
      };
    },
  )(AppSelectorScreen),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
