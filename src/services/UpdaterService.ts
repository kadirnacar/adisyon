import config from '@config';
import { ServiceBase } from "./ServiceBase";

export class UpdaterService extends ServiceBase {
    public static async getUpdateInfo() {
        var result = await this.requestJson<any>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Action": "Select",
                "Object": "PORTAL_PARAMS",
                "Select": [
                    "POSMOBILE_VERSIONURL",
                    "POSMOBILE_VERSIONNO"
                ],
                "Where": [{
                    "Column": "PORTALID",
                    "Operator": "=",
                    "Value": config.tenant
                }]

            }
        });
        return result;
    }
}