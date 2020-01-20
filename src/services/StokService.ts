import config from '@config';
import { ServiceBase } from "./ServiceBase";

export class StokService extends ServiceBase {
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
                    "FOTO",
                    "SDEPART",
                    "STOKGRUPID",
                    "SDOVIZ",
                    "PORSIYONLUSATIS"
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
        return result.value;
    }
}