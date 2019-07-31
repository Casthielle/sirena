import React from 'react';
import {Propagate} from '../components';

const loading = (Component) => (props) => {
  const component = (<Component {...props}/>);
  const spinner = (
    <Propagate sizeUnit={'px'} size={15} color={'#36d7b7'} loading={ props.loading } />
  );
  return (props.loading) ? spinner : component;
};

export default loading;
