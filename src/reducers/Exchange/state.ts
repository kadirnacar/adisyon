import { IExchange } from '@models';
import { IBaseReducer } from '../BaseReducer';

export enum Actions {
    RequestExchangeItems = "REQUEST_EXCHANGE_ITEMS",
    ReceiveExchangeItems = "RECEIVE_EXCHANGE_ITEMS"
}

export interface ExchangeState extends IBaseReducer {
    items?: IExchange[];
}

export interface IRequestExchangeItemsAction {
    type: Actions.RequestExchangeItems;
}

export interface IReceiveExchangeItemsAction {
    type: Actions.ReceiveExchangeItems;
    payload: IExchange[];
}