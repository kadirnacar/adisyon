import config from '@config';
import {ServiceBase} from './ServiceBase';

export class EcrService extends ServiceBase {
  public static async getEcr() {
    var result = await this.requestJson<any>({
      url: `${config.restUrl}`,
      method: 'POST',
      data: {
        Action: 'Execute',
        Object: 'SP_ECR_GETECRDATA',
      },
    });

    return result;
  }
}
