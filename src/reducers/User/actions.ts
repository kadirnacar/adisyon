import { UserService } from "@services";
import { Actions } from './state';
import { ApplicationState } from "src/store";

export const actionCreators = {
    getItem: (username: string) => async (dispatch, getState) => {
        await dispatch({ type: Actions.RequestUserItem });
        var result = await UserService.getItem(username);

        const user = result && result.ResultSets
            && result.ResultSets.length > 0
            && result.ResultSets[0].length > 0 ? result.ResultSets[0][0] : null;

        await dispatch({
            type: Actions.ReceiveUserItem,
            payload: user
        });

        if (user) {
            const state: ApplicationState = getState();
            const isDep = state.User.current.departments.indexOf(state.Department.current.KODU);
            if (isDep < 0)
                return false;
        }
        return user != null;
    }
}