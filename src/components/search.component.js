import React, { Component } from 'react';
import axios from 'axios';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      search: ''
    }
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
      .then(res => console.log(res.data));

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
          </div>
          <div className="form-group">
            <input type="submit" value="Search" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}