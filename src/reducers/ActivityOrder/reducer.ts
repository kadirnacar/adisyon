import { Action } from 'redux';
import { Actions, ActivityOrderState, IReceiveActivityOrderItemsAction, ISetCurrentAction, IRequestActivityOrderItemsAction } from './state';

const unloadedState: ActivityOrderState = {
    current: {}
};

export type KnownAction = IReceiveActivityOrderItemsAction | IRequestActivityOrderItemsAction | ISetCurrentAction;

export const reducer = (currentState: ActivityOrderState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case Actions.ReceiveSendActivityOrderItems:
            currentState.isRequest = false;
            return { ...currentState };
        case Actions.RequestSendActivityOrderItems:
            currentState.isRequest = true;
            return { ...currentState };
        case Actions.SetCurrent:
            currentState.current = action.payload;
            return { ...currentState };
        default:
            break;
    }

    return currentState || unloadedState;
};
