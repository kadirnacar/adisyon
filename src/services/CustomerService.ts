import config from '@config';
import { ICustomer } from '@models';
import { AngusProcedureResponse } from './AngusResponse';
import { ServiceBase } from "./ServiceBase";

export class CustomerService extends ServiceBase {
    public static async getItem(nfcCode: string) {
        var result = await this.requestJson<AngusProcedureResponse<any>>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Action": "Execute",
                "Object": "SP_POS_FINDGUEST",
                "Parameters": {
                    "PARKCARDNO": nfcCode
                }
            }
        });
        return result;
    }
    public static async getFreeItems(customerId: number) {
        var result = await this.requestJson<any>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Action": "Function",
                "Object": "FN_PARK_GUESTFREEITEMS",
                "Parameters": {
                    "GUESTID": customerId,
                    "PORTALID": config.tenant
                }
            }
        });
        return result;
    }
    public static async getTransactions(nfcCode: string) {

        var result = await this.requestJson<any>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Action": "Function",
                "Object": "FN_PARK_GETTRANSACTIONS",
                "Parameters": {
                    "CARDNO": nfcCode,
                    "PORTALID": config.tenant
                }
            }
        });

        return result;
    }
}