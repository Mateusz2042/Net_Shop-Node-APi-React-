import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import {
  Form, FormGroup, FormControl, Col, Checkbox, Button,
} from 'react-bootstrap';

import './styles.css';
import { translate } from 'react-i18next';
import { tryLogin } from '../../../actions/auth';

class LoginComponent extends Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  }

  tryLogin = (email, password, history) => {
    this.props.tryLogin({ email, password, history });
  }

  render() {
    const { email, password } = this.state;
    const { history, t } = this.props;

    return (
      <Form horizontal className="container">
        <Col xs={6} md={4}>
          <FormGroup controlId="formHorizontalEmail" className="input_component">
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

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" bsSize="large" block onClick={() => this.tryLogin(email, password, history)}>{t('navbar.login')}</Button>
            </Col>
          </FormGroup>
        </Col>
      </Form>
    );
  }
}

LoginComponent.propTypes = {
  t: PropTypes.func.isRequired,
  tryLogin: PropTypes.func,
  history: PropTypes.shape().isRequired,
};

LoginComponent.defaultProps = {
  tryLogin: () => { },
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    tryLogin,
  },
  dispatch,
);

export default withRouter(translate('common')(connect(null, mapDispatchToProps)(LoginComponent)));
