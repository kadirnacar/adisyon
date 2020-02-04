import { IDepartment } from "@models";
import { DepartmentService, FileService } from "@services";
import { batch } from "react-redux";
import { Actions } from './state';

export const actionCreators = {
    getItems: () => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        console.log("getDepartments")
        await batch(async () => {
            await dispatch({ type: Actions.RequestDepartmentItems });
            var result = await DepartmentService.getItems();
            await dispatch({ type: Actions.ReceiveDepartmentItems, payload: result && result.ResultSets && result.ResultSets.length > 0 ? result.ResultSets[0] : [] });
            await FileService.saveStateToFile(getState());
            isSuccess = true;
        });
        return isSuccess;
    },
    setCurrent: (item: IDepartment) => async (dispatch, getState) => {
        await dispatch({ type: Actions.SetCurrent, payload: item });
    }
}