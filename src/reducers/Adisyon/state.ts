import { IAdisyon } from '@models';
import { IBaseReducer } from '../BaseReducer';

export enum Actions {
    RequestSendAdisyonItems = "REQUEST_SEND_ADISYON_ITEMS",
    ReceiveSendAdisyonItems = "RECEIVE_SEND_ADISYON_ITEMS"
}

export interface AdisyonState extends IBaseReducer {
    current?: IAdisyon;
}

export interface IRequestAdisyonItemsAction {
    type: Actions.RequestSendAdisyonItems;
}

export interface IReceiveAdisyonItemsAction {
    type: Actions.ReceiveSendAdisyonItems;
    payload: IAdisyon[];
}