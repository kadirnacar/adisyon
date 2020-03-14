export interface IAdisyon {
    GUESTID?: number;
    SALETYPEID?: number;
    DEPID?: any;
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
