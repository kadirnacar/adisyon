import { Action } from 'redux';
import { Actions, DepartmentState, IReceiveDepartmentItemsAction, ISetCurrentAction, IRequestDepartmentItemsAction } from './state';

const unloadedState: DepartmentState = {
    items: [],
    current: null
};

export type KnownAction = IReceiveDepartmentItemsAction | IRequestDepartmentItemsAction | ISetCurrentAction;

export const reducer = (currentState: DepartmentState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case Actions.ReceiveDepartmentItems:
            currentState.isRequest = false;
            currentState.items = action.payload;
            currentState.items.forEach(i => {
                if (i.MOBILPOSCONFIG)
                    i.MOBILPOSCONFIG = JSON.parse(i.MOBILPOSCONFIG);
            })
            return { ...currentState };
        case Actions.RequestDepartmentItems:
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
