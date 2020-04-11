import React, { Component } from 'react';
// allows to link to different routes
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg h3">
      <div class="container-fluid">
      <Link to="/" className="navbar-brand "><h3 >MovieFinder</h3></Link>

      <ul class="nav navbar-nav mr-auto">

      <li className="navbar-item">
      <Link to="/" className="nav-link">All Movies</Link>
      </li>

      <li className="navbar-item">
      <Link to="/search" className="nav-link">Search</Link>
      </li>

      <li >
      <Link to="/purchase" className="nav-link">Purchase</Link>
      </li>

      </ul>


      <ul class="nav navbar-nav navbar-right">

      <li className="h2">
      <Link to="/register" className="btn btn-primary p-1"><h3>Register</h3></Link>
      </li>

      <li  >
      <Link to="/login" className="btn btn-success p-1 pl-3 pr-3"><h3>Login</h3></Link>
      </li>

      </ul>
      </div>
      </nav>
      );
  }
}
