import { FileService, AdisyonService } from "@services";
import { Actions } from './state';
import { IAdisyon } from "@models";

export const actionCreators = {
    sendItem: (data: IAdisyon) => async (dispatch, getState) => {
        await dispatch({ type: Actions.RequestSendAdisyonItems });
        var result = await AdisyonService.sendItem(data);
        await dispatch({ type: Actions.ReceiveSendAdisyonItems, payload: result && result.ResultSets && result.ResultSets.length > 0 ? result.ResultSets[0] : [] });
        return true;
    }
}