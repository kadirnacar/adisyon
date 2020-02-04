import { IActivityOrder } from "@models";
import { ActivityOrderService } from "@services";
import { batch } from "react-redux";
import { Actions } from './state';

export const actionCreators = {
    sendItem: (data: IActivityOrder) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestSendActivityOrderItems });
            var result = await ActivityOrderService.sendItem(data);
            const isRequestSuccess = result && result.length > 0 && result[0].length > 0 ? result[0][0] : false;
            await dispatch({
                type: Actions.ReceiveSendActivityOrderItems,
                payload: []
            });
            isSuccess = isRequestSuccess;
        });
        
        return isSuccess;
    },
    setCurrent: (data: IActivityOrder) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.SetCurrent, payload: data });
            isSuccess = true;
        });
        return isSuccess;
    }
}