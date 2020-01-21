import config from '@config';
import { ServiceBase } from "./ServiceBase";
import { AngusResponse } from './AngusResponse';
import { IUser } from '@models';

export class UserService extends ServiceBase {
    public static async getItem(password: string) {
        var result = await this.requestJson<AngusResponse<IUser>>({
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
                        "Column": "GSIFRE",
                        "Operator": "=",
                        "Value": password
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