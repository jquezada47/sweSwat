import React, { Component } from 'react';
// allows to link to different routes
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">

      <Link to="/" className="navbar-brand">MovieFinder</Link>

      <ul className="navbar-nav mr-auto">

        <li className="navbar-item">
        <Link to="/" className="nav-link">All Movies</Link>
        </li>

        <li className="navbar-item">
        <Link to="/register" className="nav-link">Register</Link>
        </li>

        <li className="navbar-item">
        <Link to="/login" className="nav-link">Login</Link>
        </li>

        <li className="navbar-item">
        <Link to="/search" className="nav-link">Search</Link>
        </li>

        <li className="navbar-item">
        <Link to="/results" className="nav-link">SearchResults</Link>
        </li>

        <li className="navbar-item">
        <Link to="/purchase" className="nav-link">Purchase</Link>
        </li>

         <li className="navbar-item">
        <Link to="/createmovie" className="nav-link">Create Movie</Link>
        </li>

      </ul>
      </nav>
      );
  }
}
