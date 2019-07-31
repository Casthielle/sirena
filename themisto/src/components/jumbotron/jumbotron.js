import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import i18n from '../../helpers/translator';

const Jumbo = (props) => {
  return (
    <Jumbotron>
      <h1>{ props.title }</h1>
      <p>{ props.children }</p>
      <p><Button onClick={ props.action } variant="primary">{ props.translate('log_in') }</Button></p>
    </Jumbotron>
  );
};

export default i18n(Jumbo);
