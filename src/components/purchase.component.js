import React, { Component } from 'react';
import axios from 'axios';


export default class Purchase extends Component {

  componentDidMount(){

    console.log(this.props.location.state.title)
  }

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
      CVV: 0,
       movieTitle: this.props.location.state.title
    }

  }


  onChangeName(e) {
    this.setState({name: e.target.value})
  }

  onChangeEmail(e) {
    this.setState({email: e.target.value})
  }

  onChangeCardNum(e) {
    this.setState({cardnum: e.target.value})
  }
  onChangeExpiration(e) {
    this.setState({expiration: e.target.value})
  }

  onChangeCVV(e) {
    this.setState({ CVV: e.target.value})
  }
  


  onSubmit(e) {
    e.preventDefault();

    console.log(this.props.location.state.title)
   

    const purchase = {
      name: this.state.name,
      email: this.state.email,
      cardnum: this.state.cardnum,
      expiration: this.state.expiration,
      CVV: this.state.CVV,
      movieTitle: this.props.location.state.title
    }

    

    axios.post('http://localhost:5000/purchase/add', purchase)
    .then(res => {
      console.log(res.data)

      this.setState({
        valid: res.data,
      });
      this.setState({
        name: '',
        email: '',
        cardnum: 0,
        expiration: '',
        CVV: 0,
      });

      if (this.state.valid) {
        console.log("Puchased!");
        this.setState({
          redirect: "http://localhost:3000/",
        });

      } else {
        console.log("Try again");
        this.setState({
          redirect: "http://localhost:3000/purchase",
        });
      }
      window.location = this.state.redirect
    });
  }


  render() {

    return (
     <form onSubmit={this.onSubmit}>

     <h3>Purchasing tickets for "{this.props.location.state.title}" <br/>
     at {this.props.location.state.showtime}  at {this.props.location.state.theater}</h3>

      Movie<br/>
     <input type="text"  value={this.props.location.state.title}/>
     <br/>

     Name<br/>
     <input type="text"  id="name" required value={this.state.name}
     onChange={this.onChangeName}/>
     <br/>

     Email<br/>
     <input type="text"  id="exampleInputEmail1" required value={this.state.email}
     onChange={this.onChangeEmail}/>
     <br/>
     
     Credit card number<br/>
     <input type="text"  id="card" required value={this.state.cardnum}
     onChange={this.onChangeCardNum}/>
     <br/>

     Expiration Date (MM/YY): <br/>
     <input type="text"  id="card" placeholder="MM/YY" required value={this.state.expiration}
     onChange={this.onChangeExpiration}/>
     <br/>

     CVV number: <br/>
     <input type="text"  id="ccvv" placeholder="" required  value={this.state.CVV}
     onChange={this.onChangeCVV}/>

     <br/>
     <br/>
     <input type="submit" value="Checkout" className="btn btn-primary" />

     </form>
     );
   }
 }
