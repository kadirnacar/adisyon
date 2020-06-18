import {Action} from 'redux';
import {
  Actions,
  EcrState,
  IReceiveEcrItemsAction,
  IRequestEcrItemsAction,
  ISetCurrentAction,
} from './state';

const unloadedState: EcrState = {
  items: [],
  current: null,
};

export type KnownAction =
  | IReceiveEcrItemsAction
  | IRequestEcrItemsAction
  | ISetCurrentAction;

export const reducer = (
  currentState: EcrState = unloadedState,
  incomingAction: Action,
) => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case Actions.ReceiveEcrItems:
      currentState.isRequest = false;
      currentState.items = action.payload;

      return {...currentState};
    case Actions.RequestEcrItems:
      currentState.isRequest = true;
      return {...currentState};
    case Actions.SetCurrent:
      currentState.isRequest = false;
      currentState.current = action.payload;
      return {...currentState};
    default:
      break;
  }

  return currentState || unloadedState;
};
