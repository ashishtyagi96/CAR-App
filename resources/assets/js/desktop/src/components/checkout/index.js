import React from "react";
import { ElementsConsumer, CardCvcElement, CardNumberElement, CardExpiryElement } from "@stripe/react-stripe-js";
import {  Row, Col, message, Button } from "antd";
import { getPaymentUrl } from "../../helpers/url/payments";
import { xFetch } from "../../helpers/xhrHelpers";
import CardSection from "../card-section";
import { PATH, REQUEST_TYPE } from "../../constant";

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonLoading: false,
            button_text: 'Buy Now',
            email_id: ''
        };
    }
    doPayment = async({email_id,token}) => {

        const url = getPaymentUrl();
        let pathname = window.location.pathname;
        let car_id = pathname.split('/')[2];
        const response = await xFetch({
            url: url,
            method: REQUEST_TYPE.POST,
            body: {
                car_id:car_id,
                email_id: email_id,
                token: token.id
            }
        });
        const { status, payload: { data } = {} } = response || {};
        if (status === true) {
            message.success('Payment Done');
            window.location.href=PATH.HOME;
        } else if (status === false) {
            message.error('Payment Unsuccessful.');
            this.setState({buttonLoading:false,button_text:'Buy Now'});
        }

    }
  handleSubmit = async event => {
    event.preventDefault();
    const { stripe, elements } = this.props;
    if (!stripe || !elements) {
      return;
    }

    const expiry = elements.getElement(CardExpiryElement);
    const cvc = elements.getElement(CardCvcElement);
    const card = elements.getElement(CardNumberElement);
    this.setState({buttonLoading:true,button_text:'Paying'});
    const result = await stripe.createToken(card);
    if (result.error) {
      message.error(result.error.message);
      this.setState({buttonLoading:false,button_text:'Buy Now'});
    } else {
      let token = result.token;
      const { email_id = ''} =this.state;
      this.doPayment({email_id,token});
    }
  };
  handleChange = (value) => {
    this.setState({email_id:value});
  }

  render() {
      const { buttonLoading = true, email_id= '' } = this.state;
    return (
      <div>
        <form>
          <CardSection email_id={email_id} handleChange={this.handleChange}/>
          <Row style={{paddingTop:'10px',textAlign:'center'}}>
            <Col span={24}>
            <Button disabled={!this.props.stripe} type={"primary"} onClick={this.handleSubmit} loading={buttonLoading} className={'buy-button'}>
                Buy Now
            </Button>                                
            </Col>                              
            </Row>
        </form>
      </div>
    );
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements}/>
      )}
    </ElementsConsumer>
  );
}