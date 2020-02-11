import { Action } from 'redux';
import { Actions, TableState, IReceiveTableItemsAction, IReceiveTableAdisyonItemsAction, IRequestTableAdisyonItemsAction, IClearAction, IReceiveOpenedTableItemsAction, IRequestOpenedTableItemsAction, ISetCurrentAction, IRequestTableItemsAction } from './state';

const unloadedState: TableState = {
    items: [],
    current: null
};

export type KnownAction = IReceiveTableItemsAction | IRequestTableItemsAction | IClearAction | ISetCurrentAction | IReceiveTableAdisyonItemsAction | IRequestTableAdisyonItemsAction | IReceiveOpenedTableItemsAction | IRequestOpenedTableItemsAction;

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
        case Actions.ReceiveOpenedTableItems:
            currentState.isRequest = false;
            currentState.openedItems = action.payload;
            return { ...currentState };
        case Actions.RequestOpenedTableItems:
            currentState.isRequest = true;
            return { ...currentState };
        case Actions.ReceiveTableAdisyonItems:
            currentState.isRequest = false;
            currentState.tableAdisyon = action.payload;
            return { ...currentState };
        case Actions.RequestTableAdisyonItems:
            currentState.isRequest = true;
            return { ...currentState };
        case Actions.SetCurrent:
            currentState.isRequest = false;
            currentState.current = action.payload;
            return { ...currentState };
        case Actions.Clear:
            currentState.items = null;
            currentState.current = null;
            currentState.tableAdisyon = null;
            return { ...currentState };
        default:
            break;
    }

    return currentState || unloadedState;
};
