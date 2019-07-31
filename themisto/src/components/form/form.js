import React from 'react';
import {Form} from 'react-bootstrap';
import i18n from '../../helpers/translator';

const FormBuilder = (props) => {
  return (
    <Form>
      { props.fields.map((item, index) => (
        <Form.Group key={index}>
          <Form.Label>{ props.translate(item) }</Form.Label>
          <Form.Control type={ item == 'password' ? 'password' : 'input' } placeholder={ props.translate(item) } onChange={ props.handlerChange(item) }/>
        </Form.Group>
      )) }
      { props.children }
    </Form>
  );
};

export default i18n(FormBuilder);
