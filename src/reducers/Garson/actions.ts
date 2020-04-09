import { GarsonService } from "@services";
import { batch } from "react-redux";
import { Actions } from './state';
import { Alert } from "react-native";
import { IGarson } from "@models";

export const actionCreators = {
    getItem: (garsonId: number) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestGarsonItem });
            var result = await GarsonService.getItem(garsonId);

            let userResult = result.value
                && result.value.length > 0
                && result.value[0].length > 0 ? result.value[0][0] : null;
            let garson: IGarson = null;
            if (userResult) {
                garson = JSON.parse(userResult.Return);
            }
            await dispatch({
                type: Actions.ReceiveGarsonItem,
                payload: garson
            });

            if (result.hasErrors()) {
                Alert.alert(result.errors[0]);
                isSuccess = false;
                return;
            }

            isSuccess = garson != null;
        });
        return isSuccess;
    },
    clear: () => async (dispatch, getState) => {
        await dispatch({ type: Actions.ClearItem });
    }
}