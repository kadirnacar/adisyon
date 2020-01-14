import { AppContainer } from '@navigation';
import { FileService } from '@services';
import { ApplicationState } from '@store';
import React, { Component } from 'react';
import { AppState, Dimensions, View, ImageBackground } from 'react-native';
import SafeAreaView, { SafeAreaProvider } from 'react-native-safe-area-view';
import { Provider } from "react-redux";
import { bindActionCreators, Store } from 'redux';
import { DepartmentActions } from './reducers/Department';
import { configureStore } from './store/configureStore';
import { StokActions } from './reducers/Stok';
import { StokGrupActions } from './reducers/StokGrup';

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
        this.store = configureStore(initialState);
        await this.loadDataFromServer();
        this.setState({ isLoaded: true });
    }

    async loadDataFromServer() {
        const getDepartments = await bindActionCreators(DepartmentActions.getItems, this.store.dispatch);
        await getDepartments();
        const getStoks = await bindActionCreators(StokActions.getItems, this.store.dispatch);
        await getStoks();
        const getGrups = await bindActionCreators(StokGrupActions.getItems, this.store.dispatch);
        await getGrups();
    }

    render() {
        return <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }} forceInset={{ top: "always", bottom: "always" }}>
                <ImageBackground source={require("../assets/background.jpg")}
                    style={{ flex: 1, width: width, height: height }}>
                    {this.state.isLoaded ?
                        <Provider store={this.store}>
                            <AppContainer style={{ backgroundColor: 'transparent' }} theme={"dark"} >

                            </AppContainer>
                        </Provider> : <View style={{ flex: 1, backgroundColor: 'transparent' }} />}
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    }
}
