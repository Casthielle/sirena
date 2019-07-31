import React from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import './navbar.css';
import i18n from '../../helpers/translator';

const NavigationBar = (props) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">{ props.title }</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavDropdown title={ props.translate('language') } id="basic-nav-dropdown">
            <NavDropdown.Item onClick={ () => props.language('es') }>{ props.translate('spanish') }</NavDropdown.Item>
            <NavDropdown.Item onClick={ () => props.language('en') }>{ props.translate('english') }</NavDropdown.Item>
          </NavDropdown>
          <NavLink exact to="/" activeClassName="nav-active" className="nav-link">{ props.translate('home') }</NavLink>

          { props.children }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default i18n(NavigationBar);
