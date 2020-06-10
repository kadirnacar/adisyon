import {colors, LoaderSpinner} from '@components';
import {
  ActivityActions,
  CustomerActions,
  DepartmentActions,
  ExchangeActions,
  GarsonActions,
  StokActions,
  StokGrupActions,
  UserActions,
} from '@reducers';
import {UpdaterService, FileService} from '@services';
import {ApplicationState} from '@store';
import * as path from 'path';
import React, {Component} from 'react';
import {
  Dimensions,
  Modal,
  ProgressBarAndroid,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import RNApkInstallerN from 'react-native-apk-installer-n';
import RNFS from 'react-native-fs';
import SafeAreaView from 'react-native-safe-area-view';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import VersionNumber from 'react-native-version-number';
import {
  NavigationEventPayload,
  NavigationEvents,
  NavigationInjectedProps,
  withNavigation,
} from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import config from '@config';

const {width, scale, height} = Dimensions.get('window');

interface LoginState {
  errorMessage?: string;
  username?: string;
  password?: string;
  isRequest: boolean;
  showDownloader?: boolean;
  downloadPercent?: number;
}

interface UserProps {
  UserActions: typeof UserActions;
  CustomerActions: typeof CustomerActions;
  GarsonActions: typeof GarsonActions;
  DepartmentActions: typeof DepartmentActions;
  StokActions: typeof StokActions;
  StokGrupActions: typeof StokGrupActions;
  ActivityActions: typeof ActivityActions;
  ExchangeActions: typeof ExchangeActions;
}

type Props = NavigationInjectedProps & UserProps & ApplicationState;

class LoginScreen extends Component<Props, LoginState> {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Şifre Giriş',
      // headerRight: props => {
      //   return (
      //     <View style={{flexDirection: 'row'}}>

      //       <TouchableHighlight
      //         underlayColor="#ffffff00"
      //         style={{
      //           borderRadius: 45,
      //           borderColor: colors.borderColor,
      //           borderWidth: 2,
      //           padding: 5,
      //           marginRight: 5,
      //         }}
      //         onPressIn={async () => {
      //           await DepartmentActions.getItems()(
      //             store.dispatch,
      //             store.getState,
      //           );
      //           await StokActions.getItems()(store.dispatch, store.getState);
      //           await ExchangeActions.getItems()(
      //             store.dispatch,
      //             store.getState,
      //           );
      //           await ActivityActions.getItems(new Date())(
      //             store.dispatch,
      //             store.getState,
      //           );
      //           await ActivityActions.getTurnikeItems(new Date())(
      //             store.dispatch,
      //             store.getState,
      //           );
      //         }}>
      //         <FontAwesome5Icon name="sync" size={25} color={'#fff'} />
      //       </TouchableHighlight>
      //     </View>
      //   );
      // },
    };
  };

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleComponentMount = this.handleComponentMount.bind(this);
    this.handleComponentUnMount = this.handleComponentUnMount.bind(this);
    this.state = {
      errorMessage: '',
      password: null, //"123",
      username: null, //"posmobil",
      isRequest: false,
      showDownloader: false,
      downloadPercent: 0,
    };
  }

  async handleLogin() {
    this.setState({isRequest: true});

    const isLogin = await this.props.UserActions.getItem(
      this.state.username,
      this.state.password,
    );
    if (!isLogin) {
      this.setState({errorMessage: 'Hatalı giriş'});
    } else {
      const updater = await UpdaterService.getUpdateInfo();
      const result =
        updater.value &&
        updater.value.ResultSets &&
        updater.value.ResultSets.length > 0 &&
        updater.value.ResultSets[0].length > 0
          ? updater.value.ResultSets[0][0]
          : null;
      if (
        result &&
        result.POSMOBILE_VERSIONNO &&
        VersionNumber.appVersion != result.POSMOBILE_VERSIONNO
      ) {
        const updateUrl = result.POSMOBILE_VERSIONURL;
        this.setState({isRequest: false, showDownloader: true});

        try {
          var filePath = path.join(
            RNFS.ExternalDirectoryPath,
            'update' + result.POSMOBILE_VERSIONNO + '.apk',
          );
          const download = RNFS.downloadFile({
            fromUrl: updateUrl,
            toFile: filePath,
            progress: res => {
              this.setState({
                downloadPercent: (res.bytesWritten / res.contentLength) * 100,
              });
            },
            progressDivider: 1,
          });

          const downloadResult = await download.promise;
          if (downloadResult.statusCode == 200) {
            RNApkInstallerN.install(filePath);
          }
        } catch (error) {
          console.warn(error);
          if (config.logRequest) {
            try {
              await FileService.addLogFile(JSON.stringify(error));
            } catch {}
          }
          // Alert.alert(JSON.stringify(error));
          this.setState({isRequest: true, showDownloader: false});
        }
      }
      await this.props.CustomerActions.clear();
      const getGarson = await this.props.GarsonActions.getItem(
        this.props.User.current.GARSONID,
      );
      if (!getGarson) {
        this.setState({errorMessage: 'Garson Bilgisi Bulunamadı.'});
      } else {
        FileService.username = this.state.username;
        this.props.navigation.navigate('AppSelector');
      }
    }
    this.setState({isRequest: false});
  }
  componentDidMount() {
    if (FileService.username) {
      this.setState({username: FileService.username});
    }
  }
  async handleComponentMount(payload: NavigationEventPayload) {
    await this.props.UserActions.clear();
    await this.props.GarsonActions.clear();
  }

  async handleComponentUnMount(payload: NavigationEventPayload) {
    this.setState({
      errorMessage: '',
      password: null,
      username: null,
    });
  }
  render() {
    const {container} = styles;
    return (
      <React.Fragment>
        <Modal
          visible={this.state.showDownloader || false}
          transparent={true}
          onRequestClose={() => {
            this.setState({showDownloader: false});
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
              <Text
                style={{
                  backgroundColor: colors.buttonBackColor,
                  color: colors.inputTextColor,
                  width: '100%',
                  marginVertical: 10,
                  marginHorizontal: 10,
                  textAlign: 'center',
                }}>
                Yeni Güncelleme indiriliyor...{' '}
                {this.state.downloadPercent.toFixed(2)}%
              </Text>
              <View style={{width: '100%'}}>
                <ProgressBarAndroid style={{width: '100%'}} progress={0.1} />
              </View>
            </View>
          </View>
        </Modal>

        <NavigationEvents
          onWillFocus={this.handleComponentMount}
          onWillBlur={this.handleComponentUnMount}
        />
        <SafeAreaView style={container}>
          <LoaderSpinner
            showLoader={this.state.isRequest}
            onCloseModal={async () => {
              this.setState({
                errorMessage: '',
                password: null,
              });
              await this.props.UserActions.clear();
            }}
          />

          <View style={styles.formContainer}>
            <TouchableHighlight
              onPress={() => {
                this.props.navigation.navigate('Config');
              }}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                borderColor: colors.borderColor,
                borderWidth: 2,
                borderRadius: 30,
                padding: 10,
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome5Icon
                name="cogs"
                size={20}
                color={colors.borderColor}
              />
            </TouchableHighlight>
            {!!this.state.errorMessage && (
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 8,
                  marginVertical: 20,
                  borderColor: '#ff0000',
                  borderWidth: 2,
                  padding: 10,
                  backgroundColor: '#ff000011',
                  borderRadius: 25,
                }}>
                <FontAwesome5Icon
                  name="times"
                  size={20}
                  color={'#ff0000'}
                  style={{
                    borderColor: colors.errorTextColor,
                    borderWidth: 2,
                    borderRadius: 20,
                    width: 25,
                    height: 25,
                    padding: 2,
                    alignContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginRight: 10,
                  }}
                />
                <Text
                  style={{
                    color: colors.errorTextColor,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {this.state.errorMessage}
                </Text>
              </View>
            )}
            <TextInput
              placeholder="Kullanıcı Adı"
              autoFocus={true}
              // returnKeyType={"send"}
              clearButtonMode="while-editing"
              onSubmitEditing={async () => await this.handleLogin()}
              style={{
                color: colors.inputTextColor,
                backgroundColor: colors.inputBackColor,
                borderColor: colors.borderColor,
                borderWidth: 1,
                paddingVertical: 10,
                paddingHorizontal: 15,
                textAlign: 'center',
                fontSize: 20,
                borderRadius: 25,
                marginBottom: 5,
              }}
              value={this.state.username}
              onChangeText={text => {
                this.setState({username: text});
              }}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Şifre"
              // returnKeyType={"send"}
              clearButtonMode="while-editing"
              onSubmitEditing={async () => await this.handleLogin()}
              style={{
                color: colors.inputTextColor,
                backgroundColor: colors.inputBackColor,
                borderColor: colors.borderColor,
                borderWidth: 1,
                paddingVertical: 10,
                paddingHorizontal: 15,
                textAlign: 'center',
                fontSize: 20,
                borderRadius: 25,
              }}
              value={this.state.password}
              onChangeText={text => {
                this.setState({password: text});
              }}
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry
            />
          </View>
          <View style={{flex: 1, height: 50}}>
            <TouchableHighlight
              underlayColor="#ffffff00"
              disabled={this.props.User.isRequest}
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
                marginTop: 10,
                borderColor: colors.borderColor,
                borderWidth: 1,
                backgroundColor: this.props.User.isRequest
                  ? colors.inputBackColor
                  : colors.buttonBackColor,
                borderRadius: 25,
              }}
              onPressIn={async () => await this.handleLogin()}>
              <Text
                style={{
                  color: colors.buttonTextColor,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Giriş
              </Text>
            </TouchableHighlight>
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}

export const Login = withNavigation(
  connect(
    (state: ApplicationState) => state,
    dispatch => {
      return {
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
  )(LoginScreen),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'transparent',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    marginBottom: 5,
    justifyContent: 'flex-end',
  },
});
