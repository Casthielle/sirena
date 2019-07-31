import React, {Fragment} from 'react';
import {Button} from 'react-bootstrap';
import {Container, Form} from '..';
import i18n from '../../helpers/translator';

const Login = (props) => {
  const fields = ['email', 'password'];
  return (
    <Container>
      <Form handlerChange={ props.handlerChange } fields={ fields }>
        <Fragment>
          <Button variant="primary" type="button" onClick={ props.login }> { props.translate('log_in') } </Button>
        </Fragment>
      </Form>
      <Container> { props.errors } </Container>
    </Container>
  );
};

export default i18n(Login);
