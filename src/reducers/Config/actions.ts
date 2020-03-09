import { IConfig } from "@models";
import { FileService } from "@services";
import { Actions } from './state';
import globalConfig from '@config';

export const actionCreators = {
    setConfig: (config: IConfig) => async (dispatch, getState) => {
        await dispatch({ type: Actions.SetConfig, payload: config });
        globalConfig.setConfig(config);
        await FileService.saveStateToFile(getState());
    }
}