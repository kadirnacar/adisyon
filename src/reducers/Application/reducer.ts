import { Action } from 'redux';
import { Actions, AppState, ISetTitleAction, ISetCurrentAction } from './state';

const unloadedState: AppState = {
    current: null
};

export type KnownAction = ISetCurrentAction | ISetTitleAction;

export const reducer = (currentState: AppState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case Actions.SetCurrent:
            currentState.current = action.payload;
            return { ...currentState };
        case Actions.SetTitle:
            currentState.nfcScreenTitle = action.title;
            return { ...currentState };
        default:
            break;
    }

    return currentState || unloadedState;
};
