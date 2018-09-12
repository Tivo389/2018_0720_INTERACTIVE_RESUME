import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import Thankyou from './Thankyou';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/thankyou.html" component={Thankyou} />
    </Switch>
  </BrowserRouter>
);

export default Router;