import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
// makes easy to map url to different react components
import { BrowserRouter as Router, Route} from "react-router-dom";


import Navbar from "./components/navbar.component";
import MovieList from "./components/movie-list.component";

import Register from "./components/register.component";
import Login from "./components/login.component";
import Search from "./components/search.component";

import Purchase from "./components/purchase.component";


function App() {
  return (
    <Router>
    <div className="container">
    <Navbar />
    <Route path="/" exact component={MovieList} />

    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/search" component={Search} />

     <Route path="/purchase" component={Purchase} />
    
    </div>
    </Router>
    );
}

export default App;
