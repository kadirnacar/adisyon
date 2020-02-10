import config from '@config';
import { ServiceBase } from "./ServiceBase";
import { AngusResponse } from './AngusResponse';
import { IDepartment, ITable } from '@models';

export class TableService extends ServiceBase {
    public static async getDepartmentTables(departmentCode: string) {
        var result = await this.requestJson<AngusResponse<ITable>>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Object": "MASALAR",
                "Action": "Select",
                "Select": [
                    "MASANO",
                    "MASAGRUP"
                ],
                "Where": [{
                    "Column": "DEPART",
                    "Operator": "=",
                    "Value": departmentCode
                }],
                "OrderBy": [
                    {
                        "Column": "MASANO",
                        "Direction": "ASC"
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