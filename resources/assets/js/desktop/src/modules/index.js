import { combineReducers } from "redux";
import years from "./years";
import companies from "./companies";
import cars from "./models";
import car_details from "./cars";

const rootReducer = combineReducers({
    years,
    companies,
    cars,
    car_details
});

export default (state, action) => {
    return rootReducer(state, action);
};
