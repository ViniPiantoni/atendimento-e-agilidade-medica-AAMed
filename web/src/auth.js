import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const check = () => {
  var bool;
  var width = window.innerWidth;
  if (width < 774) {
    bool = false;
  } else {
    bool = true;
  }
  return bool;
};

const auth = () => {
  let logged;
  if (localStorage.getItem('hptid')) {
    logged = true;
  } else {
    logged = false;
  }
  return logged;
};

/* rotas bloqueadas para celulares */
const LoginRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        check() ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />
      }
    />
  );
};
const RegisterRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        check() ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />
      }
    />
  );
};
const LogoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        check() ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />
      }
    />
  );
};
/* rota para user logado */
const PrivateLogged = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth() ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />
      }
    />
  );
};

export { LoginRoute, RegisterRoute, LogoutRoute, PrivateLogged };
