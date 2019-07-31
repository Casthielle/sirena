import React from 'react';
import {connect} from 'react-redux';
import translator from './translator';
import {withRouter} from 'react-router-dom';

const setProps = (state) => ({locale: state.locale});

const i18n = (Component) => withRouter(connect(setProps)((props) => {
  translator.make(props.locale);
  return (<Component {...props} translate={ translator.translate }/>);
}));

export default i18n;
