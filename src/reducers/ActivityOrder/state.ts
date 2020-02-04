import { IActivityOrder } from '@models';
import { IBaseReducer } from '../BaseReducer';

export enum Actions {
    RequestSendActivityOrderItems = "REQUEST_SEND_ACTIVITYORDER_ITEMS",
    ReceiveSendActivityOrderItems = "RECEIVE_SEND_ACTIVITYORDER_ITEMS",
    SetCurrent = "SET_CURRENT_ACTIVITYORDER"
}

export interface ActivityOrderState extends IBaseReducer {
    current?: IActivityOrder;
}

export interface IRequestActivityOrderItemsAction {
    type: Actions.RequestSendActivityOrderItems;
}

export interface IReceiveActivityOrderItemsAction {
    type: Actions.ReceiveSendActivityOrderItems;
}

export interface ISetCurrentAction {
    type: Actions.SetCurrent;
    payload: IActivityOrder;
}