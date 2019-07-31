import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './container.css';

const Contain = (props) => {
  return (
    <Container>
      <Row>
        <Col>
          { props.children }
        </Col>
      </Row>
    </Container>
  );
};

export default Contain;
