import React, { Component, Fragment } from "react";
import { Spin } from "antd";
import CarFilters from  "../../car-filters";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const { fetchAllCarsYearOfMake } = this.props;
        try {
            const res = await fetchAllCarsYearOfMake();
        } catch (err) {
            console.log(err);
        }
        this.setState({ loading: false });
    }

    renderLoading() {
        return <Spin></Spin>;
    }
    

    render() {

        const {
            years,
            companies,
            cars,
            fetchAllCarsYearOfMake,
            fetchAllCarsCompanies,
            fetchAllCarsModels,
            history
        } = this.props;
        const { loading } = this.state;
        if (loading) {
            return this.renderLoading();
        }
        
        return (
            <Fragment>
                <div className={"pt10 pl75"} style={{backgroundColor:'#CBDCDF'}}>
                    <h2 style={{textAlign:"center",color:'#8CB1B7'}}>Car Bazaar</h2>
                    <CarFilters 
                        years={years} 
                        companies={companies} 
                        cars={cars}
                        fetchAllCarsYearOfMake={fetchAllCarsYearOfMake} 
                        fetchAllCarsCompanies={fetchAllCarsCompanies} 
                        fetchAllCarsModels={fetchAllCarsModels}
                        history={history}
                    />
                </div>
            </Fragment>
        );
    }
}

export default Home;
