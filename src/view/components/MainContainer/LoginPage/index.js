import React, { Component } from 'react';
import { setCookie } from 'view/Utils/Cookies';
import { connect } from "react-redux";
import { authAPI } from "config/constants";
import { withRouter } from 'react-router-dom';

import { Form, Button } from 'antd';
import './style.css';

const FormItem = Form.Item;

class LoginPage extends Component {

  state = { name: '', password: '', showError: false, rememberMe: false, balance: "0" }

  static getDerivedStateFromProps(props, state) {
    if (props.state.isAuthenticated && props.location.pathname == "/login")
      props.history.goBack()
    return state;
  }
  onChange = (e, type) => {
    this.setState({
      [type]: e.target.value
    });
  }

  onCheck = (e, type) => {
    this.setState({
      [type]: e.target.checked,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values, state) => {
      let fetchParams = {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: 'include',
        body: JSON.stringify({ "username": this.state.name, "password": this.state.password })
      }

      fetch(authAPI, fetchParams)
        .then((response) => {
          if (response.ok) {
            this.setState({ showError: false });
            if (response.headers.get("Authorization") !== null) {
              setCookie('token', response.headers.get("Authorization"), { expires: (this.state.rememberMe ? 180 : 1) })
              this.props.dispatch({ type: 'AUTHORIZATION', payload: true })
            }
          }
          else {
            this.setState({ showError: true });
          }
        })
      // .then((response) => {

      // })
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="page-grid__item main scroll">
        <Form onSubmit={this.handleSubmit} prefixCls="login-form">
          <div className="registration__wrapper">
            <div className="registration-form">
              <h3>Sign in to your account</h3>

              <div className={"alertbox " + (this.state.showError === true ? "" : "hide")}>
                <span className="alertbox__message">Login or password is incorrect</span>
              </div>

              <ul>
                <li>
                  <div className="input-container">
                    <FormItem prefixCls="inputSection">
                      {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                      })(
                        <input type="text" placeholder="Name" onChange={e => this.onChange(e, 'name')} />
                      )}
                    </FormItem>
                    <FormItem prefixCls="inputSection">
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                      })(
                        <input type="password" placeholder="Password" onChange={e => this.onChange(e, 'password')} />
                      )}
                    </FormItem>
                  </div>
                </li>

                <li>
                  <FormItem>
                    <div className="grid-container--nowrap checkbox__blk space-between">
                      <div className="a">
                        <input id="acceptTerms" type="checkbox" checked={this.state.rememberMe} onChange={e => this.onCheck(e, 'rememberMe')} />
                        <label for="acceptTerms">Remember me</label>
                      </div>

                      <div className="a nw f-password">
                        <a href="#">
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                  </FormItem>
                </li>

                <li className="submit-area">
                  <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button open-account-button">
                      LOGIN
                    </Button>
                  </FormItem>
                </li>

                <li className="social-registration">
                  <FormItem className="social-registration">
                    <div className="horizontal-separator-container short-separator">
                      <span className="horizontal-separator">or</span>
                    </div>
                    <div id="SubmitForm" className="open-account-button-facebook"><i className="facebook__icon"></i>Login with Facebook</div>
                  </FormItem>
                </li>
              </ul>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(LoginPage);

function mapStateToProps(state) {
  return {
    state: {
      isAuthenticated: state.isAuthenticated,
    }
  }
}

export default connect(mapStateToProps)(withRouter(WrappedNormalLoginForm))
