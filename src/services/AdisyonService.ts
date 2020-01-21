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
                    "RESID": "44089",
                    "GUESTNO": data.GUESTNO,
                    "NOTES": data.NOTES,
                    "GARSONID": data.GARSONID
                },
                "Action": "Execute",
                "Object": "SP_EASYPOS_SENDCHECK_V1"
            }
        });
        return result.value;
    }
}