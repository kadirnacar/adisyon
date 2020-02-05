import config from '@config';
import { ServiceBase } from "./ServiceBase";
import { IActivityOrder } from '@models';
import { AngusProcedureResponse } from './AngusResponse';

export class ActivityOrderService extends ServiceBase {
    public static async sendItem(data: IActivityOrder) {
     
        var result = await this.requestJson<any>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Parameters": {
                    "ITEMS": JSON.stringify(data.ITEMS),
                    "GUESTID": data.GUESTID,
                    "PORTALID": config.tenant
                },
                "Action": "Execute",
                "Object": "SP_PARK_EXTRASCOMPLETERES"
            }
        });
        return result.value;
    }
}