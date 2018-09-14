import React, { Component } from 'react';

import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import {
  NavDropdown, MenuItem, Nav, NavItem,
} from 'react-bootstrap';

import './styles.css';
import LogOut from '../../../assets/icons/app/logout.png';
import { logout } from '../../../actions/auth';

class CurrentUser extends Component {
  logout = () => {
    const token = cookie.load('userToken');
    this.props.logout({ token, history: this.props.history });
  }

  render() {
    const { t, currentUser } = this.props;

    return (
      <Nav>
        <NavItem eventKey={1} href="/add_announcement">{t('announcement.add_announcement')}</NavItem>
        <NavDropdown eventKey={3} title={currentUser.firstName !== undefined && `${t('auth.welcome')} ${currentUser.firstName} !`} id="basic-nav-dropdown">
          <MenuItem href="/profile_settings" eventKey={3.1}>{t('auth.profile_settings')}</MenuItem>
          <MenuItem divider />
          <MenuItem className="logout" eventKey={3.2} onClick={() => this.logout()}>
            {t('auth.logout')}
            <img className="img_logout" id="logout" src={LogOut} alt="logout" />
          </MenuItem>
        </NavDropdown>
      </Nav>
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
