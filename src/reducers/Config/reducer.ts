import { Action } from 'redux';
import { Actions, ConfigState, ISetConfigAction } from './state';

const unloadedState: ConfigState = {
    config: {
        restUrl: 'https://webapi.landoflegend.com/',
        tenant: 341,
        useAlagart: false,
    }
};

export type KnownAction = ISetConfigAction;

export const reducer = (currentState: ConfigState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case Actions.SetConfig:
            currentState.config = action.payload;
            return { ...currentState };
        default:
            break;
    }

    return currentState || unloadedState;
};
