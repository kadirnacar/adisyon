import { IStok } from '@models';
import { IBaseReducer } from '../BaseReducer';

export enum Actions {
    RequestStokItems = "REQUEST_STOK_ITEMS",
    ReceiveStokItems = "RECEIVE_STOK_ITEMS"
}

export interface StokState extends IBaseReducer {
    items?: IStok[];
}

export interface IRequestStokItemsAction {
    type: Actions.RequestStokItems;
}

export interface IReceiveStokItemsAction {
    type: Actions.ReceiveStokItems;
    payload: IStok[];
}