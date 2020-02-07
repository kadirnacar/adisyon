import config from '@config';
import { ServiceBase } from "./ServiceBase";
import { IActivityOrder, IActivity, ISeance } from '@models';
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

        return result;
    }
    public static async checkkItem(activity: IActivity, seance: ISeance, guestId: string) {

        var result = await this.requestJson<any>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Parameters": {
                    "TOURID": activity.ID,
                    "SEANCEID": seance ? seance.SEANCEID : null,
                    "CARDID": guestId,
                    "PORTALID": config.tenant
                },
                "Action": "Execute",
                "Object": "SP_PARK_TOUR_READPASS_VIRTUAL"
            }
        });
       
        return result;
    }
}