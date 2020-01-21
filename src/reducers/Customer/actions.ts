import { CustomerService } from "@services";
import { batch } from "react-redux";
import { Actions } from './state';

export const actionCreators = {
    getItem: (nfcCode: string) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestCustomerItem });
            var result = await CustomerService.getItem(nfcCode);
            const customer = result && result.length > 0 && result[0].length > 0 ? result[0][0] : null;
            await dispatch({
                type: Actions.ReceiveCustomerItem,
                payload: customer
            });
            isSuccess = customer != null;
        });
        return isSuccess;
    },
    clear: () => async (dispatch, getState) => {
        await dispatch({ type: Actions.ClearItem });
    }
}