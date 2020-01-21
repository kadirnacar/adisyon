import { FileService, StokService } from "@services";
import { batch } from "react-redux";
import { Actions } from './state';

export const actionCreators = {
    getItems: () => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestStokItems });
            var result = await StokService.getItems();
            await dispatch({ type: Actions.ReceiveStokItems, payload: result && result.ResultSets && result.ResultSets.length > 0 ? result.ResultSets[0] : [] });
            await FileService.saveStateToFile(getState());
            isSuccess = true;
        });
        return isSuccess;
    }
}