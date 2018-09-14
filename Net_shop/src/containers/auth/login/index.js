import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import './styles.css';
import { translate } from 'react-i18next';
import Input from '../../../components/input';
import Button from '../../../components/button';
import { tryLogin } from '../../../actions/auth';

class LoginComponent extends Component {
  state = {
    email: 'admin@gmail.com',
    password: '123456',
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  }

  renderRegularInput = (name, value, type, placeholder) => (
    <Input
      id={value}
      name={value}
      value={value}
      type={type}
      onChange={e => this.handleChange(name, e.target.value)}
      placeholder={this.props.t(placeholder)}
    />
  )

  tryLogin = (email, password, history) => {
    this.props.tryLogin({ email, password, history });
  }

  render() {
    const { email, password } = this.state;
    const { history } = this.props;

    return (
      <div className="container">
        <div className="box">
          {this.renderRegularInput('email', email, 'text', 'auth.email')}
          {this.renderRegularInput('password', password, 'password', 'auth.password')}
          <Button id="login" onClick={() => this.tryLogin(email, password, history)} text={this.props.t('navbar.login')} />
        </div>
      </div>
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
