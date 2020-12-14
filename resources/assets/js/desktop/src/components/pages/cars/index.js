import React, { Component } from "react";
import { Spin, Card,Progress } from "antd";
import { CloseOutlined } from '@ant-design/icons';
import { numberFormat } from "../../../helpers/numberFormatter";
import car from "../../../assets/images/car.png";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../checkout";
import { PATH } from "../../../constant";
const stripePromise = loadStripe("pk_test_51HxrOtJw9Rw8Ooy9Klh9WH3iMznp1E0PrMsEBM1zns26Qm0qoTT7fun8KWiFnnk9AQ7kEHpuzIr3bmuU73wKIVyK0059G9cgkS");

class Cars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stripe:window.Stripe('pk_test_51HxrOtJw9Rw8Ooy9Klh9WH3iMznp1E0PrMsEBM1zns26Qm0qoTT7fun8KWiFnnk9AQ7kEHpuzIr3bmuU73wKIVyK0059G9cgkS'),
            loading: true,
            card_number_1: null,
            card_number_2: null,
            card_number_3: null,
            card_number_4: null,
            expiry_date: null,
            cvv:null
        };
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const { fetchCarDetails,match } = this.props;
        const { params:{car_id=''} } = match;
        try {
            const res = await fetchCarDetails(car_id);
        } catch (err) {
            console.log(err);
        }
        this.setState({ loading: false });
    }

    renderLoading() {
        return <Spin></Spin>;
    }

    returnToHome = () => {
        window.location.href=PATH.HOME;
    }

    render() {

        const {
            car_details
        } = this.props;
        const { loading } = this.state;
        if (loading) {
            return this.renderLoading();
        }
        const { model = '' , company = '' , is_available = false , amount = 0 , year_of_make = 1990 } = car_details;
        const  tax = (amount*(18))/100;
        return (
            <div  style={{backgroundColor:'#CBDCDF',height:'100vh', padding:'70px 0 0 0'}}>
                <div style={{width:'85vw',margin:'auto',paddingLeft:'20px'}}>
                    <p style={{color:'#8CB1B7',fontSize:'13px'}}>YOU ARE PURCHASING</p>
                    <h3 style={{color:'#73686C'}}>{company+` `+model+` , manufactured in `+ year_of_make}</h3>
                </div>
                <div style={{height:'60vh',backgroundColor:'#E8EFF1',width:'85vw',margin:'auto'}}>
                    <Card
                        style={{ width: '30vw',position:'fixed',backgroundColor:'transparent',margin:'10vh'}}
                        cover={<img alt="example" src={car} />}
                        bordered={false}
                    >
                    </Card>
                    <div style={{float:'right',borderRadius:'100%',height:'20px',width:'20px',cursor:'pointer'}} title={'BACK'} onClick={this.returnToHome}>
                        <CloseOutlined style={{fontSize:'30px',position:'absolute',marginTop:'-16px',padding:'5px',borderRadius:'100%',backgroundColor:'#CBDCDF'}}/>
                    </div>
                    <div style={{height:'85vh',backgroundColor:'#FFFFFF',width:'25vw',top:'-12.5vh',position:'relative',float:'right',marginRight:'15vh',boxShadow:'0 35px 50px -30px rgba(0, 0, 0, 0.2)'}}>
                        <div style={{height:'12.5vh',backgroundColor:'#E8EFF1'}}>
                            <h2 style={{color:'#8CB1B7',textAlign:'center',padding:'40px 0 0 0',letterSpacing:'5px'}}>CARD DETAILS</h2>
                        </div>
                        <div style={{height:'56vh',backgroundColor:'#FFFFFF',padding:'30px 0 0 0', margin:'20px'}}>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm stripe={this.state.stripe} total={amount+tax}/>
                        </Elements>
                        </div>
                        <div style={{height:'12.5vh',backgroundColor:'#8CB1B7',cursor:'pointer'}}>
                            <h2 style={{color:'#FFFFFF',textAlign:'center',padding:'40px 0 0 0',letterSpacing:'5px'}}>PURCHASE</h2>
                            <p style={{color:'#FFFFFF',textAlign:'center'}}>({(numberFormat(amount+tax))})</p>
                        </div>
                    </div>
                </div>
                <div style={{width:'85vw',margin:'auto',paddingLeft:'20px',paddingTop:'10px'}}>
                    <div style={{display:"inline-block",padding:'0 20px'}}>
                        <h6 style={{color:'#8CB1B7'}}>AMOUNT</h6>
                        <h3 style={{color:'#73686C'}}>{numberFormat(amount)}</h3>
                    </div>
                    <div style={{display:"inline-block",backgroundColor:'#FFFFFF',width:'2px',height:'50px',margin:'0 10px'}}></div>
                    <div style={{display:"inline-block",padding:'0 20px'}}>
                        <h6 style={{color:'#8CB1B7'}}>TAX</h6>
                        <h3 style={{color:'#73686C'}}>{numberFormat(tax)}</h3>
                    </div>
                    <div style={{display:"inline-block",backgroundColor:'#FFFFFF',width:'2px',height:'50px',margin:'0 10px'}}></div>
                    <div style={{display:"inline-block",padding:'0 20px'}}>
                        <h6 style={{color:'#8CB1B7'}}>TOTAL</h6>
                        <h3 style={{color:'#73686C'}}>{numberFormat(tax+amount)}</h3>
                    </div>
                    <div style={{display:"inline-block",backgroundColor:'#FFFFFF',width:'2px',height:'50px',margin:'0 10px'}}></div>
                    <div style={{display:"inline-block",padding:'0 20px'}}>
                        {is_available
                        ?
                        <Progress 
                            type="circle" 
                            percent={100} 
                            width={40} 
                            title='Available'
                            style={{float:'left'}}
                        /> 
                        :
                        <Progress 
                            type="circle" 
                            percent={100} 
                            width={40} 
                            title='Not available'
                            status='exception'
                            style={{float:'left'}}

                        /> }
                    </div>
                </div>
            </div>
        );
    }
}

export default Cars;
