import React, { Component } from 'react';

import axios from 'axios';

const Movie = props => (
  <tr>

  <td><img src={require('./Sonic.png')}  alt="sonic"width="100"/></td>
  <td>{props.movies.title}</td>
  <td>{props.movies.year}</td>
  <td>{props.movies.genre}</td>
  <td>{props.movies.age}</td>
  
  </tr>
  )

export default class Results extends Component {

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


  movieList() {

    fetch('http://localhost:5000/routes/search').then(response => response.text()).then(a => console.log(a));

    return this.state.movies.map(currentmovie => {

      if(currentmovie.title=="Sonic"){
        return <Movie movies={currentmovie} />;

      }
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
      <th>Actions</th>
      </tr>
      </thead>
      
      <tbody>

      { this.movieList() }

      </tbody>

      </table>

      </div>

      )
  }
}