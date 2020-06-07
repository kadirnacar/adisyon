import { CustomerService } from "@services";
import { batch } from "react-redux";
import { Actions } from './state';
import { Alert } from "react-native";
import { ICustomer } from "@models";

export const actionCreators = {
    getItem: (nfcCode: string) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestCustomerItem });
            var result = await CustomerService.getItem(nfcCode);
            const customer = result.value && result.value.length > 0 && result.value[0].length > 0 ? result.value[0][0] : null;
            let customerModel: ICustomer = null;
            if (customer) {
                customerModel = {
                    BALANCE: customer.BALANCE,
                    POSCHECKTYPEID: customer.POSCHECKTYPEID,
                    BOARDTYPE: customer.BOARDTYPE,
                    GUESTNO: customer.GUESTNO,
                    NAME: customer.NAME,
                    ROOMNO: customer.ROOMNO,
                    SURNAME: customer.SURNAME,
                    POSDISCOUNTPERCENT: customer.POSDISCOUNTPERCENT,
                    ALLINCLUSIVE: customer.ALLINCLUSIVE,
                    SALETYPEID: customer.SALETYPEID,
                };
            }
            await dispatch({
                type: Actions.ReceiveCustomerItem,
                payload: customerModel
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
    getFreeItems: (customerId: number) => async (dispatch, getState) => {
        let isSuccess: boolean = false;
        await batch(async () => {
            await dispatch({ type: Actions.RequestCustomerFreeItems });
            var result = await CustomerService.getFreeItems(customerId);

            // result.value = [
            //     [{
            //         "ID": 10,
            //         "PORTALID": 341,
            //         "PARKGUESTID": 3926,
            //         "DEPID": 9281,
            //         "ITEMID": null,
            //         "ITEMGROUPID": null,
            //         "QUANTITY": 3,
            //         "STAFF": 73590,
            //         "CREATION_DATE": "2020-03-16 16:17:57.010",
            //         "LASTUPDATE_DATE": "2020-03-16 16:17:57.010",
            //         "USEDQUANTITY": null
            //     }, {
            //         "ID": 11,
            //         "PORTALID": 341,
            //         "PARKGUESTID": 3926,
            //         "DEPID": 9281,
            //         "ITEMID": null,
            //         "ITEMGROUPID": null,
            //         "QUANTITY": 3,
            //         "STAFF": 73590,
            //         "CREATION_DATE": "2020-03-16 16:17:57.010",
            //         "LASTUPDATE_DATE": "2020-03-16 16:17:57.010",
            //         "USEDQUANTITY": null
            //     }, {
            //         "ID": 12,
            //         "PORTALID": 341,
            //         "PARKGUESTID": 3926,
            //         "DEPID": 9281,
            //         "ITEMID": null,
            //         "ITEMGROUPID": null,
            //         "QUANTITY": 3,
            //         "STAFF": 73590,
            //         "CREATION_DATE": "2020-03-16 16:17:57.010",
            //         "LASTUPDATE_DATE": "2020-03-16 16:17:57.010",
            //         "USEDQUANTITY": null
            //     }, {
            //         "ID": 13,
            //         "PORTALID": 341,
            //         "PARKGUESTID": 3926,
            //         "DEPID": 9281,
            //         "ITEMID": null,
            //         "ITEMGROUPID": null,
            //         "QUANTITY": 3,
            //         "STAFF": 73590,
            //         "CREATION_DATE": "2020-03-16 16:23:33.300",
            //         "LASTUPDATE_DATE": "2020-03-16 16:23:33.300",
            //         "USEDQUANTITY": null
            //     }, {
            //         "ID": 14,
            //         "PORTALID": 341,
            //         "PARKGUESTID": 3926,
            //         "DEPID": 9281,
            //         "ITEMID": null,
            //         "ITEMGROUPID": null,
            //         "QUANTITY": 3,
            //         "STAFF": 73590,
            //         "CREATION_DATE": "2020-03-16 16:23:33.300",
            //         "LASTUPDATE_DATE": "2020-03-16 16:23:33.300",
            //         "USEDQUANTITY": null
            //     }, {
            //         "ID": 15,
            //         "PORTALID": 341,
            //         "PARKGUESTID": 3926,
            //         "DEPID": 9281,
            //         "ITEMID": null,
            //         "ITEMGROUPID": null,
            //         "QUANTITY": 3,
            //         "STAFF": 73590,
            //         "CREATION_DATE": "2020-03-16 16:23:33.300",
            //         "LASTUPDATE_DATE": "2020-03-16 16:23:33.300",
            //         "USEDQUANTITY": null
            //     }, {
            //         "ID": 16,
            //         "PORTALID": 341,
            //         "PARKGUESTID": 3926,
            //         "DEPID": 9112,
            //         "ITEMID": 41994,
            //         "ITEMGROUPID": null,
            //         "QUANTITY": 5,
            //         "STAFF": 73590,
            //         "CREATION_DATE": "2020-03-16 16:23:33.300",
            //         "LASTUPDATE_DATE": "2020-03-16 16:23:33.300",
            //         "USEDQUANTITY": null
            //     }, {
            //         "ID": 17,
            //         "PORTALID": 341,
            //         "PARKGUESTID": 3926,
            //         "DEPID": 9112,
            //         "ITEMID": 40166,
            //         "ITEMGROUPID": null,
            //         "QUANTITY": 5,
            //         "STAFF": 73590,
            //         "CREATION_DATE": "2020-03-16 16:23:33.300",
            //         "LASTUPDATE_DATE": "2020-03-16 16:23:33.300",
            //         "USEDQUANTITY": null
            //     }]
            // ];

            const customer = result.value && result.value.length > 0 && result.value[0].length > 0 ? result.value[0] : false;

            await dispatch({
                type: Actions.ReceiveCustomerFreeItems,
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