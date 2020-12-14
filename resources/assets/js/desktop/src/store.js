import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./modules";
// import LogRocket from "logrocket";

const enhancers = [];

if (process.env.NODE_ENV === "development") {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === "function") {
        enhancers.push(devToolsExtension());
    }
}

let middleWares = [thunk];

const composedEnhancers = compose(
    applyMiddleware(...middleWares),
    ...enhancers
);

export default function configureStore() {
    return createStore(rootReducer, composedEnhancers);
}
