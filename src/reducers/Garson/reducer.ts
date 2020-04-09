import { Action } from 'redux';
import { Actions, GarsonState, IReceiveGarsonItemAction, IClearAction, IRequestGarsonItemAction } from './state';

const unloadedState: GarsonState = {
    current: null
};

export type KnownAction = IReceiveGarsonItemAction | IRequestGarsonItemAction | IClearAction;

export const reducer = (currentState: GarsonState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case Actions.ReceiveGarsonItem:
            if (action.payload) {
                currentState.current = action.payload;
                // currentState.current.departments = currentState.current.DEPKODU.split(',');
            }
            currentState.isRequest = false;
            return { ...currentState };
        case Actions.RequestGarsonItem:
            currentState.isRequest = true;
            return { ...currentState };
        case Actions.ClearItem:
            currentState.isRequest = false;
            currentState.current = null;
            return { ...currentState };
        default:
            break;
    }

    return currentState || unloadedState;
};
