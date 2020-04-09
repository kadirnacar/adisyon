export interface AngusResponse<T> {
    SQL?: string;
    DataTypes?: any;
    TotalCount?: number;
    ResultSets?: Array<T>[];
}

export interface AngusProcedureResponse<T> extends Array<Array<T>> {
}
export interface FunctionReturn{
    Return?: string;
}
export interface AngusFunctionResponse<T> extends Array<Array<FunctionReturn>> {
}