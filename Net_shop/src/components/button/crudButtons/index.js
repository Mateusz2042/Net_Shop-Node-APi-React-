import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '../index';
import style from '../style';

export const ButtonEdit = props => (
  <Button style={style.button_edit} type="button" id={props.id}>
    <Link to={props.redirect}>
      <img src={props.img} alt={props.id} />
    </Link>
  </Button>
);

ButtonEdit.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  redirect: PropTypes.string.isRequired,
};


export const ButtonDetails = props => (
  <Button style={style.button_details} type="button" id={props.id}>
    <Link to={props.redirect}>
      <img src={props.img} alt={props.id} />
    </Link>
  </Button>
);

ButtonDetails.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  redirect: PropTypes.string.isRequired,
};

export const ButtonDelete = props => (
  <Button style={style.button_delete} type="button" id={props.id} onClick={props.onClick}>
    <img src={props.img} alt={props.id} />
  </Button>
);

ButtonDelete.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
