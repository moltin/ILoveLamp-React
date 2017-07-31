import React, { Component } from 'react';
import MailingList from '../global/MailingList';
import CheckoutSummary from './CheckoutSummary';
import { Field, reduxForm } from 'redux-form';
import api from '../../utils/moltin';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {push: state.push}
};

var CheckoutTemplate = {
  customer: {
  name: 'John Doe',
  email: 'john@doe.co'
  },
  shipping_address: {
    first_name: 'John',
    last_name: 'Doe',
    line_1: '2nd Floor British India House',
    line_2: '15 Carliol Square',
    city: 'Newcastle Upon Tyne',
    postcode: 'NE1 6UF',
    county: 'Tyne & Wear',
    country: 'United Kingdom'
  },
  billing_address: {
    first_name: 'John',
    last_name: 'Doe',
    line_1: '2nd Floor British India House',
    line_2: '15 Carliol Square',
    city: 'Newcastle Upon Tyne',
    postcode: 'NE1 6UF',
    county: 'Tyne & Wear',
    country: 'United Kingdom'
  }
}
var PaymentTemplate = {
    "gateway": "stripe",
    "method": "purchase",
    "first_name": "John",
    "last_name": "Doe",
    "number": "4242424242424242",
    "month": "08",
    "year": "2020",
    "verification_value": "123"
}

class CheckoutForm extends Component {


  mySubmit = (values) => {
      CheckoutTemplate.customer.name = values.name;
      CheckoutTemplate.customer.email = values.email;

      CheckoutTemplate.billing_address.first_name = values.billing_firstname;
      CheckoutTemplate.billing_address.last_name = values.billing_lastname;
      CheckoutTemplate.billing_address.line_1 = values.billing_address_1;
      CheckoutTemplate.billing_address.line_2 = values.billing_address_2;
      CheckoutTemplate.billing_address.city = values.billing_state;
      CheckoutTemplate.billing_address.county = values.billing_postcode;
      CheckoutTemplate.billing_address.country = values.billing_country;

      CheckoutTemplate.shipping_address.first_name = values.shipping_firstname;
      CheckoutTemplate.shipping_address.last_name = values.shipping_lastname;
      CheckoutTemplate.shipping_address.line_1 = values.shipping_address_1;
      CheckoutTemplate.shipping_address.line_2 = values.shipping_address_2;
      CheckoutTemplate.shipping_address.city = values.shipping_state;
      CheckoutTemplate.shipping_address.county = values.shipping_postcode;
      CheckoutTemplate.shipping_address.country = values.shipping_country;

    this.props.dispatch((dispatch) => {
      dispatch({type: "Submit_Payment"})
    })

    api.Checkout(CheckoutTemplate)

    .then((order) => {
      api.OrderPay(order.data.id, PaymentTemplate)
    })

    .then(() => {

      this.props.dispatch((dispatch) => {
        dispatch({type: "Payment_Complete"})
        dispatch(push('/order-confirmation'))
      })
    })

    .catch((e) => {
      console.log(e)
    })

    .catch((e) => {
      console.log(e)
    })
  }

