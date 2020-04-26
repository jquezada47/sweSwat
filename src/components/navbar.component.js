import React, { Component } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default class Navbar extends Component {
  componentDidMount() {
    if (Cookies.get("user")) console.log(Cookies.get("user"));
  }

  loginButtons() {
    console.log(Cookies.get("user"));
    if (Cookies.get("user")) {
      return (
        <>
          <li className="h2">
            <Link to="/profile" className="btn btn-info p-1">
              <h3>Profile</h3>
            </Link>
          </li>

          <li>
            <Link onClick={this.handleOnClick} className="btn btn-danger p-1">
              <h3>Logout</h3>
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="h2">
            <Link to="/register" className="btn btn-primary p-1">
              <h3>Register</h3>
            </Link>
          </li>

          <li>
            <Link to="/login" className="btn btn-success p-1 pl-3 pr-3">
              <h3>Login</h3>
            </Link>
          </li>
        </>
      );
    }
  }

  handleOnClick = () => {
    Cookies.remove("user");
    Cookies.remove("email");
    window.location = "http://localhost:3000/";
  };

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg h3">
        <div class="container-fluid">
          <Link to="/" className="navbar-brand ">
            <h3>MovieFinder</h3>
          </Link>
          <ul class="nav navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="navbar-item">
              <Link to="/all" className="nav-link">
                All
              </Link>
            </li>

            <li className="navbar-item">
              <Link to="/search" className="nav-link">
                Search
              </Link>
            </li>
          </ul>

          <ul class="nav navbar-nav navbar-right">{this.loginButtons()}</ul>
        </div>
      </nav>
    );
  }
}
