export interface ICustomer {
    BALANCE: number;
    BOARDTYPE: string;
    GUESTID: number;
    NAME: string;
    ODANO: string;
    RESID: string;
    SURNAME: string;
    DISCOUNT_RATE: number;
    ALLINCLUSIVE?: boolean;
    SALETYPEID?: number;
    POSCHECKTYPEID?: number;
    Trans: ICustomerTrans[];
}
export interface ICustomerFreeItems {
    ID: number;
    PORTALID: number;
    PARKGUESTID: number;
    DEPID: number;
    ITEMID: number;
    ITEMGROUPID: number;
    QUANTITY: number;
    USEDQUANTITY: number;
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
