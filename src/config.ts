import { IConfig } from "@models";

// const config = {
//     restUrl: 'https://5004.hoteladvisor.net/',
//     tenant: 341,
//     useAlagart: false,
// };

class config {
    public static restUrl: string = 'http://webapi.landoflegend.com/';
    public static tenant: number = 341;
    public static useAlagart: boolean = false;

    public static setConfig(config: IConfig) {
        if (config) {
            this.restUrl = config.restUrl;
            this.tenant = config.tenant;
            this.useAlagart = config.useAlagart;
        }
    }

}

export default config; 