import { IAdisyon } from "@models";
import { AdisyonService } from "@services";
import { batch } from "react-redux";
import { Actions } from './state';
import { Alert } from "react-native";

export const actionCreators = {
    sendItem: (data: IAdisyon) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestSendAdisyonItems });
            var result = await AdisyonService.sendItem(data, "SAVE");

            const isRequestSuccess = result.value && result.value.length > 0 && result.value[0].length > 0 ? result.value[0][0] : false;
            await dispatch({
                type: Actions.ReceiveSendAdisyonItems,
                payload: []
            });

            if (result.hasErrors()) {
                Alert.alert(result.errors[0]);
                isSuccess = false;
                return;
            }

            isSuccess = isRequestSuccess;
        });

        return isSuccess;
    },
    payItem: (data: IAdisyon) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestSendAdisyonItems });
            var result = await AdisyonService.sendItem(data, "ROOM");

            const isRequestSuccess = result.value && result.value.length > 0 && result.value[0].length > 0 ? result.value[0][0] : false;
            await dispatch({
                type: Actions.ReceiveSendAdisyonItems,
                payload: []
            });

            if (result.hasErrors()) {
                Alert.alert(result.errors[0]);
                isSuccess = false;
                return;
            }

            isSuccess = isRequestSuccess;
        });

        return isSuccess;
    },
    setCurrent: (data: IAdisyon) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.SetCurrent, payload: data });
            isSuccess = true;
        });
        return isSuccess;
    }
}