import { IActivityOrder, ISeance, IActivity } from "@models";
import { ActivityOrderService } from "@services";
import { batch } from "react-redux";
import { Actions } from './state';
import { Alert } from "react-native";

export const actionCreators = {
    sendItem: (data: IActivityOrder) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestSendActivityOrderItems });
            var result = await ActivityOrderService.sendItem(data);


            const isRequestSuccess = result.value && result.value.length > 0 && result.value[0].length > 0 ? result.value[0][0] : false;
            await dispatch({
                type: Actions.ReceiveSendActivityOrderItems,
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
    checkItem: (activity: IActivity, seance: ISeance, guestId: string) => async (dispatch, getState) => {
        let resultSet: any = {};
        await batch(async () => {
            await dispatch({ type: Actions.RequestCheckItem });
            var result = await ActivityOrderService.checkkItem(activity, seance, guestId);

            const isRequestSuccess = result.value && result.value.length > 0 && result.value[0].length > 0 ? true : false;
            await dispatch({
                type: Actions.ReceiveCheckItem
            });
            if (result.hasErrors()) {
                Alert.alert(result.errors[0]);
                resultSet = null;
                return;
            }

            if (isRequestSuccess)
                resultSet = result.value[0][0];
        });

        return resultSet;
    },
    setCurrent: (data: IActivityOrder) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.SetCurrent, payload: data });
            isSuccess = true;
        });
        return isSuccess;
    },
    setCheckItem: (activity: IActivity, seance: ISeance) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.SetCheckItem, checkItem: activity, checkItemSeance: seance });
            isSuccess = true;
        });
        return isSuccess;
    }
}