  render() {

    return (
      <main role="main" id="container" className="main-container push">
      <section className="checkout">
          <div className="content">
              <CheckoutSummary />
              <form className="checkout-form"  noValidate onSubmit={this.props.handleSubmit(this.mySubmit)}>
                  <fieldset className="details">
                      <div className="form-header">
                          <h2>Your details</h2>
                      </div>
                      <div className="form-content">
                          <div className="form-fields">
                              <label className="input-wrap name required">
                                <span className="hide-content">Name</span>
                                  <Field component="input" className="name" required="required" placeholder="Name" name="name" type="text" aria-label="Name"/>
                              </label>
                              <label className="input-wrap email required">
                                  <span className="hide-content">Email address</span>
                                  <Field component="input" className="email" required="required" placeholder="Email address" name="email" type="email" aria-label="Email"/>
                              </label>
                          </div>
                          <button type="button" className="continue">Continue</button>
                      </div>
                  </fieldset>
                  <fieldset className="billing collapsed">
                      <div className="form-header inactive">
                          <h2>Billing address</h2>
                      </div>
                      <div className="form-content">
                          <div className="form-fields">
                              <label className="input-wrap firstname required">
                                <span className="hide-content">First name</span>
                                  <Field component="input" required="required" placeholder="First Name" name="billing_firstname" type="text" aria-label="First name"/>
                              </label>
                              <label class="input-wrap lastname required">
                                  <span className="hide-content">Last name</span>
                                  <Field component="input" required="required" placeholder="Last Name" name="billing_lastname" type="text" aria-label="Last name"/>
                              </label>
                              <label className="input-wrap company">
                                  <span className="hide-content">Company</span>
                                  <Field component="input" placeholder="Company" name="billing-company" type="text" aria-label="Company"/>
                              </label>
                              <label className="input-wrap address-1 required">
                                  <span className="hide-content">Address line 1</span>
                                  <Field component="input" required="required" placeholder="Address Line 1" name="billing_address_1" type="text" aria-label="Address line 1"/>
                              </label>
                              <label className="input-wrap address-2">
                                  <span className="hide-content">Address line 2</span>
                                  <Field component="input" placeholder="Address Line 2" name="billing_address_2" type="text" aria-label="Address line 2"/>
                              </label>
                              <label className="input-wrap state required">
                                  <span className="hide-content">State or county</span>
                                  <Field component="input" required="required" placeholder="State / County" name="billing_state" type="text" aria-label="State / County"/>
                              </label>
                              <label className="input-wrap postcode required">
                                <span className="hide-content">Postcode</span>
                                  <Field component="input" required="required" placeholder="Postcode" name="billing_postcode" type="text" aria-label="Postcode"/>
                              </label>
                              <div className="input-wrap country">
                                  <label className="required select-fallback">
                                      <span className="hide-content">Country</span>
                                      <Field component="select" className="select-fallback" id="billing_country" required="required" name="billing_country">
                                          <option value>Country</option>
                                          <option value="GB">United Kingdom</option>
                                          <option value="US">The US of A</option>
                                          <option value="FR">France</option>
                                          <option value="DE">Germany</option>
                                          <option value="CA">Canada o Canada!</option>
                                      </Field>
                                  </label>
                              </div>
                          </div>
                          <button type="button" className="continue">Continue</button>
                      </div>
                  </fieldset>
                  <fieldset className="shipping collapsed">
                      <div className="form-header inactive">
                          <h2>Shipping address</h2>
                      </div>
                      <div className="form-content">
                          <div className="form-fields">
                              <label className="replace-checkbox same-as-billing">
                                  <input component="input" type="checkbox" name="use-billing"/>
                                  <span className="checkbox-label"><span className="hide-content"> Is your shipping address the </span>Same as<span className="hide-content">your </span> billing address?</span>
                              </label>
                              <label className="input-wrap firstname required">
                                  <span className="hide-content">First name</span>
                                  <Field component="input" required="required" placeholder="First Name" name="shipping_firstname" type="text" aria-label="First name"/>
                              </label>
                              <label className="input-wrap lastname required">
                                  <span className="hide-content">Last name</span>
                                  <Field component="input" required="required" placeholder="Last Name" name="shipping_lastname" type="text" aria-label="Last name"/>
                              </label>
                              <label className="input-wrap company">
                                  <span className="hide-content">Company</span>
                                  <Field component="input" placeholder="Company" name="shipping_company" type="text" aria-label="Company"/>
                              </label>
                              <label className="input-wrap address-1 required">
                                  <span className="hide-content">Address line 1</span>
                                  <Field component="input" required="required" placeholder="Address Line 1" name="shipping_address_1" type="text" aria-label="Address line 1"/>
                              </label>
                              <label className="input-wrap address-2">
                                  <span className="hide-content">Address line 2</span>
                                  <Field component="input" placeholder="Address Line 2" name="shipping_address_2" type="text" aria-label="Address line 2"/>
                              </label>
                              <label className="input-wrap state required">
                                  <span className="hide-content">State or county</span>
                                  <Field component="input" required="required" placeholder="State / County" name="shipping_state" type="text" aria-label="State / County"/>
                              </label>
                              <label className="input-wrap postcode required">
                                  <span className="hide-content">Postcode</span>
                                  <Field component="input" required="required" placeholder="Postcode" name="shipping_postcode" type="text" aria-label="Postcode"/>
                              </label>
                              <div className="input-wrap country">
                                  <label className="select-fallback required">
                                      <span className="hide-content">Country</span>
                                      <Field component="select" id="shipping_country" required="required" name="shipping_country">
                                          <option value></option>
                                          <option value="GB">United Kingdom</option>
                                          <option value="US">The US of A</option>
                                          <option value="FR">France</option>
                                          <option value="DE">Germany</option>
                                          <option value="CA">Canada o Canada!</option>
                                      </Field>
                                  </label>
                              </div>
                          </div>
                          <button type="button" className="continue">Continue</button>
                      </div>
                  </fieldset>
                  <fieldset className="payment collapsed">
                      <div className="form-header inactive">
                          <h2>Payment details</h2>
                      </div>
                      <div className="form-content">
                          <div className="form-fields">
                              <label className="input-wrap name">
                                  <span class="hide-content">Name on card</span>
                                  <Field component="input" required="required" placeholder="Name on card" name="card_name" type="text" aria-label="Name on card"/>
                              </label>
                              <label className="input-wrap card">
                                  <span class="hide-content">Card number</span>
                                  <Field component="input" required="required" placeholder="Card number" name="card_number" maxLength="23" type="number" aria-label="Card number"/>
                              </label>
                              <div className="input-wrap expiry-month">
                                <label className="select-fallback required">
                                  <span className="hide-content">Card expiry month</span>
                                  <select id="expiry-month" required="required" name="expiry-month">
                                    <option value="01">January</option>
                                    <option value="02">February</option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                  </select>
                                </label>
                              </div>
                              <div className="input-wrap expiry-year">
                                <label className="select-fallback required">
                                  <span className="hide-content">Card expiry year</span>
                                  <select id="expiry-year" required="required" name="expiry-year">
                                    <option value="2017">2017</option>
                                    <option value="2018">2018</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                  </select>
                                </label>
                              </div>
                              <label className="input-wrap cvc required">
                                  <span className="hide-content">CVC code</span>
                                  <Field component="input" required="required" placeholder="CVC" maxLength="4" name="card_cvc" type="number" aria-label="CVC"/>
                              </label>
                          </div>
                          <button type="submit" className="pay" aria-live="polite">
                            <div className="loading-icon">
                                <span className="hide-content">Processing</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.7 46.9" ariaHidden="true">
                                    <path fill="currentColor" d="M47.8,15.9c0,2.8-1,5.6-3.2,7.6L26.4,41.7L8.1,23.5c-4.3-4.3-4.3-11.1,0-15.4c2.1-2.1,4.9-3.2,7.7-3.2c2.8,0,5.6,1,7.6,3.2
                            l2.9,2.9l2.9-2.9c4.3-4.3,11.1-4.3,15.4,0C46.7,10.3,47.8,13.1,47.8,15.9z"/>
                                </svg>
                            </div>
                            <span className="copy">Pay</span>
                        </button>
                      </div>
                  </fieldset>
              </form>
          </div>
      </section>
      <MailingList />
  </main>
    )
  };
};

CheckoutForm = reduxForm({
  form: 'CheckoutForm'
})(CheckoutForm);

export default connect(mapStateToProps)(CheckoutForm);
