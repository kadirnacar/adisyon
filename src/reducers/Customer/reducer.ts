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
            return { ...currentState };
        case Actions.RequestCustomerItem:
            return { ...currentState };
        case Actions.ClearItem:
            currentState.current = null;
            return { ...currentState };
        default:
            break;
    }

    return currentState || unloadedState;
};
