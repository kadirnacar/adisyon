import config from '@config';
import { ServiceBase } from "./ServiceBase";
import { AngusResponse } from './AngusResponse';
import { IExchange } from '@models';
import moment = require('moment');

export class ExchangeService extends ServiceBase {
    public static async getItems(date: string) {
        var result = await this.requestJson<any>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Action": "Function",
                "Object": "FN_EXCHANGE_LIST",
                "Paramaters": {
                    "DATE": date,
                    "PORTALID": config.tenant
                }
            }
        });

        return result;
    }
}