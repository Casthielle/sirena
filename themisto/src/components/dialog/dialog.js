import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import i18n from '../../helpers/translator';

const Dialog = (props) => {
  return (
    <Modal.Dialog show={ props.show.toString() }>
      <Modal.Header closeButton onHide={ props.onHide }>
        <Modal.Title>{ props.title }</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        { prop.children }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={ props.onHide }>{ props.translate('close') }</Button>
        <Button variant="primary" onClick={ props.onSave }>{ props.translate('save') }</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
};

export default i18n(Dialog);
