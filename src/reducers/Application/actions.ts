import { Actions, Applications } from './state';

export const actionCreators = {
    setCurrent: (item: Applications) => async (dispatch, getState) => {
        await dispatch({ type: Actions.SetCurrent, payload: item });
    }
}