import React, {Fragment} from 'react';
import {Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import i18n from '../../helpers/translator';
import './switch.css';

const Switch = (props) => {
  return (props.online ?
    <Button size="sm" variant="secondary" onClick={ props.logout }>{ props.username }</Button> :
    <Fragment>
      <NavLink exact to="/login" activeClassName="nav-active" className="nav-link">{props.translate('log_in')}</NavLink>
      <NavLink exact to="/register" activeClassName="nav-active" className="nav-link">{ props.translate('register') }</NavLink>
    </Fragment>
  );
};

export default i18n(Switch);
