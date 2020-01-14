import { Action } from 'redux';
import { Actions, UserState, IReceiveUserItemAction, IRequestUserItemAction } from './state';

const unloadedState: UserState = {
    current: null
};

export type KnownAction = IReceiveUserItemAction | IRequestUserItemAction;

export const reducer = (currentState: UserState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case Actions.ReceiveUserItem:
            if (action.payload) {
                currentState.current = action.payload;
                currentState.current.departments = currentState.current.DEPKODU.split(',');
            }
            return { ...currentState };
        case Actions.RequestUserItem:
            return { ...currentState };
        default:
            break;
    }

    return currentState || unloadedState;
};
