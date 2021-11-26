import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom'

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import postData from '../api'
//import './NavMenu.css';

//export class NavMenu extends Component {
//  static displayName = NavMenu.name;

//  constructor (props) {
//    super(props);

//    this.toggleNavbar = this.toggleNavbar.bind(this);
//    this.state = {
//      collapsed: true
//    };
//  }

//  toggleNavbar () {
//    this.setState({
//      collapsed: !this.state.collapsed
//    });
//  }

//  render () {
//    return (
//      <header>
//        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
//          <Container>
//            <NavbarBrand tag={Link} to="/">imbdClientBrowser</NavbarBrand>
//            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
//            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
//              <ul className="navbar-nav flex-grow">
//                <NavItem>
//                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
//                </NavItem>
//                <NavItem>
//                  <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
//                </NavItem>
//                <NavItem>
//                  <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
//                </NavItem>
//              </ul>
//            </Collapse>
//          </Container>
//        </Navbar>
//      </header>
//    );
//  }
//}

export default function NavBar() {
    const [form, setForm] = useState({ search: "" })

    const handleSubmit = (e) => {
        e.preventDefault()

    }


    return (
        <Navbar id="topbar" bg="warning" expand="sm">
            <Container>
                <Link to="/" className="navbar-nav nav-link active" style={{ color: 'black' }}>imbd Client</Link>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="w-100">
                        <Nav.Item><Link to="/movies" className="nav-link active">Movies</Link></Nav.Item>
                        <Nav.Item><Link to="/directors" className="nav-link active">Directors</Link></Nav.Item>
                        <Form className="d-flex nav-item me-auto">
                            <Form.Control type="text" placeholder="Search..." />
                            <Button type="submit">Search</Button>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

//<NavDropdown title="Dropdown" id="basic-nav-dropdown">
//    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//    <NavDropdown.Item href="#action/3.2">
//        Another action
//    </NavDropdown.Item>
//    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//    <NavDropdown.Divider />
//    <NavDropdown.Item href="#action/3.4">
//        Separated link
//    </NavDropdown.Item

        //<header className="navbar container-fluid navbar-expand-sm navbar-light bg-warning container-fluid">
        //    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //        <span className="navbar-toggler-icon"></span>
        //    </button>
        //    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //        <nav className="navbar-nav me-auto mb-2 mb-lg-0">
        //            <Link to="/" className="nav-item nav-link active" aria-current="page">Home</Link>
        //            <Link to="/movies" className="nav-item nav-link active" aria-current="page">Movies</Link>
        //            <Link to="/directors" className="nav-item nav-link active" aria-current="page">Directors</Link>
        //        </nav>
        //        <form className="d-flex">
        //            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        //            <button className="btn btn-outline-dark" type="submit">Search</button>
        //        </form>
        //    </div>
        //</header>