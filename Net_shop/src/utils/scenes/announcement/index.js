import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import AnnoucementAddingComponent from '../../../containers/announcement';

const AnnouncementScenes = () => (
  <Route>
    <Fragment>
      <Route exact path="/add_announcement" component={AnnoucementAddingComponent} />
    </Fragment>
  </Route>
);

export default AnnouncementScenes;
