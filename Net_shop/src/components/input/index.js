import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class Input extends Component {
  state = {
    focused: false,
  }

  handleChangeFocus = () => {
    const { focused } = this.state;
    this.setState(() => ({ focused: !focused }));
  };

  render() {
    const {
      id, name, type, placeholder, value, onChange,
    } = this.props;

    const { focused } = this.state;

    return (
      <div className="input">
        <input
          onFocus={this.handleChangeFocus}
          onBlur={this.handleChangeFocus}
          name={name}
          type={type}
          id={id}
          placeholder={focused ? '' : placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  placeholder: '',
};

export default Input;
