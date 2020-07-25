import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import { Rodape } from './components';
import {
  About,
  Edit,
  Home,
  Hospitals,
  Login,
  Logout,
  NotFound,
  Profile,
  Register,
  Support,
  Update,
  ChangePass,
  Delete,
  Logged,
  Treatment,
} from './Pages';
import { LoginRoute, RegisterRoute, PrivateLogged } from './auth';

export default function App() {
  return (
    <div className="container-main">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/support" component={Support} />
          <Route path="/about" component={About} />
          <LoginRoute path="/login" component={Login} />
          <RegisterRoute path="/register" component={Register} />
          <PrivateLogged path="/home/:id" exact component={Logged} />
          <PrivateLogged path="/hospitals" component={Hospitals} />
          <PrivateLogged path="/logout" component={Logout} />
          <PrivateLogged path="/profile" component={Profile} />
          <PrivateLogged path="/edit" component={Edit} />
          <PrivateLogged path="/update" component={Update} />
          <PrivateLogged path="/changepassword/:id" component={ChangePass} />
          <PrivateLogged path="/deleteaccount" component={Delete} />
          <PrivateLogged path="/treatment/:id" component={Treatment} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Rodape />
      </Router>
    </div>
  );
}
