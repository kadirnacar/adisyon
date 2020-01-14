import { DepartmentService, FileService } from "@services";
import { ApplicationState } from "@store";
import { Actions } from './state';
import { IDepartment } from "@models";

export const actionCreators = {
    getItems: () => async (dispatch, getState) => {
        await dispatch({ type: Actions.RequestDepartmentItems });
        var result = await DepartmentService.getItems();
        await dispatch({ type: Actions.ReceiveDepartmentItems, payload: result && result.ResultSets && result.ResultSets.length > 0 ? result.ResultSets[0] : [] });
        await FileService.saveStateToFile(getState());
        return true;
    },
    setCurrent: (item: IDepartment) => async (dispatch, getState) => {
        await dispatch({ type: Actions.SetCurrent, payload: item });
    }
}