import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Home from "../../../components/pages/home";
import { fetchAllCarsYearOfMake } from "../../../modules/years";
import { fetchAllCarsCompanies } from "../../../modules/companies";
import { fetchAllCarsModels } from "../../../modules/models";

const mapStateToProps = state => {
    const { years, companies, cars } = state;

    return { years, companies, cars };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCarsYearOfMake: (query) => {
            dispatch(fetchAllCarsYearOfMake(query));
        },
        fetchAllCarsCompanies: (query) => {
            dispatch(fetchAllCarsCompanies(query));
        },
        fetchAllCarsModels: (query) => {
            dispatch(fetchAllCarsModels(query));
        }
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Home)
);
