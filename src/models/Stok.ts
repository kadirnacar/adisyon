import { IStokGrup } from "./StokGrup";

export interface IStok {
    STOKID: number;
    ADI: string;
    SFIYAT1: number;
    SDOVIZ: string;
    SDEPART: string;
    STOKGRUPID: number;
    FOTO: string;
    PORSIYONLUSATIS: boolean;
    BARKOD?: string;
    INCLUDEDIN_AI?: boolean;
    departments?: string[];
    group?: IStokGrup;
}
