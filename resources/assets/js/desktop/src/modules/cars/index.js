import { REQUEST_TYPE } from "../../constant";
import { xFetch } from "../../helpers/xhrHelpers";
import { getCarDetailsUrl } from "../../helpers/url/cars";

export const DISPATCH_ACTION_TYPE = "DISPATCH_ACTION_TYPE";
export const FETCHING_CAR_DETAILS = "FETCHING_CAR_DETAILS";
export const FETCHING_CAR_DETAILS_COMPLETED =
    "FETCHING_CAR_DETAILS_COMPLETED";
export const FETCHING_CAR_DETAILS_COMPLETED_WITH_ERROR =
    "FETCHING_CAR_DETAILS_COMPLETED_WITH_ERROR";

export const fetchCarDetails = (car_id) => {
    let response = {};
    const url = getCarDetailsUrl(car_id);
    return async dispatch => {
        try {
            response = await xFetch({
                url: url,
                method: REQUEST_TYPE.GET
            });
            const { status, payload: { data } = {} } = response || {};
            if (status === true) {
                dispatch({
                    type: FETCHING_CAR_DETAILS_COMPLETED,
                    payload: data
                });
            } else if (status === false) {
                dispatch({
                    type: FETCHING_CAR_DETAILS_COMPLETED_WITH_ERROR
                });
            }
        } catch (error) {
            throw error;
        }
        return response;
    };
};

function setCarDetails(state, data) {
    const { car_details } = data;
    if (car_details) {
        return { ...car_details };
    }
    return state;
}

export default (state = {}, action = {}) => {
    const { type, payload = {} } = action;
    switch (type) {
        default:
            return setCarDetails(state, payload);
    }
};
