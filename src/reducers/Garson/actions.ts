import { GarsonService } from "@services";
import { batch } from "react-redux";
import { Actions } from './state';
import { Alert } from "react-native";

export const actionCreators = {
    getItem: (garsonId: number) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestGarsonItem });
            var result = await GarsonService.getItem(garsonId);
          
            const user = result.value && result.value.ResultSets
                && result.value.ResultSets.length > 0
                && result.value.ResultSets[0].length > 0 ? result.value.ResultSets[0][0] : null;

            await dispatch({
                type: Actions.ReceiveGarsonItem,
                payload: user
            });

            if (result.hasErrors()) {
                Alert.alert(result.errors[0]);
                isSuccess = false;
                return;
            }
            
            isSuccess = user != null;
        });
        return isSuccess;
    },
    clear: () => async (dispatch, getState) => {
        await dispatch({ type: Actions.ClearItem });
    }
}