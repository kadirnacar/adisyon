import {Action} from 'redux';
import {
  Actions,
  AdisyonState,
  IReceiveAdisyonItemsAction,
  IReceiveAdisyonErrorAction,
  ISetCurrentAction,
  IRequestAdisyonItemsAction,
} from './state';

const unloadedState: AdisyonState = {
  current: {},
};

export type KnownAction =
  | IReceiveAdisyonItemsAction
  | IRequestAdisyonItemsAction
  | ISetCurrentAction
  | IReceiveAdisyonErrorAction;

export const reducer = (
  currentState: AdisyonState = unloadedState,
  incomingAction: Action,
) => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case Actions.ReceiveSendAdisyonItems:
      currentState.isRequest = false;
      currentState.current = {
        ITEMS: [],
      };
      return {...currentState};
    case Actions.RequestSendAdisyonItems:
      currentState.isRequest = true;
      return {...currentState};
    case Actions.RequestSendAdisyonItems:
      currentState.isRequest = true;
      return {...currentState};
    case Actions.ReceiveSendAdisyonError:
      currentState.isRequest = false;
      return {...currentState};
    case Actions.SetCurrent:
      currentState.current = action.payload;
      return {...currentState};
    default:
      break;
  }

  return currentState || unloadedState;
};
