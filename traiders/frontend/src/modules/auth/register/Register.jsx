import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

import MapContainer from '../../../components/map/MapContainer';
import './register.scss';
import Page from '../../../components/page/Page';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: 'İstanbul',
      country: 'Turkey'
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { postUserRegister, form } = this.props;
    const { city, country } = this.state;

    form.validateFields(
      ['username', 'password', 'email', 'first_name', 'last_name'],

      (errors, values) => {
        if (!errors) {
          postUserRegister({ ...values, city, country });
        } else {
          // eslint-disable-next-line
          alert(
            Object.values(
              Object.values(Object.values(Object.values(errors)[0])[0])[0]
            )[0]
          );
        }
      }
    );
  };

  setCity = (city) => {
    if (city) {
      this.setState({
        city
      });
    }
  };

  setCountry = (country) => {
    if (country) {
      this.setState({
        country
      });
    }
  };

  validatePasswordRegex = (rule, value, callback) => {
    const reg = /^[A-Za-z0-9]{7,14}$/;
    const test = reg.test(value);

    if (!test) {
      callback(
        "Password should be between 8-15 characters and include a big letter 'A - Z' and a number between 0-9"
      );
    }
  };

  // handleCheckbox = (e) => {};

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const intentionalSpace = <br />;
    return (
      <Page>
        <div className="register-container">
          <div className="tabs">
            <Link to="/login">
              <Button>LOG IN</Button>
            </Link>
            <Link to="/register">
              <Button>REGISTER</Button>
            </Link>
          </div>
          <Form onSubmit={this.handleSubmit} className="register-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                validateTrigger: 'onChange',
                rules: [
                  {
                    required: false,
                    message:
                      "Password should be between 8-15 characters and include a big letter 'A - Z' and a number between 0-9!"
                  }
                  // { validator: this.validatePasswordRegex }
                ]
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                  min={8}
                  max={15}
                />
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="text"
                  placeholder="Email"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('first_name', {
                rules: [{ required: true, message: 'Please input your name!' }]
              })(<Input type="text" placeholder="First Name" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('last_name', {
                rules: [
                  { required: true, message: 'Please input your surname!' }
                ]
              })(<Input type="text" placeholder="Last Name" />)}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('iban', {
                rules: [{ required: true, message: 'Please enter your IBAN!' }]
              })(<Input type="text" placeholder="IBAN" />)}
            </Form.Item>
            <Form.Item>
              <MapContainer
                setCity={this.setCity}
                setCountry={this.setCountry}
              />
            </Form.Item>
            {intentionalSpace}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Register
              </Button>
              Already have an account?<Link to="/login"> login!</Link>
            </Form.Item>
          </Form>
        </div>
      </Page>
    );
  }
}

export default Form.create({ name: 'registerForm' })(Register);
