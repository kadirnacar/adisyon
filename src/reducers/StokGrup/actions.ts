import { StokGrupService, FileService } from "@services";
import { ApplicationState } from "@store";
import { Actions } from './state';
import { IStokGrup } from "@models";
import { batch } from "react-redux";

export const actionCreators = {
    getItems: () => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestStokGrupItems });
            var result = await StokGrupService.getItems();
            await dispatch({ type: Actions.ReceiveStokGrupItems, payload: result && result.ResultSets && result.ResultSets.length > 0 ? result.ResultSets[0] : [] });
            await FileService.saveStateToFile(getState());
            isSuccess = true;
        });
        return isSuccess;
    }
}