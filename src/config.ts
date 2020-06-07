import {IConfig} from '@models';
import {FileService} from './services/FileService';
import {TouchableHighlightBase} from 'react-native';

// const config = {
//     restUrl: 'https://5004.hoteladvisor.net/',
//     tenant: 341,
//     useAlagart: false,
// };

class config {
  public static restUrl: string = 'https://webapi.landoflegend.com/';
  public static tenant: number = 341;
  public static useAlagart: boolean = false;
  public static logRequest: boolean = false;

  public static async setConfig(config: IConfig) {
    if (config) {
      if (config.restUrl) this.restUrl = config.restUrl;
      if (config.tenant) this.tenant = config.tenant;
      if (config.useAlagart) this.useAlagart = config.useAlagart;
      if (config.logRequest) this.logRequest = config.logRequest;
    }
    await FileService.saveConfigToFile({
      restUrl: this.restUrl,
      tenant: this.tenant,
      useAlagart: this.useAlagart,
      logRequest: this.logRequest,
    });
  }
}

export default config;
