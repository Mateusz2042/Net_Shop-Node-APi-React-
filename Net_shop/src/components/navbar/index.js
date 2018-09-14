import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './styles.css';
import NavTitle from '../navTitle';
import Polish from '../../assets/icons/flags/pl.png';
import English from '../../assets/icons/flags/gb.png';
import { getCurrentUser } from '../../actions/auth';
import CurrentUserComponent from '../../containers/auth/currentUser';

class Navbar extends Component {
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
      <nav>
        <div className="title">
          <Link className="text_decorator" to="/"><NavTitle id="net_shop" title={t('navbar.net_shop_title')} htmlFor="net_shop" /></Link>
        </div>
        {
          cookie.load('userToken')
            ? <CurrentUserComponent />
            : (
              <div className="div-links">
                <Link className="text_decorator" to="/login">
                  <div className="links">
                    {t('navbar.login')}
                  </div>
                </Link>
                {'  '}
                <Link className="text_decorator" to="/register">
                  <div className="links">
                    {t('navbar.register')}
                  </div>
                </Link>
              </div>
            )
        }
        <div className="div-languages">
          <img src={Polish} alt="Polish" className="languages" onClick={() => i18n.changeLanguage('pl')} />
          {' '}
          <img src={English} alt="English" className="languages" onClick={() => i18n.changeLanguage('en')} />
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  getCurrentUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth: { currentUser } }) => ({
  currentUser,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getCurrentUser,
  },
  dispatch,
);

export default translate('common')(connect(mapStateToProps, mapDispatchToProps)(Navbar));
