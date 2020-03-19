import { StokGrupService, FileService } from "@services";
import { ApplicationState } from "@store";
import { Actions } from './state';
import { IStokGrup } from "@models";
import { batch } from "react-redux";
import { Alert } from "react-native";

export const actionCreators = {
    getItems: () => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestStokGrupItems });
            var result = await StokGrupService.getItems();

            await dispatch({ type: Actions.ReceiveStokGrupItems, payload: result.value && result.value.ResultSets && result.value.ResultSets.length > 0 ? result.value.ResultSets[0] : [] });
            
            if (result.hasErrors()) {
                Alert.alert(result.errors[0]);
                isSuccess = false;
                return;
            }

            // await FileService.saveStateToFile(getState());
            isSuccess = true;
        });
        return isSuccess;
    }
}