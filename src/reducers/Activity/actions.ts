import { FileService, ActivityService } from "@services";
import { batch } from "react-redux";
import { Actions } from './state';
import moment from 'moment';

export const actionCreators = {
    getItems: (date: Date) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestActivityItems });
            var result = await ActivityService.getItems(moment(date).format('YYYY-MM-DD'));
            await dispatch({ type: Actions.ReceiveActivityItems, payload: result  && result.length > 0 ? result[0] : [] });
            await FileService.saveStateToFile(getState());
            console.log(getState());
            isSuccess = true;
        });
        return isSuccess;
    }
}