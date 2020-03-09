
import { ActivityOrderReducer, ConfigState, ConfigReducer, ActivityOrderState, ActivityReducer, ActivityState, AdisyonReducer, AdisyonState, ApplicationReducer, AppState, CustomerReducer, CustomerState, DepartmentReducer, DepartmentState, ExchangeReducer, ExchangeState, GarsonReducer, GarsonState, StokGrupReducer, StokGrupState, StokReducer, StokState, TableReducer, TableState, UserReducer, UserState } from '@reducers';
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
    Exchange?: ExchangeState;
    Config?: ConfigState;
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
    Table: TableReducer,
    Exchange: ExchangeReducer,
    Config: ConfigReducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): Promise<any>;
}

export interface AppThunkActionAsync<TAction, TResult> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): Promise<TResult>
}