import { Action } from 'redux';
import { Actions, UserState, IReceiveUserItemAction, IClearAction, IRequestUserItemAction } from './state';

const unloadedState: UserState = {
    current: null
};

export type KnownAction = IReceiveUserItemAction | IRequestUserItemAction | IClearAction;

export const reducer = (currentState: UserState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case Actions.ReceiveUserItem:
            if (action.payload) {
                currentState.current = {
                    GARSONID: action.payload.Tenancy.GARSONID,
                    PORTALID: action.payload.Tenancy.PORTALID,
                    STDUSERID: action.payload.Tenancy.STDUSERID,
                    LoginToken: action.payload.LoginToken
                };
            }
            currentState.isRequest = false;
            return { ...currentState };
        case Actions.RequestUserItem:
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
