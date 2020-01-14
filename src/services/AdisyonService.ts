import config from '@config';
import { ServiceBase } from "./ServiceBase";
import { IAdisyon } from '@models';

export class AdisyonService extends ServiceBase {
    public static async sendItem(data: IAdisyon) {
        var result = await this.requestJson<any>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Action": "",
                "Object": "",
                "Select": [
                    
                ],
                "Where": [
                    {
                        
                    }
                ],
                "Paging": {
                    "Current": 1,
                    "ItemsPerPage": 9999
                }
            }
        });
        return result.value;
    }
}