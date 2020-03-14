import config from '@config';
import { ServiceBase } from "./ServiceBase";

export class UserService extends ServiceBase {
    public static async getItem(username: string, password: string) {
        var result = await this.requestJson<any>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Action": "Login",
                "Usercode": username,
                "Password": password,
                "Tenant": config.tenant
            }
        }, false);
       
        return result;
    }
}