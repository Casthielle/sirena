import React , { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

const setProps = (state) => { return { user: state.user }; };

class RouteBuilder extends Component {
  middleware = (Component) => (this.props.user.status === 'online') ? (<Component/>) : (<Redirect to={ this.props.redirect }/> );
  component = ({ component: Component, ...props }) => {
    return (props.private) ? ( <Route {...props} render={ () => this.middleware(Component) }/> ) : ( <Route {...this.props}/> );
  }
  render(){
    return (this.component.bind(this)(this.props));
  }
}

export default connect(setProps)(RouteBuilder);
