import { ICustomer } from '@models';
import { IBaseReducer } from '../BaseReducer';

export enum Actions {
    RequestCustomerItem = "REQUEST_CUSTOMER",
    ReceiveCustomerItem = "RECEIVE_CUSTOMER",
    ClearItem = "CLEAR_CUSTOMER",
}

export interface CustomerState extends IBaseReducer {
    current: ICustomer;
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