import { IActivity } from '@models';
import { IBaseReducer } from '../BaseReducer';

export enum Actions {
    RequestActivityItems = "REQUEST_ACTIVITY_ITEMS",
    ReceiveActivityItems = "RECEIVE_ACTIVITY_ITEMS"
}

export interface ActivityState extends IBaseReducer {
    items?: IActivity[];
    date?: Date;
}

export interface IRequestActivityItemsAction {
    type: Actions.RequestActivityItems;
}

export interface IReceiveActivityItemsAction {
    type: Actions.ReceiveActivityItems;
    payload: any[];
    date: Date;
}