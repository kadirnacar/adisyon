import { Actions, Applications } from './state';

export const actionCreators = {
    setCurrent: (item: Applications) => async (dispatch, getState) => {
        await dispatch({ type: Actions.SetCurrent, payload: item });
    },
    setNfcTitle: (title: string) => async (dispatch, getState) => {
        await dispatch({ type: Actions.SetTitle, title: title });
    }
}