import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Movie = props => (
  <tr>
  <td><img src={require("./"+props.movies.title+".png")}  alt="sonic"width="150"/></td>
  <td>{props.movies.title}</td>
  <td>{props.movies.year}</td>
  <td>{props.movies.genre}</td>
  <td>{props.movies.age}</td>
  
  <td>



  <a href="/purchase" class="btn btn-primary" >Purchase with Us </a>
  <br/>


  <button type="button" class="btn btn-dark" 
  onClick={()=> window.open(props.movies.amc, "_blank")}>Purchase with AMC</button>
  <br/>
  <button type="button" class="btn btn-secondary" 
  onClick={()=> window.open(props.movies.regal, "_blank")}>Purchase with Regal</button>
  /
  </td>

  
  </tr>
  )

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {movies: []};
  }


  onChangeSearch(e) {
    this.setState({
      search: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const search = {
      search: this.state.search
    }

    console.log(search);

    axios.post('http://localhost:5000/movie/search', search)
    .then(res => {
      this.setState({ movies: res.data })
    });

    this.setState({
      search: ''
    })
  }


  movieList() {
    return this.state.movies.map(currentmovie => {
      return <Movie movies={currentmovie}/>;
    })
  }


  render() {
    return (
      <div>
      <h3>Search</h3>
      <form onSubmit={this.onSubmit}>
      <div className="form-group"> 
      <label>Search: </label>
      <input  type="text" required className="form-control"
      value={this.state.search} onChange={this.onChangeSearch}/>
      </div>
      <div className="form-group">
      <input type="submit" value="Search" className="btn btn-primary" />
      </div>
      </form>


      
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
        }}> <button class="btn btn-primary" >{time} </button> <br/> </Link>)}
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