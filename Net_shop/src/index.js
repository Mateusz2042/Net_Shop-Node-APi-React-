import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import './index.css';
import store from './store/configureStore';
import Router from './utils/Router';
import registerServiceWorker from './registerServiceWorker';
import common_en from './utils/translation/en/common.json';
import common_pl from './utils/translation/pl/common.json';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'pl',
  resources: {
    en: {
      common: common_en,
    },
    pl: {
      common: common_pl,
    },
  },
});

ReactDOM.render(
  <Fragment>
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <Router />
      </Provider>
    </I18nextProvider>
  </Fragment>, document.getElementById('root'),
);
registerServiceWorker();
