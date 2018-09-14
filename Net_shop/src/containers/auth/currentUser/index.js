import React, { Component } from 'react';

import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';

import Button from '../../../components/button';
import LogOut from '../../../assets/icons/app/logout.png';

import './style.css';
import styles from './styles';
import { logout } from '../../../actions/auth';

class CurrentUser extends Component {
  logout = () => {
    const token = cookie.load('userToken');
    this.props.logout({ token, history: this.props.history });
  }

  render() {
    const { t, currentUser } = this.props;

    return (
      <div className="welcome">
        <label id="welcome" htmlFor="welcome">
          {`${t('auth.welcome')} ${currentUser.firstName}!`}
        </label>
        <Button id="logout" style={styles.logout_style} onClick={() => this.logout()}>
          <img className="img_logout" id="logout" src={LogOut} alt="logout" />
        </Button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  t: PropTypes.func.isRequired,
  currentUser: PropTypes.shape().isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = ({ auth: { currentUser } }) => ({
  currentUser,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    logout,
  },
  dispatch,
);

export default withRouter(translate('common')(connect(mapStateToProps, mapDispatchToProps)(CurrentUser)));
