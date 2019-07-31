import React, { Component } from 'react';
import { Jumbotron } from '../components';
import { connect } from 'react-redux';
import i18n from '../helpers/translator';

class Welcome extends Component {

    login = () => this.props.history.push("/login");

    render() {
        const { translate } = this.props;
        return (
            <Jumbotron title={ translate('hello') } action={ this.login }>
              { translate('welcome') }
            </Jumbotron>
        );
    }
}

export default i18n(Welcome);
