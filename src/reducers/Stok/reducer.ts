import { Action } from 'redux';
import { Actions, StokState, IReceiveStokItemsAction, IRequestStokItemsAction } from './state';

const unloadedState: StokState = {
    items: []
};

export type KnownAction = IReceiveStokItemsAction | IRequestStokItemsAction;

export const reducer = (currentState: StokState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case Actions.ReceiveStokItems:
            currentState.isRequest = false;
            currentState.items = action.payload;
            return { ...currentState };
        case Actions.RequestStokItems:
            currentState.isRequest = true;
            return { ...currentState };
        default:
            break;
    }

    return currentState || unloadedState;
};
