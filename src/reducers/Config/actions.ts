import { IConfig } from "@models";
import { batch } from "react-redux";
import { Actions } from './state';
import { Alert } from "react-native";
import moment from 'moment';


export const actionCreators = {
    setConfig: (config: IConfig) => async (dispatch, getState) => {
        await dispatch({ type: Actions.SetConfig, payload: config });
    }
}