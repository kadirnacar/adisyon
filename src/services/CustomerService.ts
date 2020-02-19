import config from '@config';
import { ServiceBase } from "./ServiceBase";
import { AngusResponse, AngusProcedureResponse } from './AngusResponse';
import { ICustomer } from '@models';

export class CustomerService extends ServiceBase {
    public static async getItem(nfcCode: string) {

        var result = await this.requestJson<AngusProcedureResponse<ICustomer>>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Action": "Execute",
                "Object": "SP_PARK_MOBILE_FINDGUEST",
                "Parameters": {
                    "CARDNO": nfcCode
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