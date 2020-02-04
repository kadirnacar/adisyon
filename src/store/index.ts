
import { DepartmentState, DepartmentReducer } from '@reducers';
import { GarsonState, GarsonReducer } from '@reducers';
import { StokGrupState, StokGrupReducer } from '@reducers';
import { StokState, StokReducer } from '@reducers';
import { CustomerState, CustomerReducer } from '@reducers';
import { AdisyonState, AdisyonReducer } from '@reducers';
import { UserState, UserReducer } from '@reducers';
import { AppState, ApplicationReducer } from '@reducers';
import { ActivityState, ActivityReducer } from '@reducers';
import * as LocalStorage from './localStorage';

export { LocalStorage };
export interface ApplicationState {
    Department?: DepartmentState;
    User?: UserState;
    StokGrup?: StokGrupState;
    Customer?: CustomerState;
    Adisyon?: AdisyonState;
    Stok?: StokState;
    Garson?: GarsonState;
    Application?: AppState;
    Activity?: ActivityState;
}

export const reducers = {
    Department: DepartmentReducer,
    User: UserReducer,
    StokGrup: StokGrupReducer,
    Customer: CustomerReducer,
    Adisyon: AdisyonReducer,
    Stok: StokReducer,
    Garson: GarsonReducer,
    Activity: ActivityReducer,
    Application: ApplicationReducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): Promise<any>;
}

export interface AppThunkActionAsync<TAction, TResult> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): Promise<TResult>
}