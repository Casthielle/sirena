import React, {Component, Fragment} from 'react';
import {Header} from './containers';
import Router from './routes/router';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store';

class Core extends Component {
  render() {
    return (
      <Provider store={ store }>
        <PersistGate loading={null} persistor={ persistor }>
          <Fragment>
            <Header/>
            <Router/>
          </Fragment>
        </PersistGate>
      </Provider>
    );
  }
}

export default Core;
