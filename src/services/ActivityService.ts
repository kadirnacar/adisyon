import config from '@config';
import { ServiceBase } from "./ServiceBase";

export class ActivityService extends ServiceBase {
    public static async getItems(date: string) {
        var result = await this.requestJson<any>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Parameters": {
                    "PORTALID": config.tenant,
                    "TOURDATE": date
                },
                "Action": "Execute",
                "Object": "SP_PARK_MOBILE_GETACTIVITIES"
            }
        });
        
        return result;
    }
    public static async getTurnikeItems(date: string) {
        var result = await this.requestJson<any>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Parameters": {
                    "PORTALID": config.tenant,
                    "TOURDATE": date
                },
                "Action": "Execute",
                "Object": "SP_PARK_MOBILE_GETTICKETS"
            }
        });
        
        return result;
    }
}