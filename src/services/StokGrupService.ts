import config from '@config';
import { IStokGrup } from '@models';
import { AngusResponse } from './AngusResponse';
import { ServiceBase } from "./ServiceBase";

export class StokGrupService extends ServiceBase {
    public static async getItems() {
        var result = await this.requestJson<AngusResponse<IStokGrup>>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Action": "Select",
                "Object": "STOKGRUP",
                "Select": [
                    "STOKGRUPID",
                    "ADI",
                    "KODU"
                ],
                "Where": [
                    {
                        "Column": "MOBILPOS",
                        "Operator": "=",
                        "Value": "1"
                    },
                    {
                        "Column": "TURU",
                        "Operator": "=",
                        "Value": "URUN"
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