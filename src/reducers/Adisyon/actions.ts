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
            await dispatch({
                type: Actions.ReceiveSendAdisyonItems,
                payload: result && result.ResultSets && result.ResultSets.length > 0 ? result.ResultSets[0] : []
            });
            isSuccess = true;
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