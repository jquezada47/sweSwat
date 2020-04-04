import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class Register extends Component {

  constructor(props) {
    super(props);

    this.onChangeEmail= this.onChangeEmail.bind(this);
    this.onChangePassword= this.onChangePassword.bind(this);
    this.onChangeName= this.onChangeName.bind(this);
    this.onChangeBirth= this.onChangeBirth.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
      name: '',
      birth: new Date(),
      valid: false,
      redirect: "http://localhost:3000/register",
    };
  }


  onChangeEmail(e) {
    this.setState({email: e.target.value})
  }

  onChangePassword(e) {
    this.setState({password: e.target.value})
  }

  onChangeName(e) {
    this.setState({name: e.target.value})
  }

  onChangeBirth(e) {
    this.setState({birth: e})
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      birth: this.state.birth
    }

    axios.post("http://localhost:5000/users/add", user)
    .then((res) => {
      console.log(res.data);
      this.setState({
        valid: res.data,
      });

    this.setState({
      email: '',
      password: '',
      name: '',
      birth: ''
    })

    if (this.state.valid) {
        this.setState({redirect: 'http://localhost:3000/'})
    }
    // window.location = "http://localhost:3000/";
      window.location = this.state.redirect
    });
  }


  render() {
    return (
     <form onSubmit={this.onSubmit}>

     <h3>Register</h3>

     <div class="form-group">
     <label for="exampleInputEmail1">Email address</label>
     <input type="email" class="form-control" id="exampleInputEmail1" 
     required value={this.state.email} onChange={this.onChangeEmail}/>
    
    
     <div class="form-group">
     <label for="exampleInputPassword1">Password</label>
     <input type="password" class="form-control" id="exampleInputPassword1" 
     value={this.state.password} onChange={this.onChangePassword}/>
     </div>


     </div>
     <div class="form-group">
     <label for="name">Name</label>
     <input type="text" class="form-control" id="name" 
     value={this.state.name} onChange={this.onChangeName}/>
     </div>

     <div className="form-group">
     <label>Birthdate: </label>
     <div>
     <DatePicker selected={this.state.birth} onChange={this.onChangeBirth}/>
     </div>
     </div>

     <input type="submit" value="Register" className="btn btn-primary" />
     </form>
     );
   }
 }