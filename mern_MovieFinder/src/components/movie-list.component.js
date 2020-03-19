import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Movie = props => (
  <tr>

    <td><img src={require('./Sonic.png')}  alt="sonic"width="100"/></td>
    <td>{props.movies.title}</td>
    <td>{props.movies.year}</td>
    <td>{props.movies.genre}</td>
    <td>{props.movies.age}</td>
    <td>
      <Link to={"/edit/"+props.movies._id}>edit</Link> | <a href="#" onClick={() => { props.deleteMovie(props.movies._id) }}>delete</a>
    </td>
  </tr>
)

export default class MovieList extends Component {
  constructor(props) {
    super(props);

    this.deleteMovies = this.deleteMovies.bind(this)

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

  deleteMovies(id) {
    axios.delete('http://localhost:5000/movies/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      movies: this.state.movies.filter(el => el._id !== id)
    })
  }

  movieList() {
    return this.state.movies.map(currentmovie => {

      return <Movie movies={currentmovie} deleteMovie={this.deleteMovie} key={currentmovie._id}/>;

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