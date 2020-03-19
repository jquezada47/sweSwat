import React, { Component } from 'react';

import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class Login extends Component {
constructor(props) {
  super(props);

    this.onChangeEmail= this.onChangeEmail.bind(this);
    this.onChangePassword= this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
       users: []
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

 
   onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    }

    console.log(user);

    axios.post('http://localhost:5000/users/in', user)
      .then(res => console.log(res.data));

    this.setState({
      email: '',
      password: ''
    
    })
    
  }


  render() {
    return (
     <form onSubmit={this.onSubmit}>
     <div class="form-group">
     <label for="exampleInputEmail1">Email address</label>
     <input type="text" class="form-control" id="exampleInputEmail1" required value={this.state.email}
                onChange={this.onChangeEmail}/>
</div>
     

     
     <div class="form-group">
     <label for="exampleInputPassword1">Password</label>
     <input type="password" class="form-control" id="exampleInputPassword1" required value={this.state.password}
                onChange={this.onChangePassword}/>
     </div>




    
     <input type="submit" value="Login" className="btn btn-primary" />
     </form>
     );
  }
}