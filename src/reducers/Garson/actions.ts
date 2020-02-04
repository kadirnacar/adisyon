import { GarsonService } from "@services";
import { batch } from "react-redux";
import { Actions } from './state';

export const actionCreators = {
    getItem: (garsonId: number) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestGarsonItem });
            var result = await GarsonService.getItem(garsonId);
            const user = result && result.ResultSets
                && result.ResultSets.length > 0
                && result.ResultSets[0].length > 0 ? result.ResultSets[0][0] : null;

            await dispatch({
                type: Actions.ReceiveGarsonItem,
                payload: user
            });

            isSuccess = user != null;
        });
        return isSuccess;
    },
    clear: () => async (dispatch, getState) => {
        await dispatch({ type: Actions.ClearItem });
    }
}