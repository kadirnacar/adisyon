export interface IActivityOrder {
    GUESTNO?: number;
    GUESTID?: number;
    NOTES?: string;
    GARSONID?: number;
    ITEMS?: IActivityProduct[];
}
export interface IActivityProduct {
    ItemID?: number;
    Quantity?: number;
    SeanceID?: number;
    TicketTypeID?: string;
}
