import { IEcr } from '@models';
import { IBaseReducer } from '../BaseReducer';

export enum Actions {
    RequestEcrItems = "REQUEST_ECR_ITEMS",
    ReceiveEcrItems = "RECEIVE_ECR_ITEMS",
    SetCurrent = "SET_CURRENT_ECR"
}

export interface EcrState extends IBaseReducer {
    items?: IEcr[];
    current: IEcr;
}

export interface IRequestEcrItemsAction {
    type: Actions.RequestEcrItems;
}

export interface IReceiveEcrItemsAction {
    type: Actions.ReceiveEcrItems;
    payload: IEcr[];
}

export interface ISetCurrentAction {
    type: Actions.SetCurrent;
    payload: IEcr;
}