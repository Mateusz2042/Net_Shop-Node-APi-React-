import React, { Component, Fragment } from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Nav, Navbar, NavItem,
} from 'react-bootstrap';

import './styles.css';
import Polish from '../../assets/icons/flags/pl.png';
import English from '../../assets/icons/flags/gb.png';
import { getCurrentUser } from '../../actions/auth';
import CurrentUserComponent from '../../containers/auth/currentUser';

class NavbarComponent extends Component {
  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    const token = cookie.load('userToken');
    if (token) {
      this.props.getCurrentUser(token);
    }
  }

  render() {
    const { t, i18n } = this.props;

    return (
      <Navbar className="nav_container">
        <Nav className="flags_container">
          <NavItem className="flag" eventKey={1}><img src={Polish} alt="Polish" onClick={() => i18n.changeLanguage('pl')} /></NavItem>
          <NavItem className="flag" eventKey={2}><img src={English} alt="English" onClick={() => i18n.changeLanguage('en')} /></NavItem>
        </Nav>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">{t('navbar.net_shop_title')}</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav className="links_container">
          {
            cookie.load('userToken')
              ? <CurrentUserComponent />
              : (
                <Fragment>
                  <NavItem eventKey={1} href="/login">{t('navbar.login')}</NavItem>
                  <NavItem eventKey={2} href="/register">{t('navbar.register')}</NavItem>
                </Fragment>
              )
          }
        </Nav>
      </Navbar>
    );
  }
}

NavbarComponent.propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  getCurrentUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getCurrentUser,
  },
  dispatch,
);

export default translate('common')(connect(null, mapDispatchToProps)(NavbarComponent));
