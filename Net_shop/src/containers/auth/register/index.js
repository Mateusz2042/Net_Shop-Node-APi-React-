import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.css';
import { translate } from 'react-i18next';
import Input from '../../../components/input';
import Button from '../../../components/button';
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

  render() {
    const {
      firstName, lastName, birthDay, email, password, confirmPassword,
    } = this.state;

    return (
      <div className="container">
        <div className="box">
          {this.renderRegularInput('firstName', firstName, 'text', 'auth.firstName')}
          {this.renderRegularInput('lastName', lastName, 'text', 'auth.lastName')}
          {this.renderRegularInput('birthDay', birthDay, 'text', 'auth.birthDay')}
          {this.renderRegularInput('email', email, 'text', 'auth.email')}
          {this.renderRegularInput('password', password, 'password', 'auth.password')}
          {this.renderRegularInput('confirmPassword', confirmPassword, 'password', 'auth.confirmPassword')}
          <Button id="login" onClick={() => this.register()} text={this.props.t('navbar.register')} />
        </div>
      </div>
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
