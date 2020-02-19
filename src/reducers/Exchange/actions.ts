import { IExchange } from "@models";
import { ExchangeService, FileService } from "@services";
import { batch } from "react-redux";
import { Actions } from './state';
import { Alert } from "react-native";
import moment from 'moment';


export const actionCreators = {
    getItems: () => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestExchangeItems });
            var result = await ExchangeService.getItems(moment().format("YYYY-MM-DD"));

            await dispatch({ type: Actions.ReceiveExchangeItems, payload: result.value  && result.value.length > 0 ? result.value[0] : [] });

            if (result.hasErrors()) {
                Alert.alert(result.errors[0]);
                isSuccess = false;
                return;
            }
            
            await FileService.saveStateToFile(getState());
            isSuccess = true;
        });
        return isSuccess;
    }
}