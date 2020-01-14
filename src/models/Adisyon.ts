export interface IAdisyon {
    LOGINId?: number;
    DEPID?: string;
    PRODUCTS?: IAdisyonProduct[];
}
export interface IAdisyonProduct {
    STOKID?: number;
    QUANTITY?: number;
    PRICE?: number;
}
