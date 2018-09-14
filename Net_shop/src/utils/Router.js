import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomeComponent from '../containers/home';
import NavBar from '../components/navbar';
import AuthScenes from './scenes/auth';
import AnnouncementScenes from './scenes/announcement';

const RouterComponent = () => (
  <Router>
    <Fragment>
      <NavBar />
      <Route exact path="/" component={HomeComponent} />
      {AuthScenes()}
      {AnnouncementScenes()}
    </Fragment>
  </Router>
);

export default RouterComponent;
