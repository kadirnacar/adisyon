import { IStokGrup } from '@models';
import { IBaseReducer } from '../BaseReducer';

export enum Actions {
    RequestStokGrupItems = "REQUEST_STOKGRUP_ITEMS",
    ReceiveStokGrupItems = "RECEIVE_STOKGRUP_ITEMS"
}

export interface StokGrupState extends IBaseReducer {
    items?: IStokGrup[];
}

export interface IRequestStokGrupItemsAction {
    type: Actions.RequestStokGrupItems;
}

export interface IReceiveStokGrupItemsAction {
    type: Actions.ReceiveStokGrupItems;
    payload: IStokGrup[];
}