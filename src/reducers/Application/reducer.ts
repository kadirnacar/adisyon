import { Action } from 'redux';
import { Actions, AppState,  ISetCurrentAction } from './state';

const unloadedState: AppState = {
    current: null
};

export type KnownAction = ISetCurrentAction;

export const reducer = (currentState: AppState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case Actions.SetCurrent:
            currentState.current = action.payload;
            return { ...currentState };
        default:
            break;
    }

    return currentState || unloadedState;
};
