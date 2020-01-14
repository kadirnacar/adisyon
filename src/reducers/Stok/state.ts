import { IStok } from '@models';

export enum Actions {
    RequestStokItems = "REQUEST_STOK_ITEMS",
    ReceiveStokItems = "RECEIVE_STOK_ITEMS"
}

export interface StokState {
    items?: IStok[];
}

export interface IRequestStokItemsAction {
    type: Actions.RequestStokItems;
}

export interface IReceiveStokItemsAction {
    type: Actions.ReceiveStokItems;
    payload: IStok[];
}