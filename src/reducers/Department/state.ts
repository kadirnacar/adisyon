import { IDepartment } from '@models';

export enum Actions {
    RequestDepartmentItems = "REQUEST_DEPARTMENT_ITEMS",
    ReceiveDepartmentItems = "RECEIVE_DEPARTMENT_ITEMS",
    SetCurrent = "SET_CURRENT_DEPARTMENT"
}

export interface DepartmentState {
    items?: IDepartment[];
    current: IDepartment;
}

export interface IRequestDepartmentItemsAction {
    type: Actions.RequestDepartmentItems;
}

export interface IReceiveDepartmentItemsAction {
    type: Actions.ReceiveDepartmentItems;
    payload: IDepartment[];
}

export interface ISetCurrentAction {
    type: Actions.SetCurrent;
    payload: IDepartment;
}