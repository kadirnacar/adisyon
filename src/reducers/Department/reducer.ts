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
            currentState.items = action.payload;
            return { ...currentState };
        case Actions.RequestDepartmentItems:
            return { ...currentState };
        case Actions.SetCurrent:
            currentState.current = action.payload;
            return { ...currentState };
        default:
            break;
    }

    return currentState || unloadedState;
};
