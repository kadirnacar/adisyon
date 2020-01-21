import config from '@config';
import { ServiceBase } from "./ServiceBase";
import { AngusResponse } from './AngusResponse';
import { IDepartment } from '@models';

export class DepartmentService extends ServiceBase {
    public static async getItems() {
        var result = await this.requestJson<AngusResponse<IDepartment>>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Action": "Select",
                "Object": "DEPART",
                "Select": [
                    "KODU",
                    "ADI",
                    "ID",
                ],
                "Where": [
                    {
                        "Column": "ISLEMTURU",
                        "Operator": "=",
                        "Value": "1"//4:activity
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