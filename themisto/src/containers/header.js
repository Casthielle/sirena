import React, { Component } from 'react';
import { Navbar, Switch } from '../components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Server from '../services';
import { withRouter } from 'react-router-dom';

const setProps = (state) => { return { user: state.user }; };

class Header extends Component{

  state = {
    username: `${this.props.user.first_name} ${this.props.user.last_name}`,
    online: (this.props.user.status === 'online')
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      username: `${nextProps.user.first_name} ${nextProps.user.last_name}`,
      online: (nextProps.user.status === 'online')
    });
  }

  logout = async () => {
    const data = await Server.logout();
    this.props.dispatch({
      type: "SET_USER_DATA",
      payload: { user: { status: data.status } }
    });
    this.props.dispatch({
      type: "SET_PRODUCTS_DATA",
      payload: { products: null }
    });
  }

  language = (locale) => {
    this.props.dispatch({
      type: "SET_LOCALE",
      payload: {
        locale: locale
      }
    });
  }

  render(){
    return (
      <Navbar title='Themisto' language={ this.language }>
        <Switch online={ this.state.online } username={ this.state.username } logout={ this.logout }/>
      </Navbar>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func
}

export default withRouter(connect(setProps)(Header));
