import config from '@config';
import { ServiceBase } from "./ServiceBase";

export class StokService extends ServiceBase {
    public static async getItems() {
       
        var result = await this.requestJson<any>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Parameters": {
                    "PORTALID": config.tenant,
                },
                "Action": "Execute",
                "Object": "SP_POS_GETPOSDATA"
            }
        });

        return result;
    }
}