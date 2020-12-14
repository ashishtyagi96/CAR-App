import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Cars from "../../../components/pages/cars";
import { fetchCarDetails } from "../../../modules/cars";

const mapStateToProps = state => {
    const { car_details } = state;

    return { car_details };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCarDetails: (car_id) => {
            dispatch(fetchCarDetails(car_id));
        }
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Cars)
);
