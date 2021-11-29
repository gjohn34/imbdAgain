import React, { Component, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import Context from '../context/globalState'
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { postData } from '../api'
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
    const [form, setForm] = useState({ query: "", type: "0" })
    const { dispatch } = useContext(Context)
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        const { type } = form
        postData("search", form)
            .then(result => result.json())
            .then(data => {
                dispatch({ action: `set${type == "0" ? "Directors" : "Movies"}`, data })
                navigate(`/${type == "0" ? "directors" : "movies"}`)
            })


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
                        <Form onSubmit={handleSubmit} className="d-flex nav-item me-auto">
                            <Form.Control type="text" onChange={e => setForm({ ...form, query: e.target.value })} placeholder="Search..." />
                            <Form.Select onChange={e => setForm({ ...form, type: e.target.value })} aria-label="search">
                                <option defaultValue value="0">Directors</option>
                                <option value="1">Movies</option>
                            </Form.Select>
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