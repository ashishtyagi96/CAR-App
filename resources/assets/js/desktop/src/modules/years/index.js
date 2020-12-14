import { REQUEST_TYPE } from "../../constant";
import { xFetch } from "../../helpers/xhrHelpers";
import { getAllCarsYearOfMakeUrl } from "../../helpers/url/cars";

export const DISPATCH_ACTION_TYPE = "DISPATCH_ACTION_TYPE";
export const FETCHING_ALL_CARS_YEAR_OF_MAKE = "FETCHING_ALL_CARS_YEAR_OF_MAKE";
export const FETCHING_ALL_CARS_YEAR_OF_MAKE_COMPLETED =
    "FETCHING_ALL_CARS_YEAR_OF_MAKE_COMPLETED";
export const FETCHING_ALL_CARS_YEAR_OF_MAKE_COMPLETED_WITH_ERROR =
    "FETCHING_ALL_CARS_YEAR_OF_MAKE_COMPLETED_WITH_ERROR";

export const fetchAllCarsYearOfMake = (year='') => {
    let response = {};
    const url = getAllCarsYearOfMakeUrl();
    return async dispatch => {
        try {
            response = await xFetch({
                url: url,
                method: REQUEST_TYPE.GET,
                body: { year: year }
            });
            const { status, payload: { data } = {} } = response || {};
            if (status === true) {
                dispatch({
                    type: FETCHING_ALL_CARS_YEAR_OF_MAKE_COMPLETED,
                    payload: data
                });
            } else if (status === false) {
                dispatch({
                    type: FETCHING_ALL_CARS_YEAR_OF_MAKE_COMPLETED_WITH_ERROR
                });
            }
        } catch (error) {
            throw error;
        }
        return response;
    };
};

function setCarsYearOfMake(state, data) {
    const { years } = data;
    if (years) {
        return { ...years };
    }
    return state;
}

export default (state = {}, action = {}) => {
    const { type, payload = {} } = action;
    switch (type) {
        default:
            return setCarsYearOfMake(state, payload);
    }
};
