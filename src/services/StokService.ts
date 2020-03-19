import config from '@config';
import { ServiceBase } from "./ServiceBase";

export class StokService extends ServiceBase {
    public static async getItems3() {
       
        var result = await this.requestJson<any>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Parameters": {
                    "PORTALID": config.tenant,
                },
                "Action": "Execute",
                "Object": "SP_EASYPOS3_GETPOSDATA"
            }
        });

        return result;
    }
    public static async getItems() {
        var result = await this.requestJson<any>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Action": "Select",
                "Object": "STOK",
                "Select": [
                    "STOKID",
                    "ADI",
                    "SFIYAT1",
                    "BARKOD",
                    "FOTO",
                    "SDEPART",
                    "STOKGRUPID",
                    "SDOVIZ",
                    "PORSIYONLUSATIS",
                    "INCLUDEDIN_AI"
                ],
                "Where": [
                    {
                        "Column": "MOBILPOS",
                        "Operator": "=",
                        "Value": "1",
                    },
                    {
                        "Column": "ISACTIVITIY",
                        "Operator": "=",
                        "Value": false//Activitiler için true 
                    }
                ],
                "Paging": {
                    "Current": 1,
                    "ItemsPerPage": 9999
                }
            }
        });
        return result;
    }
}