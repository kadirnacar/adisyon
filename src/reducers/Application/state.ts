import { IBaseReducer } from '../BaseReducer';

export enum Applications {
    Siparis,
    AktiviteSatis,
    AktiviteKontrol,
    Turnike
}

export enum Actions {
    SetCurrent = "SET_CURRENT_APP"
}

export interface AppState {
    current?: Applications;
}

export interface ISetCurrentAction {
    type: Actions.SetCurrent;
    payload: Applications;
}