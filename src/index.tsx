import { AppContainer } from '@navigation';
import { FileService, UpdaterService } from '@services';
import { ApplicationState } from '@store';
import React, { Component } from 'react';
import { AppState, Dimensions, View } from 'react-native';
import SafeAreaView, { SafeAreaProvider } from 'react-native-safe-area-view';
import { Provider } from "react-redux";
import { Store } from 'redux';
import { configureStore } from './store/configureStore';
import config from '@config';

const { width, scale, height } = Dimensions.get("window");

export default class App extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            appState: AppState.currentState,
            isLoaded: false
        }
    }
    store: Store<ApplicationState>;

    async componentDidMount() {
        const initialState = await FileService.readStateFromFile();

        initialState.User = null;
        initialState.Garson = null;

        if (initialState && initialState.Config && initialState.Config.config)
            config.setConfig(initialState.Config.config);

        this.store = configureStore(initialState);
        this.setState({ isLoaded: true });
    }

    render() {
        return <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} forceInset={{ top: "always", bottom: "always" }}>
                {this.state.isLoaded ?
                    <Provider store={this.store}>
                        <AppContainer style={{ backgroundColor: 'white' }} >
                        </AppContainer>
                    </Provider> : <View style={{ flex: 1, backgroundColor: 'transparent' }} />}
            </SafeAreaView>
        </SafeAreaProvider>
    }
}
