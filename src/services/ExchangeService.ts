import config from '@config';
import { ServiceBase } from "./ServiceBase";

export class ExchangeService extends ServiceBase {
    public static async getItems(date: string) {
        var result = await this.requestJson<any>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Action": "Function",
                "Object": "FN_EXCHANGE_LIST",
                "Parameters": {
                    "DATE": date,
                    "PORTALID": config.tenant
                }
            }
        });
        return result;
    }
}