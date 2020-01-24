import { IAdisyon } from "@models";
import { AdisyonService } from "@services";
import { batch } from "react-redux";
import { Actions } from './state';

export const actionCreators = {
    sendItem: (data: IAdisyon) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestSendAdisyonItems });
            var result = await AdisyonService.sendItem(data);
            const isRequestSuccess = result && result.length > 0 && result[0].length > 0 ? result[0][0].Success : false;
            await dispatch({
                type: Actions.ReceiveSendAdisyonItems,
                payload: []
            });
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