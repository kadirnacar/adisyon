import { IBaseReducer } from '../BaseReducer';

export enum Applications {
    Siparis,
    AktiviteSatis,
    AktiviteKontrol,
    Turnike
}

export enum Actions {
    SetCurrent = "SET_CURRENT_APP",
    SetTitle = "SET_NFC_TITLE"
}

export interface AppState {
    current?: Applications;
    nfcScreenTitle?: string;
}

export interface ISetCurrentAction {
    type: Actions.SetCurrent;
    payload: Applications;
}

export interface ISetTitleAction {
    type: Actions.SetTitle;
    title: string;
}