import { FileService, ActivityService } from "@services";
import { batch } from "react-redux";
import { Actions } from './state';
import moment from 'moment';
import { Alert } from "react-native";

export const actionCreators = {
    getItems: (date: Date) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestActivityItems });
            var result = await ActivityService.getItems(moment(date).format('YYYY-MM-DD'));

            await dispatch({ type: Actions.ReceiveActivityItems, date: new Date(moment(date).format('YYYY-MM-DD')), payload: result.value && result.value.length > 0 ? result.value[0] : [] });

            if (result.hasErrors()) {
                Alert.alert(result.errors[0]);
                isSuccess = false;
                return;
            }

            // await FileService.saveStateToFile(getState());
            isSuccess = true;
        });
        return isSuccess;
    },
    getTurnikeItems: (date: Date) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestTurnikeItems });
            var result = await ActivityService.getTurnikeItems(moment(date).format('YYYY-MM-DD'));
            await dispatch({ type: Actions.ReceiveTurnikeItems, date: new Date(moment(date).format('YYYY-MM-DD')), payload: result.value && result.value.length > 0 ? result.value[0] : [] });

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