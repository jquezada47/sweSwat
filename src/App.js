import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// makes easy to map url to different react components
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import MovieList from "./components/movie-list.component";
import Home from "./components/home.component";
import Register from "./components/register.component";
import Login from "./components/login.component";
import Search from "./components/search.component";

import Purchase from "./components/purchase.component";
import Select from "./components/select.component";
import Profile from "./components/profile.component";

function App() {
  return (
    <Router>
      <style>{"body { background-color: white; }"}</style>
      <div className="ml-4 mr-4">
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/all" exact component={MovieList} />

        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/search" component={Search} />

        <Route path="/purchase" component={Purchase} />
        <Route path="/select" component={Select} />
        <Route path="/profile" component={Profile} />
      </div>
    </Router>
  );
}

export default App;
