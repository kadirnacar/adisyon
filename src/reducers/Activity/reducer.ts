import { Action } from 'redux';
import { Actions, ActivityState, IReceiveActivityItemsAction, IRequestActivityItemsAction } from './state';
import { IActivity } from '@models';
import moment from 'moment';

const unloadedState: ActivityState = {
    items: []
};

export type KnownAction = IReceiveActivityItemsAction | IRequestActivityItemsAction;

export const reducer = (currentState: ActivityState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case Actions.ReceiveActivityItems:
            currentState.isRequest = false;
            if (action.payload) {
                const activityObject = {};
                action.payload.forEach(act => {
                    let oAct = activityObject[act.ID];
                    if (!oAct) {
                        activityObject[act.ID] = {
                            ID: act.ID,
                            NAME: act.NAME,
                            ADULTPRICE: act.ADULTPRICE,
                            Seances: []
                        }
                    }
                    oAct = activityObject[act.ID];
                    if (oAct) {
                        if (!oAct.Seances)
                            oAct.Seances = [];

                        oAct.Seances.push({
                            SEANCEID: act.SEANCEID,
                            SEANCESTART: moment(act.SEANCESTART, 'YYYY-MM-DD HH:mm:ss.SSS'),
                            SEANCEAVAILABLESEATS: act.SEANCEAVAILABLESEATS
                        })
                    }
                });
                const activities = Object.keys(activityObject).map(a => {
                    return activityObject[a];
                })
                currentState.items = activities;
            }
            return { ...currentState };
        case Actions.RequestActivityItems:
            currentState.isRequest = true;
            return { ...currentState };
        default:
            break;
    }

    return currentState || unloadedState;
};
