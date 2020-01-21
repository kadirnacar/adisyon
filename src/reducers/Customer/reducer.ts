import { Action } from 'redux';
import { Actions, CustomerState, IReceiveCustomerItemAction, IClearAction, IRequestCustomerItemAction } from './state';

const unloadedState: CustomerState = {
    current: null
};

export type KnownAction = IReceiveCustomerItemAction | IRequestCustomerItemAction | IClearAction;

export const reducer = (currentState: CustomerState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case Actions.ReceiveCustomerItem:
            if (action.payload) {
                currentState.current = action.payload;
            }
            currentState.isRequest = false;
            return { ...currentState };
        case Actions.RequestCustomerItem:
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
