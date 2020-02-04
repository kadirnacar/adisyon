export interface IActivity {
    ID: number;
    NAME?: string;
    ADULTPRICE?: number;
    Seances?: ISeance[];
}

export interface ISeance {
    SEANCEID: number;
    SEANCESTART?: Date;
    SEANCEAVAILABLESEATS?: number;
}
