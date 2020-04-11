import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';


export default class MovieList extends Component {

  constructor(props) {
    super(props);
    this.state = {days: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/movie/')
    .then(response => {
      console.log(response.data);
      this.setState({ days: response.data })

    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() { 
    return (
      <table className="table">

      <tbody>

      {this.state.days.map( days =>(
        <div>

        {days.movies_array.map( movies =>(
          <>
          <tr >

          <td class="p-0">
          <img src={require("./images/"+movies.title+".jpg")}  alt="sonic"width="140"/>
          </td>


          <table className="table">

          <th class="pt-0 pb-0 bg-light" colspan="3">
          <span class="h4">{days.theater}</span>  <span class="h5"> ({days.address}) </span>   
          </th>

          <tr>

          <td width="30%">
          <span class="h4"> {movies.title}</span>
          <div> {movies.genre}</div>
          <div>[{movies.age}] - {movies.length}</div>
          <div>{movies.released}</div>
          </td>

          <td  width="40%">
          <div class=" p-0 h2 mb-0 pl-4">
          {days.day}
          </div>

          {movies.times.map( time =>(

           <Link to={{
            pathname: 'purchase',
            state: { 
              title: movies.title,
              showtime: time,
              theater: days.theater

            }
          }}> <button class="btn btn-info mt-1 mr-2" >{time} </button> </Link>

          ))}
          </td>

          <td >
          <button type="button" class="btn btn-dark" 
          onClick={()=> window.open(movies.amc, "_blank")}>Purchase with AMC</button>
          <br/>
          <button type="button" class="btn btn-secondary" 
          onClick={()=> window.open(movies.regal, "_blank")}>Purchase with Regal</button>
          </td>

          </tr>

          </table>


          </tr>
          <div class="bg-light pb-1"></div>
          </>
          ))}

          <div class="bg-dark pb-1"></div>
          </div>
          ))}

          </tbody>
          </table>

          )
        }
      }
