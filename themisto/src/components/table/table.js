import React from 'react';
import {Table} from 'react-bootstrap';
import i18n from '../../helpers/translator';

const TableBuilder = (props) => {
  const {data, columns} = props;
  const empty = (<tr><td colSpan={ columns.length }>No records available.</td></tr>);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          { columns.map((item, key) => (<th key={ key }>{ props.translate(item) }</th>)) }
        </tr>
      </thead>
      <tbody>
        { (!data) ? empty : data.map((row, i) => ( <tr key={ i }>
          { columns.map((cell, x) => (<td key={ x }>{ row[cell] }</td>)) }
        </tr> )) }
      </tbody>
    </Table>
  );
};

export default i18n(TableBuilder);
