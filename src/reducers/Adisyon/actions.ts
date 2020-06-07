import {IAdisyon, ICustomer} from '@models';
import {AdisyonService} from '@services';
import {Alert} from 'react-native';
import {batch} from 'react-redux';
import {Actions} from './state';
import { ApplicationState } from '../../store';

export const actionCreators = {
  sendItem: (data: IAdisyon, customer: ICustomer) => async (
    dispatch,
    getState,
  ) => {
    let isSuccess: boolean = false;
    await batch(async () => {
      await dispatch({type: Actions.RequestSendAdisyonItems});
      var result = await AdisyonService.sendItem(data, 'SAVE', customer);

      const isRequestSuccess =
        result.value && result.value.length > 0 && result.value[0].length > 0
          ? true
          : false;
      await dispatch({
        type: Actions.ReceiveSendAdisyonItems,
        payload: [],
      });

      if (result.hasErrors()) {
        Alert.alert(result.errors[0]);
        isSuccess = false;
        return;
      }

      isSuccess = isRequestSuccess;
    });

    return isSuccess;
  },
  payItem: (data: IAdisyon, customer: ICustomer) => async (
    dispatch,
    getState,
  ) => {
    let isSuccess: boolean = false;
    await batch(async () => {
      await dispatch({type: Actions.RequestSendAdisyonItems});
      var result = await AdisyonService.sendItem(data, 'ROOM', customer);

      if (result.hasErrors()) {
        Alert.alert(result.errors[0]);
        isSuccess = false;
        await dispatch({
          type: Actions.ReceiveSendAdisyonError,
        });
        return;
      }
      const isRequestSuccess =
        result.value && result.value.length > 0 && result.value[0].length > 0
          ? true
          : false;
      await dispatch({
        type: Actions.ReceiveSendAdisyonItems,
        payload: [],
      });
      isSuccess = isRequestSuccess;
    });

    return isSuccess;
  },
  setCurrent: (data: IAdisyon) => async (dispatch, getState) => {
    let isSuccess: boolean = false;
    await batch(async () => {
      await dispatch({type: Actions.SetCurrent, payload: data});
      isSuccess = true;
    });
    return isSuccess;
  },
};
