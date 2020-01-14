import { CustomerService } from "@services";
import { Actions } from './state';
import { ApplicationState } from "src/store";
import { ICustomer } from "@models";

export const actionCreators = {
    getItem: (nfcCode: string) => async (dispatch, getState) => {
        await dispatch({ type: Actions.RequestCustomerItem });
        /*
        demo customer
        */
        const demoCustomer: ICustomer = {
            ID: 1,
            ADI: "Müşteri",
            SOYADI: "1",
            BAKIYE: 5000
        }
        await dispatch({
            type: Actions.ReceiveCustomerItem,
            payload: demoCustomer
        });

        // var result = await CustomerService.getItem(nfcCode);

        // const user = result && result.ResultSets
        //     && result.ResultSets.length > 0
        //     && result.ResultSets[0].length > 0 ? result.ResultSets[0][0] : null;

        // await dispatch({
        //     type: Actions.ReceiveCustomerItem,
        //     payload: user
        // });

        // return user != null;
    },
    clear: () => async (dispatch, getState) => {
        await dispatch({ type: Actions.ClearItem });
    }
}