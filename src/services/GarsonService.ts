import config from '@config';
import { ServiceBase } from "./ServiceBase";
import { AngusResponse } from './AngusResponse';
import { IUser, IGarson } from '@models';

export class GarsonService extends ServiceBase {
    public static async getItem(garsonId: number) {
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
        return result.value;
    }
}