import { ITable } from "@models";
import { TableService, FileService } from "@services";
import { batch } from "react-redux";
import { Actions } from './state';
import { Alert } from "react-native";

export const actionCreators = {
    getItems: (departmentCode: string) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestTableItems });
            var result = await TableService.getDepartmentTables(departmentCode);

            await dispatch({ type: Actions.ReceiveTableItems, payload: result.value && result.value.ResultSets && result.value.ResultSets.length > 0 ? result.value.ResultSets[0] : [] });

            if (result.hasErrors()) {
                Alert.alert(result.errors[0]);
                isSuccess = false;
                return;
            }

            isSuccess = true;
        });
        return isSuccess;
    },
    setCurrent: (item: ITable) => async (dispatch, getState) => {
        await dispatch({ type: Actions.SetCurrent, payload: item });
    }
}