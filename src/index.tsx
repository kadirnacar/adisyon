import config from '@config';
import {AppContainer} from '@navigation';
import {FileService} from '@services';
import {ApplicationState} from '@store';
import React, {Component} from 'react';
import {AppState, Dimensions, View} from 'react-native';
import SafeAreaView, {SafeAreaProvider} from 'react-native-safe-area-view';
import {Provider} from 'react-redux';
import {Store} from 'redux';
import store from './tools/store';
import {DepartmentActions} from './reducers/Department';
import {StokActions} from './reducers/Stok';
import {ExchangeActions} from './reducers/Exchange';
import {ActivityActions} from './reducers/Activity';

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

  async componentDidMount() {
    const initialState = {}; //await FileService.readStateFromFile();
    const initialConfig = await FileService.readConfigFromFile();
    // initialState.User = null;
    // initialState.Garson = null;

    if (initialConfig) config.setConfig(initialConfig);

    this.store = store;

    this.setState({isLoaded: true});
    // this.loadData();
  }
  async loadData() {
    console.log('DepartmentActions.getItems');
    await DepartmentActions.getItems()(store.dispatch, store.getState);
    console.log('StokActions.getItems');
    await StokActions.getItems()(store.dispatch, store.getState);
    console.log('ExchangeActions.getItems');
    await ExchangeActions.getItems()(store.dispatch, store.getState);
    console.log('ActivityActions.getItems');
    await ActivityActions.getItems(new Date())(store.dispatch, store.getState);
    console.log('ActivityActions.getTurnikeItems');
    await ActivityActions.getTurnikeItems(new Date())(
      store.dispatch,
      store.getState,
    );
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
