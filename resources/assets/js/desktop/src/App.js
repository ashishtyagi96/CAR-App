import React, { Component, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./stylesheets/App.less";
import Loading from "./components/common/IndefiniteLoader";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserHistory } from "history";
import GlobalRoute from"./routes/global";


const history = createBrowserHistory();
class App extends Component {
    componentDidMount() {
        
    }

    render() {
        return (
            <Router history={history}>
                <Suspense fallback={<Loading className={"wp100 mt20"} />}>
                    <GlobalRoute history={history} />
                </Suspense>
            </Router>
        );
    }
}

export default App;
