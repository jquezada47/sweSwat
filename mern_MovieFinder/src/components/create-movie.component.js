import React, { Component } from 'react';
import axios from 'axios';

export default class CreateMovie extends Component {

  //
  constructor(props) {
    super(props);

    // makes sure this refers to the right methods
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onChangeAge= this.onChangeAge.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // correspond to mongoDB documents, like vars
    this.state = {
      title: '',
      year: 0,
      genre: '',
      age: '',

    }
  }

  
  // when user enter value in text box, call the method 
  // it updates state from 'this.state={...'
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }
  onChangeYear(e) {
    this.setState({
      year: e.target.value
    })
  }
  onChangeGenre(e) {
    this.setState({
      genre: e.target.value
    })
  }
  onChangeAge(e) {
    this.setState({
      age: e.target.value
    })
  }


  // when sunmit button clicked
  onSubmit(e) {
    //prevent html button, instead use this method
    e.preventDefault();
    // create object movie from the entered states
    const movie = {
      title: this.state.title,
      year: this.state.year,
      genre: this.state.genre,
      age: this.state.age
    }

    axios.post('http://localhost:5000/movie/add', movie)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Movie for Admin use only</h3>

      <form onSubmit={this.onSubmit}>

        <div className="form-group"> 
          <label>Title: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
              />
        </div>
        <div className="form-group"> 
          <label>Year: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.year}
              onChange={this.onChangeYear}
              />
        </div>
        <div className="form-group">
          <label>Genre: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.genre}
              onChange={this.onChangeGenre}
              />
        </div>
        <div className="form-group">
          <label>Age Rating: </label>
           <input 
              type="text"
              selected={this.state.age}
              onChange={this.onChangeAge}
            />
        </div>

        <div className="form-group">
          <input type="submit" value="Create Movie Log" className="btn btn-primary" />
        </div>
        
      </form>
    </div>
    )
  }
}