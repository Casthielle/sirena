import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Login as Base } from '../components';
import { Alert } from 'react-bootstrap';
import Server from '../services';
import validator from '../helpers/validator';

class Login extends Component {

  state = {
    login: {},
    rules: {
      email: ['required', 'email'],
      password: ['required']
    },
  }

  login = async () => {
    let valid = validator.make(this.state.login, this.state.rules);
    if(valid){
      let data = await Server.login(this.state.login);
      const { user, token } = data;
      this.props.dispatch({
        type: "SET_USER_DATA",
        payload: { user: { ...user, token, status: 'online' } }
      });
      this.props.history.push("/");
    }
    else{
      this.setState({ errors: validator.getErrors('array').map((item, index) => (<Alert dismissible key={index} variant="dark">{ item }</Alert>)) });
    }
  }

  handlerChange = property => event => {
    let value = event.target.value;
    this.setState(state => { state.login[property] = value; });
  }

  render() {
    let { errors } = this.state;
    return (
      <Base login={ this.login } handlerChange={ this.handlerChange } errors={ errors }/>
    );
  }
}

export default connect(null)(Login);
