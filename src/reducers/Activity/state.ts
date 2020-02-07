import { IActivity } from '@models';
import { IBaseReducer } from '../BaseReducer';

export enum Actions {
    RequestActivityItems = "REQUEST_ACTIVITY_ITEMS",
    ReceiveActivityItems = "RECEIVE_ACTIVITY_ITEMS",
    RequestTurnikeItems = "REQUEST_TURNIKE_ITEMS",
    ReceiveTurnikeItems = "RECEIVE_TURNIKE_ITEMS"
}

export interface ActivityState extends IBaseReducer {
    items?: IActivity[];
    turnike?: IActivity[];
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

export interface IRequestTurnikeItemsAction {
    type: Actions.RequestTurnikeItems;
}

export interface IReceiveTurnikeItemsAction {
    type: Actions.ReceiveTurnikeItems;
    payload: any[];
    date: Date;
}