import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { Register as Base } from '../components';
import Server from '../services';
import validator from '../helpers/validator';

class Register extends Component {

  state = {
    register: {},
    rules: {
      first_name: ['required'],
      last_name: ['required'],
      email: ['required', 'email'],
      password: ['required'],
    },
  }

  register = async () => {
    let valid = validator.make(this.state.register, this.state.rules);
    if(valid){
      let data = await Server.register(this.state.register);
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
    this.setState(state => { state.register[property] = value; });
  }

  render() {
    let { errors } = this.state;
    return (
      <Base register={ this.register } handlerChange={ this.handlerChange } errors={ errors }/>
    );
  }
}

export default connect(null)(Register);
