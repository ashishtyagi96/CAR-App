import { REQUEST_TYPE } from "../../constant";
import { xFetch } from "../../helpers/xhrHelpers";
import { getAllCarsCompaniesrl } from "../../helpers/url/cars";

export const DISPATCH_ACTION_TYPE = "DISPATCH_ACTION_TYPE";
export const FETCHING_ALL_CARS_COMPANIES = "FETCHING_ALL_CARS_COMPANIES";
export const FETCHING_ALL_CARS_COMPANIES_COMPLETED =
    "FETCHING_ALL_CARS_COMPANIES_COMPLETED";
export const FETCHING_ALL_CARS_COMPANIES_COMPLETED_WITH_ERROR =
    "FETCHING_ALL_CARS_COMPANIES_COMPLETED_WITH_ERROR";

export const fetchAllCarsCompanies = (query) => {
    let response = {};
    const {
        year_of_make=0,
        company=''
    } = query;
    const url = getAllCarsCompaniesrl();
    return async dispatch => {
        try {
            response = await xFetch({
                url: url,
                method: REQUEST_TYPE.GET,
                body: query
            });
            const { status, payload: { data } = {} } = response || {};
            if (status === true) {
                dispatch({
                    type: FETCHING_ALL_CARS_COMPANIES_COMPLETED,
                    payload: data
                });
            } else if (status === false) {
                dispatch({
                    type: FETCHING_ALL_CARS_COMPANIES_COMPLETED_WITH_ERROR
                });
            }
        } catch (error) {
            throw error;
        }
        return response;
    };
};

function setCarsCompanies(state, data) {
    const { companies } = data;
    if (companies) {
        return { ...companies };
    }
    return state;
}

export default (state = {}, action = {}) => {
    const { type, payload = {} } = action;
    switch (type) {
        default:
            return setCarsCompanies(state, payload);
    }
};
