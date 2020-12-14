import React, { Component, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PATH } from "../constant";
import Loading from "../components/common/IndefiniteLoader";
import HOME from  "../containers/pages/home";
import CARS from "../containers/pages/cars";
class Global extends Component {
    render() {
        const { history } = this.props;
        return (
            <Router history={history}>
                <div className="App flex cmms" style={{ overflow: "hidden" }}>
                    <div className="flex-grow-1">
                        <Suspense
                            fallback={<Loading />}
                            className={"wp100 mt20"}
                        >
                            <Switch>
                                <Route
                                    exact
                                    path={PATH.ROOT}
                                    component={HOME}
                                />
                                <Route
                                    exact
                                    path={PATH.HOME}
                                    component={HOME}
                                />
                                <Route
                                    exact
                                    path={
                                        PATH.CARS +
                                        `/:car_id`
                                    }
                                    component={CARS}
                                />
                            </Switch>
                        </Suspense>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Global;
