import * as RNFS from 'react-native-fs';
import { ApplicationState } from '@store';
import * as path from 'path';

class FileServiceHelper {
    stateFile: string = path.join(RNFS.DocumentDirectoryPath, 'state.json');

    public async readStateFromFile(): Promise<any> {
        try {
            if (!RNFS.exists(this.stateFile)) {
                return {};
            }
            const content = await RNFS.readFile(this.stateFile);
            const result: ApplicationState = JSON.parse(content);
            return result;
        } catch (ex) {
            console.log(ex)
            return {};
        }
    }

    public async saveStateToFile(state: ApplicationState): Promise<void> {
        try {
            await RNFS.writeFile(this.stateFile, JSON.stringify(state));
        } catch{ }
    }
}

export const FileService = new FileServiceHelper();