import { CustomerService } from "@services";
import { batch } from "react-redux";
import { Actions } from './state';
import { Alert } from "react-native";

export const actionCreators = {
    getItem: (nfcCode: string) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestCustomerItem });
            var result = await CustomerService.getItem(nfcCode);

            const customer = result.value && result.value.length > 0 && result.value[0].length > 0 ? result.value[0][0] : null;
            await dispatch({
                type: Actions.ReceiveCustomerItem,
                payload: customer
            });

            if (result.hasErrors()) {
                Alert.alert(result.errors[0]);
                isSuccess = false;
                return;
            }
            
            isSuccess = customer != null;
        });
        return isSuccess;
    },
    getTrans: (nfcCode: string) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestCustomerTrans });
            var result = await CustomerService.getTransactions(nfcCode);

            const customer = result.value && result.value.length > 0 && result.value[0].length > 0 ? result.value[0] : false;
            await dispatch({
                type: Actions.ReceiveCustomerTrans,
                payload: customer
            });

            if (result.hasErrors()) {
                Alert.alert(result.errors[0]);
                isSuccess = false;
                return;
            }
            
            isSuccess = customer;
        });
        return isSuccess;
    },
    clear: () => async (dispatch, getState) => {
        await dispatch({ type: Actions.ClearItem });
    }
}