import config from '@config';
import { ServiceBase } from "./ServiceBase";

export class UserService extends ServiceBase {
    public static async getItem(username: string) {
        var result = await this.requestJson<any>({
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
                        "Value": username
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