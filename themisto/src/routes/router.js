import React, {Component} from 'react';
import {Switch} from 'react-router-dom';
import Route from './route';
import {Login, Home, Welcome, Register} from '../pages';
import {Error} from '../components';

class Router extends Component {
  render() {
    const {routes} = this.props;
    return (
      <Switch>
        <Route exact path="/" private redirect="/welcome" component={ Home }/>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/welcome" component={ Welcome }/>
        <Route component={ Error }/>
      </Switch>
    );
  }
}

export default Router;
