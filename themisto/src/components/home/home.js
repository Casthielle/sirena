import React from 'react';
import {Table} from '..';
import {Form, Col, Button} from 'react-bootstrap';
import i18n from '../../helpers/translator';
import loading from '../../containers/loading.hoc';

const Home = (props) => {
  const columns = ['provider', 'search', 'status'];
  return (
    <div className="container">
      <Form className="mb-3">
        <Form.Row>
          <Col md={5}>
            <Form.Control onChange={ props.handlerChange('query') } type="input" placeholder={ props.translate('search') } />
          </Col>
          <Col md={5}>
            <Form.Control as="select" onChange={ props.handlerChange('provider') }>
              <option>{ props.translate('provider') }</option>
              {props.providers && props.providers.map((item) => (
                <option key={item._id} value={item._id}>{ item.name }</option>
              ))}
            </Form.Control>
          </Col>
          <Col>
            <Button block variant="secondary" onClick={ props.search }>{ props.translate('search') }</Button>
          </Col>
        </Form.Row>
      </Form>
      <Table columns={ columns } data={ props.data }/>
    </div>
  );
};

export default loading(i18n(Home));
