import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import LoginComponent from '../../../containers/auth/login';
import RegisterComponent from '../../../containers/auth/register';

const AuthScenes = () => (
  <Route>
    <Fragment>
      <Route exact path="/login" component={LoginComponent} />
      <Route exact path="/register" component={RegisterComponent} />
    </Fragment>
  </Route>
);

export default AuthScenes;
