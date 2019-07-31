import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const settings = {
  key: 'root',
  storage,
};

const reducer = (state = {}, action) => {
  let update;
  switch (action.type) {
    case 'SET_USER_DATA':
      update = {...state, user: action.payload.user}; break;
    case 'SET_ORDERS_DATA':
      update = {...state, orders: action.payload.orders}; break;
    case 'SET_SEARCH_ORDERS_DATA':
      update = {...state, search_orders: action.payload.search_orders}; break;
    case 'SET_PROVIDERS_DATA':
      update = {...state, providers: action.payload.providers}; break;
    case 'SET_LOCALE':
      update = {...state, locale: action.payload.locale}; break;
    default:
      update = state; break;
  }
  return update;
};

const peReducer = persistReducer(settings, reducer);
const store = createStore(peReducer, {
  user: {status: 'offline'},
  orders: null,
  providers: null,
  locale: 'es',
});
const persistor = persistStore(store);

export {store, persistor};
