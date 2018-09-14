import React, { Component } from 'react';
import cookie from 'react-cookies';

import './styles.css';

class HomeComponent extends Component {
  componentDidMount() {
    console.log('');
    console.log(cookie.load('userToken'));
  }

  render() {
    return (
      <div className="container">
        <div />
      </div>
    );
  }
}

export default HomeComponent;
