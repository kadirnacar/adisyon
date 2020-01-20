import config from '@config';
import { ServiceBase } from "./ServiceBase";
import { IAdisyon } from '@models';

export class AdisyonService extends ServiceBase {
    public static async sendItem(data: IAdisyon) {

        const items = [
            {
                "ID": 26139,
                "QUANTITY": 1.5,
                "DESC": ""
                
            },
            {
                "ID": 26141,
                "QUANTITY": 1.5,
                "DESC": ""
            },
            {
                "ID": 26154,
                "QUANTITY": 2,
                "DESC": ""
            }
        ]

        var result = await this.requestJson<any>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Parameters": {
                    "ITEMS": JSON.stringify(items),
                    "DEPCODE": "02",
                    "PAYTYPE": "ROOM",
                    "RESID": "44089",
                    "GUESTNO": 1,
                    "NOTES": null,
                    "GARSONID": 498
                },
                "Action": "Execute",
                "Object": "SP_EASYPOS_SENDCHECK_V1"
            }
        });
        return result.value;
    }
}