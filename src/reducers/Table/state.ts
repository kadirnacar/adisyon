import { ITable } from '@models';
import { IBaseReducer } from '../BaseReducer';

export enum Actions {
    RequestTableItems = "REQUEST_TABLE_ITEMS",
    ReceiveTableItems = "RECEIVE_TABLE_ITEMS",
    SetCurrent = "SET_CURRENT_TABLE"
}

export interface TableState extends IBaseReducer {
    items?: ITable[];
    current: ITable;
}

export interface IRequestTableItemsAction {
    type: Actions.RequestTableItems;
}

export interface IReceiveTableItemsAction {
    type: Actions.ReceiveTableItems;
    payload: ITable[];
}

export interface ISetCurrentAction {
    type: Actions.SetCurrent;
    payload: ITable;
}