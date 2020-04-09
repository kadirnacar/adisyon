// export interface IGarson {
//     ID: number;
//     GKODU: string;
//     GADI: string;
//     DEPKODU: string;
//     GGRUPID: number;
//     GGRUPID_GRUPADI: string;
//     departments?: string[];
// }

export interface STAFFCONFIG {
    ID: number;
    DEPID?: any;
    STAFFGROUPID: number;
    HOTELID: number;
    PORTALID: number;
    QUICKPAY_CREDITCARD: boolean;
    QUICKPAY_PRINT: boolean;
    QUICKPAY_SAVE: boolean;
    QUICKPAY_CASH: boolean;
    PAY_ROOM: boolean;
    DIRECTORDER: boolean;
    DETAILPAY: boolean;
    SHOW_DISCOUNT: boolean;
    CUSTOMPRICE: boolean;
    SHOW_SERVICE: boolean;
    AUTOTABLEREFRESH: boolean;
    AUTOCHECKREAD: boolean;
    CLOSEDCHECKOPS: boolean;
    WAITERDISPLAY: boolean;
    KITCHENDISPLAY: boolean;
    CLOSEDCHECK_PAYMENTCHANGE: boolean;
    LOCKTABLE_ONPRINTCHECK: boolean;
    WAITERREPORT: boolean;
    AUTOPRINTCHECKONCLOSE: boolean;
    DETAILTABLEDISPLAY: boolean;
    INVOICE: boolean;
    PRINTCLOSEDCHECK: boolean;
    FINDHOTELGUEST: boolean;
    TABLETRANSFER: boolean;
    ITEMTRANSFER: boolean;
    LINEOPS: boolean;
    DAILYCASHIERREPORT: boolean;
    DETAILEDCASHIERREPORT: boolean;
    REPRINTCHECK_ONPAYMENTCHANGE_FORCLOSEDCHECK: boolean;
    PAY_PERSONNEL: boolean;
    REPORTS: boolean;
    XREPORT_ALLDEPS: boolean;
    SUMMARYREPORT: boolean;
    HEXTODECIMAL: boolean;
    BROWSERPRINTCHECK: boolean;
    POSENDOFDAY: boolean;
    AUTOSERVICEAMOUNT: number;
    AUTOSERVICEPERCENT: number;
    CHECKHISTORY: boolean;
    ENFORCEPAX: boolean;
    CANCELREASON_FROMLIST: boolean;
    CASHIERCLOSE: boolean;
    XREPORT: boolean;
    PAY_WRISTBAND: boolean;
    CHECKCUSTOMER: boolean;
}

export interface STAFFDEP {
    DEPID: number;
}

export interface IGarson {
    STAFFID: number;
    STAFFNAME: string;
    STAFFCONFIG: STAFFCONFIG;
    STAFFDEPS: STAFFDEP[];
}