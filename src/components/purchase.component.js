import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default class Purchase extends Component {
  componentDidMount() {
    const { handle } = this.props.match.params;
    const { title } = this.props.location.state;
    console.log(this.props.location.state.title);
  }

  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeCardNum = this.onChangeCardNum.bind(this);
    this.onChangeExpiration = this.onChangeExpiration.bind(this);
    this.onChangeCVV = this.onChangeCVV.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      email: "",
      cardnum: "",
      expiration: "",
      CVV: "",
      type: "Adult",
      movieTitle: this.props.location.state.title,
    };
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangeCardNum(e) {
    this.setState({ cardnum: e.target.value });
  }
  onChangeExpiration(e) {
    this.setState({ expiration: e.target.value });
  }

  onChangeCVV(e) {
    this.setState({ CVV: e.target.value });
  }
  onChangeType(e) {
    this.setState({ type: e.target.value });
    if (this.state.type == "Adult") this.setState({ price: 12 });
    else if (this.state.type == "Senior") this.setState({ price: 11 });
    else if (this.state.type == "Children") this.setState({ price: 10 });
  }
  onChangePrice(e) {
    if (this.state.type == "Adult") this.setState({ price: 12 });
    else if (this.state.type == "Senior") this.setState({ price: 11 });
    else if (this.state.type == "Children") this.setState({ price: 10 });
  }
  price() {
    let r = 0;
    let e = this.state.type;
    if (e == "Adult") r = 12;
    else if (e == "Senior") r = 11;
    else r = 10;

    return r;
  }

  name() {
    if (Cookies.get("user")) {
      return (
        <>
          <div class=" h4 m-0 w-75 mt-2">
            {" "}
            <span class="h4 font-weight-normal">we know it's you</span>{" "}
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Name"
            id="name"
            required
            value={Cookies.get("user")}
          />
        </>
      );
    } else {
      return (
        <>
          <div class=" h4 m-0 w-75 mt-2">Name </div>
          <input
            type="text"
            class="form-control"
            placeholder="Name"
            id="name"
            required
            value={this.state.name}
            onChange={this.onChangeName}
          />
        </>
      );
    }
  }

  email() {
    if (Cookies.get("user")) {
      return (
        <>
          <div class=" h4 m-0 w-75 mt-2">
            <span class="h4 font-weight-normal">
              we got your email {Cookies.get("user")}{" "}
            </span>{" "}
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            required
            value={Cookies.get("email")}
          />
        </>
      );
    } else {
      return (
        <>
          <div class=" h4 m-0 w-75 mt-2">Email </div>
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            required
            value={this.state.email}
            onChange={this.onChangeEmail}
          />
        </>
      );
    }
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(this.props.location.state.title);

    let purchase = {
      name: this.state.name,
      email: this.state.email,
      cardnum: this.state.cardnum,
      expiration: this.state.expiration,
      CVV: this.state.CVV,
      title: this.props.location.state.title,
      start: this.props.location.state.start,
      end: this.props.location.state.end,
      day: this.props.location.state.day,
      theater: this.props.location.state.theater,
      price: this.price(),
      type: this.state.type,
    };

    if (Cookies.get("user")) {
      purchase = {
        name: Cookies.get("user"),
        email: Cookies.get("email"),
        cardnum: this.state.cardnum,
        expiration: this.state.expiration,
        CVV: this.state.CVV,
        title: this.props.location.state.title,
        start: this.props.location.state.start,
        end: this.props.location.state.end,
        day: this.props.location.state.day,
        theater: this.props.location.state.theater,
        price: this.price(),
        type: this.state.type,
      };
    }

    axios.post("http://localhost:5000/purchase/add", purchase).then((res) => {
      console.log(res.data);

      this.setState({
        valid: res.data,
      });
      this.setState({
        name: "",
        email: "",
        cardnum: 0,
        expiration: "",
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
      window.location = this.state.redirect;
    });
  }

  render() {
    return (
      <div>
        <div class=" display-4 text-center p-0 m-0 ">Purchase</div>
        <h3 class="w-75 mx-auto font-weight-normal ">
          Tickets for "<span class="h3">{this.props.location.state.title}</span>
          "
          <br />
          between <span class="h3">
            {this.props.location.state.start}
          </span> to <span class="h3">{this.props.location.state.end}</span>{" "}
          <span class="h3">{this.props.location.state.showtime}</span> on <span class="h3">{this.props.location.state.date}</span>
          <span class="h3">{this.props.location.state.day}</span>
          <br /> at <span class="h3">{this.props.location.state.theater}</span>
          <span class="h5">({this.props.location.state.address})</span>
          <br /> 
        </h3>
        <form
          onSubmit={this.onSubmit}
          class="w-75 mx-auto border border-dark rounded bg bg-light"
        >
          <div class="w-75 mx-auto">
            <div class="mx-auto">{this.name()}</div>
            <div class="mx-auto">{this.email()}</div>
            <div class="mx-auto mt-2">
              <div class=" h4 m-0 w-75">Credit card number</div>
              <input
                type="text"
                class="form-control"
                placeholder="Card Number"
                required
                value={this.state.cardnum}
                onChange={this.onChangeCardNum}
              />
            </div>
            <div class="row mt-2">
              <div class=" mx-auto col">
                <div class=" h4 m-0">
                  Expiration Date
                  <span class="h5 font-weight-normal"> (MM/YY) </span>
                </div>
                <input
                  type="text"
                  placeholder="MM/YY"
                  class="form-control"
                  required
                  value={this.state.expiration}
                  onChange={this.onChangeExpiration}
                />
              </div>

              <div class=" mx-auto col">
                <div class=" h4 m-0 w-75">CVV number</div>
                <input
                  type="text"
                  placeholder="CVV"
                  required
                  class="form-control"
                  value={this.state.CVV}
                  onChange={this.onChangeCVV}
                />
              </div>
            </div>

            <div class="row mt-2">
              <div class=" mx-auto col">
                <div class=" h4 m-0">Type of ticket </div>
                <select
                  class="form-control"
                  value={this.state.type}
                  onChange={this.onChangeType}
                >
                  <option selected="selected">Adult</option>
                  <option>Senior</option>
                  <option>Children</option>
                </select>
              </div>

              <div class=" mx-auto col">
                <div class=" h4 m-0 w-75">Price</div>
                <input
                  type="text"
                  placeholder="$"
                  required
                  class="form-control"
                  value={this.price()}
                  onChange={this.onChangePrice}
                />
              </div>
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Register"
                className="btn btn-primary btn-lg btn-block mt-3  mx-auto"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
