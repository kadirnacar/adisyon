import { IAdisyon } from '@models';
import { IBaseReducer } from '../BaseReducer';

export enum Actions {
    RequestSendAdisyonItems = "REQUEST_SEND_ADISYON_ITEMS",
    ReceiveSendAdisyonItems = "RECEIVE_SEND_ADISYON_ITEMS",
    SetCurrent = "SET_CURRENT_ADISYON"
}

export interface AdisyonState extends IBaseReducer {
    current?: IAdisyon;
}

export interface IRequestAdisyonItemsAction {
    type: Actions.RequestSendAdisyonItems;
}

export interface IReceiveAdisyonItemsAction {
    type: Actions.ReceiveSendAdisyonItems;
}

export interface ISetCurrentAction {
    type: Actions.SetCurrent;
    payload: IAdisyon;
}