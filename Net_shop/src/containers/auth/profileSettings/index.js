import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, FormControl, Col, Button,
} from 'react-bootstrap';
import DatePicker from 'react-16-bootstrap-date-picker';
import { isEmpty } from 'lodash';
import cookie from 'react-cookies';
import { bindActionCreators } from 'redux';

import './styles.css';
import { translate } from 'react-i18next';
import { updateUser, deleteUser } from '../../../actions/userSettings';

class ProfileSettings extends Component {
  state = {
    id: '',
    firstName: '',
    lastName: '',
    birthDay: '',
    email: '',
    dataFetch: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.dataFetch && !isEmpty(nextProps.currentUser)) {
      return {
        id: nextProps.currentUser._id,
        firstName: nextProps.currentUser.firstName,
        lastName: nextProps.currentUser.lastName,
        birthDay: nextProps.currentUser.birthDay,
        email: nextProps.currentUser.email,
        dataFetch: true,
      };
    }
    return null;
  }

  updateUser = () => {
    const {
      id, firstName, lastName, birthDay, email,
    } = this.state;
    const { history } = this.props;
    const token = cookie.load('userToken');
    if (token) {
      this.props.updateUser({
        id, firstName, lastName, birthDay, email, history, token,
      });
    }
  }

  deleteUser = () => {
    const token = cookie.load('userToken');
    if (token) {
      this.props.deleteUser({ id: this.state.id, history: this.props.history });
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
      firstName, lastName, birthDay, email,
    } = this.state;
    const { t } = this.props;

    return (
      <Form horizontal className="container">
        <Col xs={6} md={4}>
          <FormGroup controlId="formHorizontalEmail" className="input_component">
            <Col sm={2}>{t('auth.firstName')}</Col>
            <Col sm={10}>
              <FormControl type="text" name={firstName} value={firstName} placeholder={t('auth.firstName')} onChange={e => this.handleChange('firstName', e.target.value)} />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword" className="input_component">
            <Col sm={2}>{t('auth.lastName')}</Col>
            <Col sm={10}>
              <FormControl type="text" name={lastName} value={lastName} placeholder={t('auth.lastName')} onChange={e => this.handleChange('lastName', e.target.value)} />
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

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" bsSize="large" block onClick={() => this.updateUser()}>{t('user_profile.update')}</Button>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="danger" bsSize="large" block onClick={() => this.deleteUser()}>{t('user_profile.delete')}</Button>
            </Col>
          </FormGroup>
        </Col>
      </Form>
    );
  }
}

ProfileSettings.propTypes = {
  t: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth: { currentUser } }) => ({
  currentUser,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateUser,
    deleteUser,
  },
  dispatch,
);

export default withRouter(translate('common')(connect(mapStateToProps, mapDispatchToProps)(ProfileSettings)));
