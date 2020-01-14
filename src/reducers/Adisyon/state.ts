import { IAdisyon } from '@models';

export enum Actions {
    RequestSendAdisyonItems = "REQUEST_SEND_ADISYON_ITEMS",
    ReceiveSendAdisyonItems = "RECEIVE_SEND_ADISYON_ITEMS"
}

export interface AdisyonState {
    current?: IAdisyon;
}

export interface IRequestAdisyonItemsAction {
    type: Actions.RequestSendAdisyonItems;
}

export interface IReceiveAdisyonItemsAction {
    type: Actions.ReceiveSendAdisyonItems;
    payload: IAdisyon[];
}