import config from '@config';
import { IAdisyon } from '@models';
import { ServiceBase } from "./ServiceBase";

export class AdisyonService extends ServiceBase {
    public static async sendItem(data: IAdisyon, type: string) {

        var result = await this.requestJson<any>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Parameters": {
                    "ITEMS": JSON.stringify(data.ITEMS),
                    "DEPCODE": data.DEPCODE,
                    "TABLENO": data.TABLENO,
                    "PAYTYPE": type,
                    "GUESTID": data.GUESTID,
                    "GUESTNO": data.GUESTNO,
                    "NOTES": data.NOTES,
                    "GARSONID": data.GARSONID
                },
                "Action": "Execute",
                "Object": "SP_PARK_MOBILE_SENDCHECK"
            }
        });
      
        return result;
    }
}