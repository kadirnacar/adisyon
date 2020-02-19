import { Action } from 'redux';
import { Actions, ExchangeState, IReceiveExchangeItemsAction,  IRequestExchangeItemsAction } from './state';

const unloadedState: ExchangeState = {
    items: [],
};

export type KnownAction = IReceiveExchangeItemsAction | IRequestExchangeItemsAction ;

export const reducer = (currentState: ExchangeState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case Actions.ReceiveExchangeItems:
            currentState.isRequest = false;
            currentState.items = action.payload;
            return { ...currentState };
        case Actions.RequestExchangeItems:
            currentState.isRequest = true;
            return { ...currentState };
        default:
            break;
    }

    return currentState || unloadedState;
};
