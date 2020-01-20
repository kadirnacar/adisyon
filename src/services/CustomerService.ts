import config from '@config';
import { ServiceBase } from "./ServiceBase";

export class CustomerService extends ServiceBase {
    public static async getItem(nfcCode: string) {
        var result = await this.requestJson<any>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Action": "Execute",
                "Object": "SP_EASYPOS_FINDGUEST",
                "Parameters": {
                    "CARDNO": nfcCode
                }
            }
        });
        return result.value;
    }
}