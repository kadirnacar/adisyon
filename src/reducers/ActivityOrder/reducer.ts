import { Action } from 'redux';
import { Actions, ActivityOrderState, ISetCheckAction, IReceiveCheckItemAction, IRequestCheckItemAction, IReceiveActivityOrderItemsAction, ISetCurrentAction, IRequestActivityOrderItemsAction } from './state';

const unloadedState: ActivityOrderState = {
    current: {},
    checkItem: null,
    checkItemSeance: null
};

export type KnownAction = IReceiveActivityOrderItemsAction | IReceiveCheckItemAction | IRequestCheckItemAction | ISetCheckAction | IRequestActivityOrderItemsAction | ISetCurrentAction;

export const reducer = (currentState: ActivityOrderState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case Actions.ReceiveSendActivityOrderItems:
            currentState.isRequest = false;
            return { ...currentState };
        case Actions.RequestSendActivityOrderItems:
            currentState.isRequest = true;
            return { ...currentState };
        case Actions.ReceiveCheckItem:
            currentState.isRequest = false;
            return { ...currentState };
        case Actions.RequestCheckItem:
            currentState.isRequest = true;
            return { ...currentState };
        case Actions.SetCurrent:
            currentState.current = action.payload;
            return { ...currentState };
        case Actions.SetCheckItem:
            currentState.checkItem = action.checkItem;
            currentState.checkItemSeance = action.checkItemSeance;
            return { ...currentState };
        default:
            break;
    }

    return currentState || unloadedState;
};
