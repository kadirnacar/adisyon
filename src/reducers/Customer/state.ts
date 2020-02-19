import { ICustomer, ICustomerTrans } from '@models';
import { IBaseReducer } from '../BaseReducer';

export enum Actions {
    RequestCustomerItem = "REQUEST_CUSTOMER",
    ReceiveCustomerItem = "RECEIVE_CUSTOMER",
    RequestCustomerTrans = "REQUEST_CUSTOMER_TRANS",
    ReceiveCustomerTrans = "RECEIVE_CUSTOMER_TRANS",
    ClearItem = "CLEAR_CUSTOMER",
}

export interface CustomerState extends IBaseReducer {
    current: ICustomer;
    currentTrans: ICustomerTrans[];
}

export interface IClearAction {
    type: Actions.ClearItem;
}

export interface IRequestCustomerItemAction {
    type: Actions.RequestCustomerItem;
}

export interface IReceiveCustomerItemAction {
    type: Actions.ReceiveCustomerItem;
    payload: ICustomer;
}

export interface IRequestCustomerTransAction {
    type: Actions.RequestCustomerTrans;
}

export interface IReceiveCustomerTransAction {
    type: Actions.ReceiveCustomerTrans;
    payload: ICustomerTrans[];
}