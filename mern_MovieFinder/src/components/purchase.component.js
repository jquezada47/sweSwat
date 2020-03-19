import React, { Component } from 'react';

import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class Purchase extends Component {
  constructor(props) {
    super(props);
    this.onChangeName= this.onChangeName.bind(this);
    this.onChangeEmail= this.onChangeEmail.bind(this);
    this.onChangeCardNum= this.onChangeCardNum.bind(this);
    this.onChangeExpiration= this.onChangeExpiration.bind(this);
    this.onChangeCVV= this.onChangeCVV.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      email: '',
      cardnum: 0,
      expiration: 'MM/YY',
      CVV: 0
    }
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangeCardNum(e) {
    this.setState({
     cardnum: e.target.value
   })
  }
  onChangeExpiration(e) {
    this.setState({
      expiration: e.target.value
    })
  }

  onChangeCVV(e) {
    this.setState({
      CVV: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const purchase = {
      name: this.state.name,
      email: this.state.email,
      cardnum: this.state.cardnum,
      expiration: this.state.expiration,
      CVV: this.state.CVV
    }


    axios.post('http://localhost:5000/purchase/add', purchase)
    .then(res => console.log(res.data));

    this.setState({
     name: '',
     email: '',
     cardnum: 0,
     expiration: '',
     CVV: 0
   })
  }


  render() {
    return (
     <form onSubmit={this.onSubmit}>
     <div class="form-group">
     <label for="name">Name</label>
     <input type="text" class="form-control" id="name" required value={this.state.name}
     onChange={this.onChangeName}/>

     <div class="form-group">
     <label for="exampleInputEmail1">Email</label>
     <input type="text" class="form-control" id="exampleInputEmail1" required value={this.state.email}
     onChange={this.onChangeEmail}/>
     </div>

     </div>
     <div class="form-group">
     <label for="card">Credit card number</label>
     <input type="text" class="form-control" id="card" required value={this.state.cardnum}
     onChange={this.onChangeCardNum}/>

     </div>
     <div className="form-group">
     <label>Expiration Date (MM/YY): </label>
     <input type="text" class="form-control" id="card" placeholder="MM/YY" required value={this.state.expiration}
     onChange={this.onChangeExpiration}/>

     <div className="form-group">
     <label>CVV number: </label>
     <input type="text" class="form-control" id="ccvv" placeholder="" required  value={this.state.CVV}
     onChange={this.onChangeCVV}/>
     </div>
     </div>

     <div class="form-group form-check">
     <input type="checkbox" class="form-check-input" id="exampleCheck1" required />
     <label class="form-check-label" for="exampleCheck1">Check me out</label>
     </div>
     <input type="submit" value="Checkout" className="btn btn-primary" />
     </form>
     );
   }
 }