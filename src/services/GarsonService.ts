import config from '@config';
import { IGarson } from '@models';
import { AngusResponse, AngusFunctionResponse } from './AngusResponse';
import { ServiceBase } from "./ServiceBase";

export class GarsonService extends ServiceBase {
    public static async getItem(garsonId: number) {
        var result = await this.requestJson<AngusFunctionResponse<IGarson>>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Action": "Function",
                "Object": "FN_POS_STAFFJSON",
                "Parameters": {
                    "STAFFID": garsonId
                }
            }
        });

        return result;
    }
    public static async getItem_old(garsonId: number) {
        var result = await this.requestJson<AngusResponse<IGarson>>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Action": "Select",
                "Object": "GARSON",
                "Select": [
                    "ID",
                    "GADI",
                    "GKODU",
                    "DEPKODU",
                    "GGRUPID"
                ],
                "Where": [
                    {
                        "Column": "ID",
                        "Operator": "=",
                        "Value": garsonId
                    }
                ],
                "Paging": {
                    "Current": 1,
                    "ItemsPerPage": 1
                },
                "Joins": [
                    {
                        "Object": "GARSONGRUP",
                        "Key": "GGRUPID",
                        "Field": "GGRUPID",
                        "Fields": [
                            "GRUPADI"
                        ]
                    }
                ]
            }
        });

        return result;
    }
}