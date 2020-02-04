export interface IActivityOrder {
    GUESTNO?: number;
    GUESTID?: number;
    NOTES?: string;
    GARSONID?: number;
    ITEMS?: IActivityProduct[];
}
export interface IActivityProduct {
    ID?: number;
    QUANTITY?: number;
    SEANCEID?: number;
    DESC?: string;
}
