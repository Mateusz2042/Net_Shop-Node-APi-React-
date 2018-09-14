import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class Button extends Component {
  componentDidMount() {
    console.log('');
  }

  render() {
    const {
      id, style, children, onClick, text,
    } = this.props;

    return (
      children
        ? <button onClick={onClick} style={style} type="button" id={id}>{children}</button>
        : (
          <button onClick={onClick} style={style} type="button" id={id}>
            <label htmlFor={text} id={text}>
              {text}
            </label>
          </button>
        )
    );
  }
}

Button.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.shape(),
  style: PropTypes.shape(),
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  style: null,
  text: '',
};

export default Button;
