import React, { Component } from 'react';
import { connect } from 'react-redux';
import Server from '../services';
import { Home as Base } from '../components';

const setProps = (state) => { return { user: state.user, orders: state.orders, providers: state.providers }; };

class Home extends Component {

  state = {
    loading: true,
    search: {},
  }

  componentDidMount(){
    this.orders();
    this.providers();
  }

  orders = async () => {
    try{
      const search_orders = await Server.all("search_order", this.props.user.token);
      const orders = search_orders.map((order) => {
        const provider = this.props.providers.find((provider) => {
          const id = order.search_data && order.search_data.provider;
          return provider._id === id;
        });
        return {
          search: order.search_data && order.search_data.query,
          provider: provider && provider.name,
          status: order.status,
        };
      });
      this.props.dispatch({
        type: "SET_ORDERS_DATA",
        payload: { orders: orders }
      });
      this.props.dispatch({
        type: "SET_SEARCH_ORDERS_DATA",
        payload: { search_orders: search_orders }
      });
      this.setState({ loading: false });
    }
    catch(e){
      console.log('Kernl Panic', e);
    }
  }

  providers = async () => {
    try {
      let providers = await Server.all("providers", this.props.user.token);
      this.props.dispatch({
        type: "SET_PROVIDERS_DATA",
        payload: { providers: providers }
      });
      this.setState({ loading: false });
    }
    catch (e) {
      console.log('Kernl Panic', e);
    }
  }

  search = async () => {
    let data = await Server.create('search_order', this.state.search, this.props.user.token);
    this.orders();
  }

  handlerChange = property => event => {
    let value = event.target.value;
    this.setState(state => { state.search[property] = value; });
  }

  render() {
    return (
      <Base search={ this.search } handlerChange={ this.handlerChange } loading={ this.state.loading } data={ this.props.orders } providers={ this.props.providers } />
    );
  }
}

export default connect(setProps)(Home);
