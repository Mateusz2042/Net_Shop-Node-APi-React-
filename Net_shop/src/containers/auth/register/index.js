import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, FormControl, Col, Checkbox, Button,
} from 'react-bootstrap';
import DatePicker from 'react-16-bootstrap-date-picker';

import './styles.css';
import { translate } from 'react-i18next';
import { registerUser } from '../../../actions/register';

class RegisterComponent extends Component {
  state = {
    firstName: '',
    lastName: '',
    birthDay: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  register = () => {
    const {
      firstName, lastName, birthDay, email, password, confirmPassword,
    } = this.state;
    const { history } = this.props;

    if (password === confirmPassword) {
      this.props.registerUser({
        firstName, lastName, birthDay, email, password, history,
      });
    }
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  }

  handleChangeDate = (value) => {
    this.setState({
      birthDay: value,
    });
  }

  render() {
    const {
      firstName, lastName, birthDay, email, password, confirmPassword,
    } = this.state;
    const { t } = this.props;

    return (
      <Form horizontal className="container">
        <Col xs={6} md={4}>
          <FormGroup controlId="formHorizontalEmail" className="input_component">
            <Col sm={2}>{t('auth.firstName')}</Col>
            <Col sm={10}>
              <FormControl type="firstName" name={firstName} value={firstName} placeholder={t('auth.firstName')} onChange={e => this.handleChange('firstName', e.target.value)} />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword" className="input_component">
            <Col sm={2}>{t('auth.lastName')}</Col>
            <Col sm={10}>
              <FormControl type="lastName" name={lastName} value={lastName} placeholder={t('auth.lastName')} onChange={e => this.handleChange('lastName', e.target.value)} />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword" className="input_component">
            <Col sm={2}>{t('auth.birthDay')}</Col>
            <Col sm={10}>
              <DatePicker id="example-datepicker" name="birthDay" value={birthDay} onChange={this.handleChangeDate} />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword" className="input_component">
            <Col sm={2}>{t('auth.email')}</Col>
            <Col sm={10}>
              <FormControl type="email" name={email} value={email} placeholder={t('auth.email')} onChange={e => this.handleChange('email', e.target.value)} />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword" className="input_component">
            <Col sm={2}>{t('auth.password')}</Col>
            <Col sm={10}>
              <FormControl type="password" name={password} value={password} placeholder={t('auth.password')} onChange={e => this.handleChange('password', e.target.value)} />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword" className="input_component">
            <Col sm={2}>{t('auth.confirmPassword')}</Col>
            <Col sm={10}>
              <FormControl type="confirmPassword" name={confirmPassword} value={confirmPassword} placeholder={t('auth.confirmPassword')} onChange={e => this.handleChange('confirmPassword', e.target.value)} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" bsSize="large" block onClick={() => this.register()}>{t('navbar.register')}</Button>
            </Col>
          </FormGroup>
        </Col>
      </Form>
    );
  }
}

RegisterComponent.propTypes = {
  t: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    registerUser,
  },
  dispatch,
);

export default withRouter(translate('common')(connect(null, mapDispatchToProps)(RegisterComponent)));
