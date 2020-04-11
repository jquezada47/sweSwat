import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {days: []};
  }


  onChangeSearch(e) {
    this.setState({
      search: e.target.value
    })
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const search = {
      search: this.state.search,
      location: this.state.location
    }

    axios.post('http://localhost:5000/movie/search', search)
    .then(res => {
      this.setState({ days: res.data })
      console.log(res.data)
    });

    this.setState({
      search: ''
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


      <label>Location:(not working)</label>
      <input  type="text" className="form-control"
      value={this.state.location} onChange={this.onChangeLocation}/>


      </div>
      <div className="form-group">
      <input type="submit" value="Search" className="btn btn-primary" />
      </div>
      </form>


      <table className="table">

      <tbody>

      {this.state.days.map( days =>(
        <div>

        <>
        <tr >

        <td class="p-0">
        <img src={require("./images/"+days.movies_array.title+".jpg")}  alt="sonic"width="150"/>
        </td>


        <table className="table">

        <th class="pt-0 pb-0 bg-light" colspan="3">
        <span class="h4">{days.theater}</span>  <span class="h5"> ({days.address}) </span>   
        </th>

        <tr>

        <td width="30%">
        <span class="h4"> {days.movies_array.title}</span>
        <div>{days.movies_array.genre}</div>
        <div>[{days.movies_array.age}] - {days.movies_array.length}</div>
        <div>{days.movies_array.released}</div>
        </td>

        <td  width="40%">
        <div class=" p-0 h2 mb-0 pl-4">
        {days.day}
        </div>

        {days.movies_array.times.map( time =>(

         <Link to={{
          pathname: 'purchase',
          state: { 
            title: days.movies_array.title,
            showtime: time,
            theater: days.theater

          }
        }}> <button class="btn btn-primary mt-1 mr-2" >{time} </button> </Link>

        ))}
        </td>

        <td >
        <button type="button" class="btn btn-dark" 
        onClick={()=> window.open(days.movies_array.amc, "_blank")}>Purchase with AMC</button>
        <br/>
        <button type="button" class="btn btn-secondary" 
        onClick={()=> window.open(days.movies_array.regal, "_blank")}>Purchase with Regal</button>
        </td>

        </tr>

        </table>

        </tr>
        <div class="bg-light pb-1"></div>
        </>


        </div>

        ))}

      </tbody>
      </table>

      </div>

      )
    }
  }
