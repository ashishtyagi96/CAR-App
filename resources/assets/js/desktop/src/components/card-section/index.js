import React from "react";
import { CardElement,CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { Spin, Row, Col, Card,Progress, Input } from "antd";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#303238",
      fontSize: "16px",
      fontFamily: "sans-serif",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#CFD7DF"
      }
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238"
      }
    }
  }
};

class CardSection extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
        email_id: ''
    };
}
  handleChange = (event) => {
    let value=event.target.value;
    this.setState({email_id:value});
    this.props.handleChange(value);
  }
 render() {
  const { email_id = '' } = this.props;
  return (
    <>
        <Row>
            <Col span={24}>
            <h6 style={{color:'#8CB1B7'}}>Email ID</h6>
            </Col>                              
        </Row>
        <Row>
            <Col span={24}>
            <Input type={'email'} autoComplete={"off"} value={this.state.email_id} onChange={this.handleChange} required></Input>
            </Col>
        </Row>
        <Row style={{paddingTop:'30px'}}>
          <h6 style={{color:'#8CB1B7'}}>CARD NUMBER</h6>
        </Row>
            <Row>
                <Col span={24}>
                  <CardNumberElement options={CARD_ELEMENT_OPTIONS}/>
                </Col>                              
            </Row>
            <Row style={{paddingTop:'30px'}}>
                <h6 style={{color:'#8CB1B7'}}>EXPIRATION DATE</h6>
            </Row>
            <Row>
                <Col span={24}>
                  <CardExpiryElement/>
                </Col>                              
            </Row>
            <Row style={{paddingTop:'30px'}}>
                <h6 style={{color:'#8CB1B7'}}>CVV</h6>
            </Row>
            <Row>
                <Col span={24}>
                <CardCvcElement/>
                </Col>                              
            </Row>
            
    </>
  );
 }
}

export default CardSection;