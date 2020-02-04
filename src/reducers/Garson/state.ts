import { IGarson } from '@models';
import { IBaseReducer } from '../BaseReducer';

export enum Actions {
    RequestGarsonItem = "REQUEST_GARSON",
    ReceiveGarsonItem = "RECEIVE_GARSON",
    ClearItem = "CLEAR_GARSON",
}

export interface GarsonState extends IBaseReducer {
    current: IGarson;
}

export interface IClearAction {
    type: Actions.ClearItem;
}

export interface IRequestGarsonItemAction {
    type: Actions.RequestGarsonItem;
}

export interface IReceiveGarsonItemAction {
    type: Actions.ReceiveGarsonItem;
    payload: IGarson;
}