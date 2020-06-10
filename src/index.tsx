import config from '@config';
import {AppContainer} from '@navigation';
import {FileService} from '@services';
import {ApplicationState} from '@store';
import React, {Component} from 'react';
import {
  AppState,
  Dimensions,
  View,
  PermissionsAndroid,
  Permission,
} from 'react-native';
import SafeAreaView, {SafeAreaProvider} from 'react-native-safe-area-view';
import {Provider} from 'react-redux';
import {Store} from 'redux';
import {setStore} from './tools/store';
import {DepartmentActions} from './reducers/Department';
import {StokActions} from './reducers/Stok';
import {ExchangeActions} from './reducers/Exchange';
import {ActivityActions} from './reducers/Activity';
import {configureStore} from './store/configureStore';

const {width, scale, height} = Dimensions.get('window');

export default class App extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      isLoaded: false,
    };
  }
  store: Store<ApplicationState>;
  async requestCameraPermission() {
    const granted = await PermissionsAndroid.request(
      'android.permission.WRITE_EXTERNAL_STORAGE',
    );
  }
  async componentDidMount() {
    const initialConfig = await FileService.readConfigFromFile();
    // initialState.User = null;
    // initialState.Garson = null;
    const initialState = await FileService.readStateFromFile();

    if (initialConfig) config.setConfig(initialConfig);
    await this.requestCameraPermission();
    this.store = configureStore(initialState);
    setStore(this.store);
    this.setState({isLoaded: true});
    // this.loadData();
  }
  async loadData() {
   
  }
  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{flex: 1, backgroundColor: 'white'}}
          forceInset={{top: 'always', bottom: 'always'}}>
          {this.state.isLoaded ? (
            <Provider store={this.store}>
              <AppContainer style={{backgroundColor: 'white'}} />
            </Provider>
          ) : (
            <View style={{flex: 1, backgroundColor: 'transparent'}} />
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}
