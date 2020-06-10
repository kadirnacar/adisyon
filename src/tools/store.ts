import {configureStore} from '../store/configureStore';
import {Store, AnyAction} from 'redux';
import {ApplicationState} from 'src/store';

export let store: Store<ApplicationState, AnyAction> = null;
export const setStore = (str: Store<ApplicationState, AnyAction>) => {
  store = str;
};
export default store;
