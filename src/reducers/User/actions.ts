import { UserService } from "@services";
import { batch } from "react-redux";
import { Actions } from './state';
import * as LocalStorage from '../../store/localStorage';

export const actionCreators = {
    getItem: (username: string, password: string) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestUserItem });
            var result = await UserService.getItem(username, password);
            const user = result && result.Success ? result : null;

            await dispatch({
                type: Actions.ReceiveUserItem,
                payload: user
            });

            isSuccess = user != null;

            if (isSuccess) {
                const state = await getState();
                if (state.User)
                    await LocalStorage.setItem("user", JSON.stringify(state.User.current));
            }
        });
        return isSuccess;
    },
    clear: () => async (dispatch, getState) => {
        await dispatch({ type: Actions.ClearItem });
    }
}