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
        return result.value;
    }
}