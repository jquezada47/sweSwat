import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';


export default class MovieList extends Component {

  constructor(props) {
    super(props);
    this.state = {movies: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/movie/')
    .then(response => {
      this.setState({ movies: response.data })


    })
    .catch((error) => {
      console.log(error);
    })


  }

  render() {
    return (
      <div>
      <h3>Logged Movies</h3>
      <table className="table">
      <thead className="thead-light">
      <tr>
      <th>Image</th>
      <th>Title</th>
      <th>Year</th>
      <th>Genre</th>
      <th>Age Rating</th>
      <th>Showtimes</th>
      <th>Purchase</th>
      </tr>
      </thead>


      <tbody>

      {this.state.movies.map(movies => (

       <tr>

       <td><img src={require("./"+movies.title+".png")}  alt="sonic"width="150"/></td>
       <td> <a href="/info" class="btn btn-info"> {movies.title} </a> </td>
       <td>{movies.year}</td>
       <td>{movies.genre}</td>
       <td>{movies.age}</td>
       <td> 
       {movies.showtimes.map(time => 

        <Link to={{
          pathname: 'purchase',
          state: { 
            title: movies.title,
            id: movies._id,
            showtime: time
          }
        }}> <button class="btn btn-primary" >{time} </button> <br/> 
        </Link>)}
        </td>

        <td>
        <button type="button" class="btn btn-dark" 
        onClick={()=> window.open(movies.amc, "_blank")}>Purchase with AMC</button>
        <br/>
        <button type="button" class="btn btn-secondary" 
        onClick={()=> window.open(movies.regal, "_blank")}>Purchase with Regal</button>
        </td>

        </tr>
        ))}

        </tbody>
        </table>

        </div>
        )
    }
  }