
import { ActivityOrderReducer, ActivityOrderState, ActivityReducer, TableReducer, TableState, ActivityState, AdisyonReducer, AdisyonState, ApplicationReducer, AppState, CustomerReducer, CustomerState, DepartmentReducer, DepartmentState, GarsonReducer, GarsonState, StokGrupReducer, StokGrupState, StokReducer, StokState, UserReducer, UserState } from '@reducers';
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
    ActivityOrder?: ActivityOrderState;
    Table?: TableState;
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
    ActivityOrder: ActivityOrderReducer,
    Application: ApplicationReducer,
    Table: TableReducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): Promise<any>;
}

export interface AppThunkActionAsync<TAction, TResult> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): Promise<TResult>
}