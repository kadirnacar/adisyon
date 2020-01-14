import { IUser } from '@models';

export enum Actions {
    RequestUserItem = "REQUEST_USER",
    ReceiveUserItem = "RECEIVE_USER",
}

export interface UserState {
    current: IUser;
}

export interface IRequestUserItemAction {
    type: Actions.RequestUserItem;
}

export interface IReceiveUserItemAction {
    type: Actions.ReceiveUserItem;
    payload: IUser;
}