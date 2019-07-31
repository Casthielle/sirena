import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Dialog } from '../components';

class Boundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null
  }

  clearErrorState = () => {
    this.setState({ hasError: false });
    this.setState({ error: null });
    this.setState({ errorInfo: null });
  }

  componentDidCatch(error, info){
    this.setState({ hasError: true });
    this.setState({ error: error });
    this.setState({ errorInfo: info });
  }

  render() {
    let content = { error: this.state.error, errorInfo: this.state.errorInfo };
    if (this.state.hasError) {
      return createPortal(
        <Dialog title="Error" show="true" onHide={ this.clearErrorState }>
          <p style={{ whiteSpace: 'pre-wrap' }}>
            { content.error && content.error.toString() }
            { content.errorInfo && content.errorInfo.componentStack }
          </p>
        </Dialog>, document.getElementById('modals'));
    }
    return this.props.children;
  }
}

export default Boundary;
