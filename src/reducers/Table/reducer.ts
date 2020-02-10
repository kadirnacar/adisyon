import { Action } from 'redux';
import { Actions, TableState, IReceiveTableItemsAction, ISetCurrentAction, IRequestTableItemsAction } from './state';

const unloadedState: TableState = {
    items: [],
    current: null
};

export type KnownAction = IReceiveTableItemsAction | IRequestTableItemsAction | ISetCurrentAction;

export const reducer = (currentState: TableState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case Actions.ReceiveTableItems:
            currentState.isRequest = false;
            currentState.items = action.payload;
            return { ...currentState };
        case Actions.RequestTableItems:
            currentState.isRequest = true;
            return { ...currentState };
        case Actions.SetCurrent:
            currentState.isRequest = false;
            currentState.current = action.payload;
            return { ...currentState };
        default:
            break;
    }

    return currentState || unloadedState;
};
