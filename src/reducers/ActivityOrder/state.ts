import { IActivityOrder, IActivity, ISeance } from '@models';
import { IBaseReducer } from '../BaseReducer';

export enum Actions {
    RequestSendActivityOrderItems = "REQUEST_SEND_ACTIVITYORDER_ITEMS",
    ReceiveSendActivityOrderItems = "RECEIVE_SEND_ACTIVITYORDER_ITEMS",
    RequestCheckItem = "REQUEST_CHECK_ITEM",
    ReceiveCheckItem = "RECEIVE_CHECK_ITEM",
    SetCurrent = "SET_CURRENT_ACTIVITYORDER",
    SetCheckItem = "SET_CHECK_ACTIVITYORDER",
}

export interface ActivityOrderState extends IBaseReducer {
    current?: IActivityOrder;
    checkItem?: IActivity;
    checkItemSeance?: ISeance;
}

export interface IRequestActivityOrderItemsAction {
    type: Actions.RequestSendActivityOrderItems;
}

export interface IReceiveActivityOrderItemsAction {
    type: Actions.ReceiveSendActivityOrderItems;
}

export interface IRequestCheckItemAction {
    type: Actions.RequestCheckItem;
}

export interface IReceiveCheckItemAction {
    type: Actions.ReceiveCheckItem;
}

export interface ISetCurrentAction {
    type: Actions.SetCurrent;
    payload: IActivityOrder;
}

export interface ISetCheckAction {
    type: Actions.SetCheckItem;
    checkItem: IActivity;
    checkItemSeance: ISeance;
}