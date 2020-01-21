import { Action } from 'redux';
import { Actions, AdisyonState, IReceiveAdisyonItemsAction, IRequestAdisyonItemsAction } from './state';

const unloadedState: AdisyonState = {
    current: {}
};

export type KnownAction = IReceiveAdisyonItemsAction | IRequestAdisyonItemsAction;

export const reducer = (currentState: AdisyonState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case Actions.ReceiveSendAdisyonItems:
            currentState.isRequest = false;
            return { ...currentState };
        case Actions.RequestSendAdisyonItems:
            currentState.isRequest = true;
            return { ...currentState };
        default:
            break;
    }

    return currentState || unloadedState;
};
