import config from '@config';
import { ServiceBase } from "./ServiceBase";
import { IAdisyon } from '@models';
import { AngusProcedureResponse } from './AngusResponse';

export class AdisyonService extends ServiceBase {
    public static async sendItem(data: IAdisyon) {

        var result = await this.requestJson<any>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Parameters": {
                    "ITEMS": JSON.stringify(data.ITEMS),
                    "DEPCODE": data.DEPCODE,
                    "PAYTYPE": "ROOM",
                    "GUESTID": data.GUESTID,
                    "GUESTNO": data.GUESTNO,
                    "NOTES": data.NOTES,
                    "GARSONID": data.GARSONID
                },
                "Action": "Execute",
                "Object": "SP_PARK_MOBILE_SENDCHECK"
            }
        });
        return result.value;
    }
}