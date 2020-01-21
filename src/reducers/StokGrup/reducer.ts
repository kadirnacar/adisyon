import { Action } from 'redux';
import { Actions, StokGrupState, IReceiveStokGrupItemsAction, IRequestStokGrupItemsAction } from './state';

const unloadedState: StokGrupState = {
    items: []
};

export type KnownAction = IReceiveStokGrupItemsAction | IRequestStokGrupItemsAction;

export const reducer = (currentState: StokGrupState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case Actions.ReceiveStokGrupItems:
            currentState.isRequest = false;
            currentState.items = action.payload;
            return { ...currentState };
        case Actions.RequestStokGrupItems:
            currentState.isRequest = true;
            return { ...currentState };
        default:
            break;
    }

    return currentState || unloadedState;
};
