import {EcrService, DepartmentService, FileService} from '@services';
import {Alert} from 'react-native';
import {batch} from 'react-redux';
import {Actions} from './state';
import {IEcr} from '@models';

export const actionCreators = {
  getItems: () => async (dispatch, getState) => {
    let isSuccess: boolean = false;
    await batch(async () => {
      await dispatch({type: Actions.RequestEcrItems});
      var result = await EcrService.getEcr();
      var ecrs =
        result.value && result.value[0] && result.value[0].length > 0
          ? result.value[0]
          : [];
      await dispatch({
        type: Actions.ReceiveEcrItems,
        payload: ecrs,
      });
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
  setCurrent: (item: IEcr) => async (dispatch, getState) => {
    await dispatch({type: Actions.SetCurrent, payload: item});
    const state = await getState();
    await FileService.saveStateToFile(state);
  },
};
