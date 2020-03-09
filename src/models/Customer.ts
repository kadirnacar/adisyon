export interface ICustomer {
    BALANCE: number;
    BOARDTYPE: string;
    GUESTNO: number;
    GUESTID: number;
    NAME: string;
    ODANO: string;
    RESID: string;
    SURNAME: string;
    DISCOUNT_RATE: number;
    ALLINCLUSIVE?:boolean;
    Trans: ICustomerTrans[];
}

export interface ICustomerTrans {
    OPERATIONTYPE: string;
    LOCATION: string;
    DATE: Date;
    TIME: Date;
    PRODUCT: string;
    GUESTNAME: string;
    GUESTSURNAME: string;
    RESGUESTID: number;
    AMOUNT: number;
    CTOTAL: number;
    MCTOTAL: number;
    CURCODE: number;
    CURRATE: number;
}
