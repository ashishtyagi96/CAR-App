import { connect } from "react-redux";
import Sidebar from "../../components/sidebar";
import { withRouter } from "react-router";
const mapStateToProps = state => {
    const { auth } = state;

    return {
        auth
    };
};

export default withRouter(
    connect(mapStateToProps, null)(Sidebar)
);
