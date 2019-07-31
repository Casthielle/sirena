import React, {Fragment} from 'react';
import {Button} from 'react-bootstrap';
import {Container, Form} from '..';
import i18n from '../../helpers/translator';

const Register = (props) => {
  const fields = ['first_name', 'last_name', 'email', 'password'];
  return (
    <Container>
      <Form handlerChange={ props.handlerChange } fields={ fields }>
        <Fragment>
          <Button variant="primary" type="button" onClick={ props.register }> { props.translate('register') } </Button>
        </Fragment>
      </Form>
      <Container> { props.errors } </Container>
    </Container>
  );
};

export default i18n(Register);
