import { IConfig } from '@models';

export enum Actions {
    SetConfig = "SET_CONFIG",
}

export interface ConfigState {
    config: IConfig;
}

export interface ISetConfigAction {
    type: Actions.SetConfig;
    payload: IConfig;
}