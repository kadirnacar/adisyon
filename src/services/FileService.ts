import {ApplicationState} from '@store';
import * as path from 'path';
import * as RNFS from 'react-native-fs';
import {IConfig} from '@models';

class FileServiceHelper {
  stateFile: string = path.join(RNFS.ExternalDirectoryPath, 'state.json');
  configFile: string = path.join(RNFS.ExternalDirectoryPath, 'config.json');
  logFile: string = path.join(RNFS.DownloadDirectoryPath, 'landoflegens-log.txt');

  public async readConfigFromFile(): Promise<any> {
    try {
      if (!RNFS.exists(this.stateFile)) {
        return {};
      }
      const content = await RNFS.readFile(this.configFile);
      const result: IConfig = JSON.parse(content);
      return result;
    } catch (ex) {
      console.warn(ex);
      return {};
    }
  }

  public async saveConfigToFile(config: IConfig): Promise<void> {
    try {
      await RNFS.writeFile(this.configFile, JSON.stringify(config));
    } catch {}
  }
  public async addLogFile(text: string): Promise<void> {
    try {
      await RNFS.appendFile(this.logFile, text);
    } catch {}
  }
  public async readStateFromFile(): Promise<any> {
    try {
      if (!RNFS.exists(this.stateFile)) {
        return {};
      }
      const content = await RNFS.readFile(this.stateFile);
      const result: ApplicationState = JSON.parse(content);
      return result;
    } catch (ex) {
      console.warn(ex);
      return {};
    }
  }

  public async saveStateToFile(state: ApplicationState): Promise<void> {
    try {
      await RNFS.writeFile(this.stateFile, JSON.stringify(state));
    } catch {}
  }
}

export const FileService = new FileServiceHelper();
