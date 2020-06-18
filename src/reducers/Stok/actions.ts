import { FileService, StokService } from "@services";
import { Alert } from "react-native";
import { batch } from "react-redux";
import { ApplicationState } from "src/store";
import { Actions as GroupActions } from '../StokGrup/state';
import { Actions } from './state';

export const actionCreators = {
    getItems: () => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestStokItems });
            var result = await StokService.getItems();

            const groups = result.value && result.value.length > 0 ? result.value[0] : [];
            const stoks = result.value && result.value.length > 0 ? result.value[1] : [];
            const stokDeps = result.value && result.value.length > 0 ? result.value[2] : [];
            const stokBarcodes = result.value && result.value.length > 0 ? result.value[3] : [];
            await dispatch({ type: GroupActions.ReceiveStokGrupItems, payload: groups.map(i => { return { ADI: i.NAME, STOKGRUPID: i.ID, PARENTGROUPID:i.PARENTGROUPID} }) });
            const state: ApplicationState = getState();
            await dispatch({
                type: Actions.ReceiveStokItems, payload: stoks.map(i => {
                    return {
                        "STOKID": i.ID,
                        "BARKOD": stokBarcodes.filter(j => j.PRODUCTID == i.ID)?.map(j=>j.BARCODE),
                        "ADI": i.NAME,
                        "SFIYAT1": i.PRICE,
                        "SDOVIZ": i.CURCODE,
                        "HYERI": i.PREPAREPLACE,
                        "SDEPART": stokDeps.filter(j => j.PRODUCTID == i.ID).map(j => j.DEPID.toString()).join(","),
                        "STOKGRUPID": i.PRODUCTGROUPID,
                        "FOTO": i.PHOTOURL,
                        "PORSIYONLUSATIS": i.HALFPORTION,
                        "INCLUDEDIN_AI": i.INCLUDEDIN_AI
                    }
                }), categories: state.StokGrup.items
            });
            if (result.hasErrors()) {
                Alert.alert(result.errors[0]);
                isSuccess = false;
                return;
            }
            const states = await getState();
            await FileService.saveStateToFile(states);
            isSuccess = true;
        });
        return isSuccess;
    },
}
