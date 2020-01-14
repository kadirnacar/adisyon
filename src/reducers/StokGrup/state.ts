import { IStokGrup } from '@models';

export enum Actions {
    RequestStokGrupItems = "REQUEST_STOKGRUP_ITEMS",
    ReceiveStokGrupItems = "RECEIVE_STOKGRUP_ITEMS"
}

export interface StokGrupState {
    items?: IStokGrup[];
}

export interface IRequestStokGrupItemsAction {
    type: Actions.RequestStokGrupItems;
}

export interface IReceiveStokGrupItemsAction {
    type: Actions.ReceiveStokGrupItems;
    payload: IStokGrup[];
}