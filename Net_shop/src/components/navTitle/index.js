import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class NavTitle extends Component {
  componentDidMount() {
    console.log('');
  }

  render() {
    const {
      id, title, htmlFor,
    } = this.props;

    return (
      <label id={id} htmlFor={htmlFor} className="navTitle">
        {title}
      </label>
    );
  }
}

NavTitle.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
};

export default NavTitle;
