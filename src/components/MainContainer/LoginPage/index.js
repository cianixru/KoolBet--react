import React from 'react';
// import { connect } from "react-redux";

import { Form, Icon, Input, Button, Checkbox } from 'antd';

import './style.css';

const FormItem = Form.Item;


class LoginPage extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {

    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (

      <Form onSubmit={this.handleSubmit} prefixCls="login-form" >

        <div className="registration__wrapper">
          <div className="registration-form">
            <h3>
              Sign in to your account
            </h3>
            <ul>
              <li>
                <div className="input-container">
                  <FormItem prefixCls="inputSection">
                    {getFieldDecorator('userName', {
                      rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                      <input type="text" placeholder="Name" />
                    )}
                  </FormItem>
                  <FormItem prefixCls="inputSection">
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                      <input type="password" placeholder="Password" />
                    )}
                  </FormItem>
                </div>
              </li>

              <li>
                <FormItem>
                  <div className="grid-container--nowrap checkbox__blk space-between">
                    <div className="a">
                      <input id="acceptTerms" type="checkbox" />
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

        );
      }
    }
    const WrappedNormalLoginForm = Form.create()(LoginPage);
    
    export default WrappedNormalLoginForm;
    
    
// function mapStateToProps (state) {
//     return {
//         state:{
//         }
//     }
//   }

// export default connect(mapStateToProps)(MainContainer)



//  <Form onSubmit={this.handleSubmit} className="login-form">
//   <FormItem>
//     {getFieldDecorator('userName', {
//       rules: [{ required: true, message: 'Please input your username!' }],
//     })(
//       <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
//     )}
//   </FormItem>
//   <FormItem>
//     {getFieldDecorator('password', {
//       rules: [{ required: true, message: 'Please input your Password!' }],
//     })(
//       <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
//     )}
//   </FormItem>
//   <FormItem>
//     {getFieldDecorator('remember', {
//       valuePropName: 'checked',
//       initialValue: true,
//     })(
//       <Checkbox>Remember me</Checkbox>
//     )}
//     <a className="login-form-forgot" href="">Forgot password</a>
//     <Button type="primary" htmlType="submit" className="login-form-button">
//       Log in
//     </Button>
//     Or <a href="">register now!</a>
//   </FormItem>
// </Form>