import { ITable, IAdisyonProduct } from '@models';
import { IBaseReducer } from '../BaseReducer';

export enum Actions {
    RequestTableItems = "REQUEST_TABLE_ITEMS",
    ReceiveTableItems = "RECEIVE_TABLE_ITEMS",
    RequestOpenedTableItems = "REQUEST_OPENED_TABLE_ITEMS",
    ReceiveOpenedTableItems = "RECEIVE_OPENED_TABLE_ITEMS",
    RequestTableAdisyonItems = "REQUEST_TABLE_ADISYON_ITEMS",
    ReceiveTableAdisyonItems = "RECEIVE_TABLE_ADISYON_ITEMS",
    SetCurrent = "SET_CURRENT_TABLE",
    Clear = "CLEAR_TABLE",
}

export interface TableState extends IBaseReducer {
    items?: ITable[];
    openedItems?: ITable[];
    tableAdisyon?: IAdisyonProduct[];
    current: ITable;
}

export interface IRequestTableAdisyonItemsAction {
    type: Actions.RequestTableAdisyonItems;
}

export interface IReceiveTableAdisyonItemsAction {
    type: Actions.ReceiveTableAdisyonItems;
    payload: IAdisyonProduct[];
}

export interface IRequestOpenedTableItemsAction {
    type: Actions.RequestOpenedTableItems;
}

export interface IReceiveOpenedTableItemsAction {
    type: Actions.ReceiveOpenedTableItems;
    payload: ITable[];
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

export interface IClearAction {
    type: Actions.Clear;
}