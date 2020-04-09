import { IStokGrup } from "./StokGrup";

export interface IStok {
    STOKID: number;
    BARKOD: string;
    ADI: string;
    SFIYAT1: number;
    SDOVIZ: string;
    SDEPART: string;
    STOKGRUPID: number;
    FOTO: string;
    PORSIYONLUSATIS: boolean;
    INCLUDEDIN_AI?: boolean;
    HYERI: number;
    departments?: string[];
    group?: IStokGrup;
}
