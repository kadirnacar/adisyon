import config from '@config';
import { IAdisyon } from '@models';
import { ServiceBase } from "./ServiceBase";

export class AdisyonService extends ServiceBase {
    public static async sendItem(data: IAdisyon, type: string) {

        // var result = await this.requestJson<any>({
        //     url: `${config.restUrl}`,
        //     method: "POST",
        //     data: {
        //         "Parameters": {
        //             "ITEMS": JSON.stringify(data.ITEMS),
        //             "DEPCODE": data.DEPCODE,
        //             "TABLENO": data.TABLENO,
        //             "PAYTYPE": type,
        //             "GUESTID": data.GUESTID,
        //             "GUESTNO": data.GUESTNO,
        //             "NOTES": data.NOTES,
        //             "GARSONID": data.GARSONID
        //         },
        //         "Action": "Execute",
        //         "Object": "SP_PARK_MOBILE_SENDCHECK"
        //     }
        // });
        console.log(data);
        var result = await this.requestJson<any>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Parameters": {
                    "PORTALID": config.tenant,
                    "DATA": JSON.stringify({
                        "PORTALID": config.tenant,
                        "MASTER": {
                            "PORTALID": config.tenant,
                            "DEPID": data.DEPID,
                            "TABLENO": data.TABLENO,
                            "WAITERID": data.GARSONID,
                            "NOTES": data.NOTES,
                            "PARKGUESTID": data.GUESTID,
                            "TABLETYPE": 0,
                            "CHECKTYPE": data.SALETYPEID,
                            "FORTEST": false
                        },
                        "DETAILS": data.ITEMS.map(item => {
                            return {
                                "PORTALID": config.tenant,
                                "PRODUCTID": item.ID,
                                "NOTES": item.DESC,
                                "QUANTITY": item.QUANTITY
                            };
                        })
                    }),
                    "CLOSECHECK": 0,
                    "PRINTCHECK": 1
                },
                "Action": "Execute",
                "Object": "SP_EASYPOS3_SAVECHECK"
            }
        });
        console.log({
            "PORTALID": config.tenant,
            "DATA": {
                "PORTALID": config.tenant,
                "MASTER": {
                    "PORTALID": config.tenant,
                    "DEPID": data.DEPID,
                    "TABLENO": data.TABLENO,
                    "WAITERID": data.GARSONID,
                    "NOTES": data.NOTES,
                    "PARKGUESTID": data.GUESTID,
                    "TABLETYPE": 0,
                    "CHECKTYPE": data.SALETYPEID,
                    "FORTEST": false
                },
                "DETAILS": data.ITEMS.map(item => {
                    return {
                        "PORTALID": config.tenant,
                        "PRODUCTID": item.ID,
                        "NOTES": item.DESC,
                        "QUANTITY": item.QUANTITY
                    };
                })
            },
            "CLOSECHECK": 0,
            "PRINTCHECK": 1
        })
        return result;
    }
}