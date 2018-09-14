import React, { Component } from 'react';

import './styles.css';
import Button from '../button';

class Modal extends Component {
  componentDidMount() {
    console.log('');
  }

  render() {
    return (
      <div className="modal-content">
        <div className="modal-header">
          <span className="close">&times;</span>
          <h2 className="center_header">Deleting</h2>
        </div>
        <div className="modal-body center_header">
          <p>Are you sure you want to delete this player?</p>
        </div>
        <div className="buttons">
          <Button style={{ marginRight: 10 }}>Yes</Button>
          <Button>No</Button>
        </div>
      </div>
    );
  }
}

export default Modal;
