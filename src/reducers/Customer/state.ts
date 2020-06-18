import {ICustomer, ICustomerTrans} from '@models';
import {IBaseReducer} from '../BaseReducer';
import {ICustomerFreeItems} from 'src/models/Customer';

export enum Actions {
  RequestCustomerItem = 'REQUEST_CUSTOMER',
  ReceiveCustomerItem = 'RECEIVE_CUSTOMER',
  RequestCustomerTrans = 'REQUEST_CUSTOMER_TRANS',
  ReceiveCustomerTrans = 'RECEIVE_CUSTOMER_TRANS',
  RequestCustomerFreeItems = 'REQUEST_CUSTOMER_FREEITEMS',
  ReceiveCustomerFreeItems = 'RECEIVE_CUSTOMER_FREEITEMS',
  ClearItem = 'CLEAR_CUSTOMER',
}

export interface CustomerState extends IBaseReducer {
  current: ICustomer;
  currentTrans: ICustomerTrans[];
  freeItems: {[key: number]: ICustomerFreeItems};
  freeGroups: {[key: number]: ICustomerFreeItems};
  allFreeItems: ICustomerFreeItems[];
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

export interface IRequestCustomerFreeItemsAction {
  type: Actions.RequestCustomerFreeItems;
}

export interface IReceiveCustomerFreeItemsAction {
  type: Actions.ReceiveCustomerFreeItems;
  payload: ICustomerFreeItems[];
}
