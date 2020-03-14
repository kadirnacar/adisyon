import config from '@config';
import { ITable } from '@models';
import { AngusResponse } from './AngusResponse';
import { ServiceBase } from "./ServiceBase";

export class TableService extends ServiceBase {
    public static async getDepartmentTables(departmentCode: string) {
        var result = await this.requestJson<AngusResponse<ITable>>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Object": "MASALAR",
                "Action": "Select",
                "Select": [
                    "MASANO",
                    "MASAGRUP"
                ],
                "Where": [{
                    "Column": "DEPART",
                    "Operator": "=",
                    "Value": departmentCode
                }],
                "OrderBy": [
                    {
                        "Column": "MASANO",
                        "Direction": "ASC"
                    }
                ],
                "Paging": {
                    "Current": 1,
                    "ItemsPerPage": 9999
                }
            }
        });

        return result;
    }
    public static async getOpenedTables(departmentCode: string) {
        var result = await this.requestJson<AngusResponse<ITable>>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Object": "QA_EASYPOS_ACIK_MASALAR",
                "Action": "Select",
                "Select": [
                    "MASANO",
                    "MASAADI",
                    "SEZLONG",
                    "TOPLAM",
                    "KISI",
                    "GADI",
                    "ASAATI",
                    "STATU",
                    "SONSIPSAATI",
                    "ILGIZAMANI",
                    "FISCOUNTER"
                ],
                "Where": [
                    {
                        "Column": "DEPKODU",
                        "Operator": "=",
                        "Value": departmentCode
                    }
                ],
                "Paging": {
                    "Current": 1,
                    "ItemsPerPage": 9999
                }
            }
        });

        return result;
    }
    public static async getTableAdisyon(departmentCode: string, masaNo: string) {
        var result = await this.requestJson<AngusResponse<any>>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Object": "QA_EASYPOS_CHECKDETAIL",
                "Action": "Select",
                "Select": [
                    "ADET",
                    "ACIKLAMA",
                    "STOKID"
                ],
                "Where": [
                    {
                        "Column": "MASANO",
                        "Operator": "=",
                        "Value": masaNo
                    },
                    {
                        "Column": "DEPTKODU",
                        "Operator": "=",
                        "Value": departmentCode
                    },
                    {
                        "Column": "ADET",
                        "Operator": ">",
                        "Value": 0
                    }
                ],
                "Joins": [

                    {
                        "Object": "STOK",
                        "Key": "STOKID",
                        "Field": "STOKID",
                        "Fields": [
                            "PORSIYONLUSATIS"
                        ]
                    }
                ],
                "OrderBy": [
                    {
                        "Column": "BEKLET",
                        "Direction": "ASC"
                    },
                    {
                        "Column": "SIRA",
                        "Direction": "ASC"
                    }
                ],
                "Paging": {
                    "Current": 1,
                    "ItemsPerPage": 9999
                }
            }
        });

        return result;
    }
}