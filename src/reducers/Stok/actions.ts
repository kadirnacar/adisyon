import { FileService, StokService } from "@services";
import { batch } from "react-redux";
import { Actions } from './state';
import { Alert } from "react-native";

export const actionCreators = {
    getItems: () => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestStokItems });
            var result = await StokService.getItems();
            
            await dispatch({ type: Actions.ReceiveStokItems, payload: result.value && result.value.ResultSets && result.value.ResultSets.length > 0 ? result.value.ResultSets[0] : [] });
            
            if (result.hasErrors()) {
                Alert.alert(result.errors[0]);
                isSuccess = false;
                return;
            }
            
            await FileService.saveStateToFile(getState());
            isSuccess = true;
        });
        return isSuccess;
    }
}