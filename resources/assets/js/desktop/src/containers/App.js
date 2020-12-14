import App from "../App";
import { connect } from "react-redux";

const mapStateToProps = state => {
    const { auth: { isAuthenticated } = {} } = state;

    return { isAuthenticated };
};

const mapDispatchToProps = dispatch => {

};
export default connect(mapStateToProps, mapDispatchToProps)(App);
