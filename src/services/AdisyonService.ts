import config from '@config';
import { IAdisyon } from '@models';
import { ServiceBase } from "./ServiceBase";

export class AdisyonService extends ServiceBase {
    public static async sendItem(data: IAdisyon, type: string) {

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
                            "CHECKTYPE": data.POSCHECKTYPEID,
                            "FORTEST": false
                        },
                        "DETAILS": data.ITEMS.map(item => {
                            return {
                                "PORTALID": config.tenant,
                                "PRODUCTID": item.ID,
                                "NOTES": item.DESC,
                                "QUANTITY": item.QUANTITY,
                                "DISCOUNTMODE": item.ISFREEITEM == true ? 99 : null,
                                "UNITPRICE": item.ISFREEITEM == true ? 0 : null,
                            };
                        })
                    }),
                    "CLOSECHECK": 1,
                    "PRINTCHECK": 1
                },
                "Action": "Execute",
                "Object": "SP_EASYPOS3_SAVECHECK"
            }
        });

        return result;
    }
}