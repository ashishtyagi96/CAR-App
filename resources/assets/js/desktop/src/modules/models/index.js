import { REQUEST_TYPE } from "../../constant";
import { xFetch } from "../../helpers/xhrHelpers";
import { getAllCarsModelsrl } from "../../helpers/url/cars";

export const DISPATCH_ACTION_TYPE = "DISPATCH_ACTION_TYPE";
export const FETCHING_ALL_CARS_MODELS = "FETCHING_ALL_CARS_MODELS";
export const FETCHING_ALL_CARS_MODELS_COMPLETED =
    "FETCHING_ALL_CARS_MODELS_COMPLETED";
export const FETCHING_ALL_CARS_MODELS_COMPLETED_WITH_ERROR =
    "FETCHING_ALL_CARS_MODELS_COMPLETED_WITH_ERROR";

export const fetchAllCarsModels = (query) => {
    let response = {};
    const url = getAllCarsModelsrl();
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
                    type: FETCHING_ALL_CARS_MODELS_COMPLETED,
                    payload: data
                });
            } else if (status === false) {
                dispatch({
                    type: FETCHING_ALL_CARS_MODELS_COMPLETED_WITH_ERROR
                });
            }
        } catch (error) {
            throw error;
        }
        return response;
    };
};

function setCarsModels(state, data) {
    const { cars } = data;
    if (cars) {
        return { ...cars };
    }
    return state;
}

export default (state = {}, action = {}) => {
    const { type, payload = {} } = action;
    switch (type) {
        default:
            return setCarsModels(state, payload);
    }
};
