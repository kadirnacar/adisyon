import {Action} from 'redux';
import {
  Actions,
  StokGrupState,
  IReceiveStokGrupItemsAction,
  IRequestStokGrupItemsAction,
} from './state';
import colorPalette from 'nice-color-palettes';
import {arrayToObject} from '@utils';

const unloadedState: StokGrupState = {
  items: [],
  groups: {},
};

export type KnownAction =
  | IReceiveStokGrupItemsAction
  | IRequestStokGrupItemsAction;

export const reducer = (
  currentState: StokGrupState = unloadedState,
  incomingAction: Action,
) => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case Actions.ReceiveStokGrupItems:
      currentState.isRequest = false;
      currentState.items = action.payload;
      currentState.items.forEach((i, index) => {
        i.color =
          colorPalette[(index != null ? index : 9999) % colorPalette.length][0];
      });
      currentState.groups = arrayToObject(action.payload, 'STOKGRUPID');
      return {...currentState};
    case Actions.RequestStokGrupItems:
      currentState.isRequest = true;
      return {...currentState};
    default:
      break;
  }

  return currentState || unloadedState;
};
