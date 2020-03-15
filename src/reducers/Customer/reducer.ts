import { Action } from 'redux';
import { Actions, CustomerState, IReceiveCustomerFreeItemsAction, IRequestCustomerFreeItemsAction, IReceiveCustomerItemAction, IReceiveCustomerTransAction, IRequestCustomerTransAction, IClearAction, IRequestCustomerItemAction } from './state';

const unloadedState: CustomerState = {
    current: null,
    currentTrans: null,
    freeItems: null
};

export type KnownAction = IReceiveCustomerFreeItemsAction | IRequestCustomerFreeItemsAction | IReceiveCustomerItemAction | IRequestCustomerItemAction | IClearAction | IReceiveCustomerTransAction | IRequestCustomerTransAction;

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
        case Actions.ReceiveCustomerTrans:
            if (action.payload) {
                currentState.currentTrans = action.payload;
            }
            currentState.isRequest = false;
            return { ...currentState };
        case Actions.RequestCustomerTrans:
            currentState.isRequest = true;
            return { ...currentState };

        case Actions.ReceiveCustomerFreeItems:
            if (action.payload) {
                currentState.freeItems = action.payload;
            }
            currentState.isRequest = false;
            return { ...currentState };
        case Actions.RequestCustomerFreeItems:
            currentState.isRequest = true;
            return { ...currentState };

        case Actions.ClearItem:
            currentState.isRequest = false;
            currentState.current = null;
            currentState.currentTrans = null;
            currentState.freeItems = null;
            return { ...currentState };
        default:
            break;
    }

    return currentState || unloadedState;
};
