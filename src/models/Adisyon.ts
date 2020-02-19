export interface IAdisyon {
    GUESTNO?: number;
    GUESTID?: number;
    DEPCODE?: string;
    TABLENO?: string;
    NOTES?: string;
    GARSONID?: number;
    ITEMS?: IAdisyonProduct[];
}
export interface IAdisyonProduct {
    ID?: number;
    QUANTITY?: number;
    DESC?: string;
    OLD?: boolean;
}
