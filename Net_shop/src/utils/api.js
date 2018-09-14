import { isFunction } from 'lodash';

const Config = {
  apiUrl: 'http://localhost:4000/api/',
};

const handleErrors = (response) => {
  if (!response.ok) {
    throw response;
  }

  if (response.status === 201) {
    return null;
  }


  if (response.status === 403) {
    return null;
  }

  return response.json();
};

const getRequestInfo = url => (`${Config.apiUrl}${url}`);

const init = method => ({
  method,
  headers: new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
});

const getQueryString = params => params && `?${Object
  .keys(params)
  .map((k) => {
    if (Array.isArray(params[k])) {
      return params[k]
        .map(val => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
        .join('&');
    }
    return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
  })
  .join('&')}`;

const getRequestInit = (queryOrBody, method, token) => {
  const requestInit = init(method);

  if (['GET', 'Delete'].includes(method)) {
    requestInit.query = getQueryString(queryOrBody);
  } else {
    requestInit.body = JSON.stringify(queryOrBody);
  }

  if (token) {
    requestInit.headers.append('x-access-token', token);
  }

  return requestInit;
};

function errorsHandling(errors, failureCallback) {
  if (isFunction(errors.json)) {
    errors.json()
      .then(message => failureCallback({
        message,
        status: errors.status,
      }));
  } else {
    failureCallback({ message: errors });
  }
}

const Api = {
  get: (url, query = {}, token = '', successCallBack, failureCallback) =>
    fetch(getRequestInfo(url) + getQueryString(query), getRequestInit(query, 'GET', token))
      .then(handleErrors)
      .then(successCallBack)
      .catch(errors => errorsHandling(errors, failureCallback)),
  post: (url, body = {}, token = '', successCallBack, failureCallback) =>
    fetch(getRequestInfo(url), getRequestInit(body, 'POST', token))
      .then(handleErrors)
      .then(successCallBack)
      .catch(errors => errorsHandling(errors, failureCallback)),
  delete: (url, body = {}, token = '', successCallBack, failureCallback) =>
    fetch(getRequestInfo(url), getRequestInit(body, 'DELETE', token))
      .then(handleErrors)
      .then(successCallBack)
      .catch(errors => errorsHandling(errors, failureCallback)),
  put: (url, body = {}, token = '', successCallBack, failureCallback) =>
    fetch(getRequestInfo(url), getRequestInit(body, 'PUT', token))
      .then(handleErrors)
      .then(successCallBack)
      .catch(errors => errorsHandling(errors, failureCallback)),
};

export default Api;
