import {ApplicationState} from '@store';
import * as path from 'path';
import * as RNFS from 'react-native-fs';
import {IConfig} from '@models';

class FileServiceHelper {
  stateFile: string = path.join(
    RNFS.ExternalStorageDirectoryPath,
    'state.json',
  );
  configFile: string = path.join(
    RNFS.ExternalStorageDirectoryPath,
    'config.json',
  );
  logFile: string = path.join(
    RNFS.DownloadDirectoryPath,
    `landoflegens-log-${new Date().toDateString()}.txt`,
  );
  date: Date;
  username: string;
  public async readConfigFromFile(): Promise<any> {
    try {
      if (!(await RNFS.exists(this.configFile))) {
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
      if (await RNFS.exists(this.configFile)) {
        await RNFS.unlink(this.configFile);
      }
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
      if (!(await RNFS.exists(this.stateFile))) {
        return {};
      }
      const content = await RNFS.readFile(this.stateFile);
      const json = JSON.parse(content);
      this.date = new Date(json.date);
      this.username = json.username;
      const result: ApplicationState = json.state;
      return result;
    } catch (ex) {
      console.warn(ex);
      return {};
    }
  }

  public async saveStateToFile(state: ApplicationState): Promise<void> {
    try {
      if (await RNFS.exists(this.stateFile)) {
        await RNFS.unlink(this.stateFile);
      }
      await RNFS.writeFile(
        this.stateFile,
        JSON.stringify({
          date: new Date().toLocaleDateString(),
          username: this.username,
          state,
        }),
      );
    } catch {}
  }
}

export const FileService = new FileServiceHelper();
