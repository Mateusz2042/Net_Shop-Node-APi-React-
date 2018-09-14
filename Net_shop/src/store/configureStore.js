import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';

let store;

if (process.env.NODE_ENV === 'production') {
  store = createStore(
    reducers,
    applyMiddleware(thunk),
  );
} else {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line
  store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk)),
  );
}
export default store;
