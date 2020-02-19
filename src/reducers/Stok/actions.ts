import { FileService, StokService } from "@services";
import { batch } from "react-redux";
import { Actions } from './state';
import { Alert } from "react-native";
import { ApplicationState } from "src/store";

export const actionCreators = {
    getItems: () => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestStokItems });
            var result = await StokService.getItems();
            const state: ApplicationState = getState();

            const payload = result.value && result.value.ResultSets && result.value.ResultSets.length > 0 ? result.value.ResultSets[0] : [];

            await dispatch({ type: Actions.ReceiveStokItems, payload, categories: state.StokGrup.items });

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