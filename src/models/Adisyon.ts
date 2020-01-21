export interface IAdisyon {
    GUESTNO?: number;
    DEPCODE?: string;
    NOTES?: string;
    GARSONID?: number;
    ITEMS?: IAdisyonProduct[];
}
export interface IAdisyonProduct {
    ID?: number;
    QUANTITY?: number;
    DESC?: string;
}
