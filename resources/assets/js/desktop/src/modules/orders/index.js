import { xFetch } from "../../helpers/xhrHelpers";
import { REQUEST_TYPE } from "../../constant";
import { getOrderTransactionHistoryUrl } from "../../helpers/url/order";

const FETCH_ORDER_HISTORY_COMPLETED = "FETCH_ORDER_HISTORY_COMPLETED";
const FETCH_ORDER_HISTORY_ERROR = "FETCH_ORDER_HISTORY_ERROR";

export const fetchOrderTransactionHistory = order_id => {
    return async dispatch => {
        let response = {};
        try {
            const url = getOrderTransactionHistoryUrl(order_id);
            response = await xFetch({
                url: url,
                method: REQUEST_TYPE.GET
            });
            const { status } = response;
            if (status) {
                const { payload: { data = {} } = {} } = response;
                dispatch({
                    type: FETCH_ORDER_HISTORY_COMPLETED,
                    payload: data
                });
            }
        } catch (e) {
            dispatch({
                type: FETCH_ORDER_HISTORY_ERROR
            });
        }

        return response;
    };
};

function setOrders(state, data) {
    const { orders } = data;
    if (orders) {
        return { ...state, ...orders };
    }
    return state;
}

export default (state = {}, action = {}) => {
    const { type, payload = {} } = action;
    switch (type) {
        default:
            return setOrders(state, payload);
    }
};
