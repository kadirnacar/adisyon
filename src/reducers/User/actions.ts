import { UserService } from "@services";
import { batch } from "react-redux";
import { Actions } from './state';

export const actionCreators = {
    getItem: (username: string) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestUserItem });
            var result = await UserService.getItem(username);
            const user = result && result.ResultSets
                && result.ResultSets.length > 0
                && result.ResultSets[0].length > 0 ? result.ResultSets[0][0] : null;

            await dispatch({
                type: Actions.ReceiveUserItem,
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