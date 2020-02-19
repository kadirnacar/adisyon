import { Action } from 'redux';
import { Actions, StokState, IReceiveStokItemsAction, IRequestStokItemsAction } from './state';

const unloadedState: StokState = {
    items: []
};

export type KnownAction = IReceiveStokItemsAction | IRequestStokItemsAction;

export const reducer = (currentState: StokState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case Actions.ReceiveStokItems:
            currentState.isRequest = false;
            if (action.payload) {
                currentState.items = action.payload;
                if (currentState.items) {
                    currentState.items.forEach(i => {
                        i.group = action.categories.find(g => i.STOKGRUPID == g.STOKGRUPID);
                        if (i.SDEPART)
                            i.departments = i.SDEPART.split(',')
                    });
                }
            }
            return { ...currentState };
        case Actions.RequestStokItems:
            currentState.isRequest = true;
            return { ...currentState };
        default:
            break;
    }

    return currentState || unloadedState;
};
