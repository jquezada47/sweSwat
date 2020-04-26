import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { days: [] };
  }

  componentDidMount() {
    const profile = {
      name: Cookies.get("user"),
      email: Cookies.get("email"),
    };
    axios.post("http://localhost:5000/users/profile", profile).then((res) => {
      this.setState({
        name: res.data.name,
        email: res.data.email,
        birth: res.data.birth,
        gender: res.data.gender,
      });
    });

    axios.post("http://localhost:5000/purchase/return", profile).then((res) => {
      console.log(res.data);
      this.setState({
        return: res.data,
      });
    });

    console.log(this.state.return);
  }

  calculate_age() {
    if (this.state.birth) {
      let birth = this.state.birth + "1";

      let birth_month = birth.substring(5, 7);
      let birth_day = birth.substring(7, 8);
      let birth_year = birth.substring(0, 4);

      console.log(birth_month);

      let today_date = new Date();
      let today_year = today_date.getFullYear();
      let today_month = today_date.getMonth();
      let today_day = today_date.getDate();
      let age = today_year - birth_year;

      if (today_month < birth_month - 1) {
        age--;
      }
      if (birth_month - 1 == today_month && today_day < birth_day) {
        age--;
      }
      return age;
    }
  }

  handleOnClick = () => {
    window.location = "http://localhost:3000/";
  };

  delete(id) {
    const thing = {
      id: id,
    };
    axios
      .post("http://localhost:5000/purchase/delete", thing)
      .then((res) => {});
    window.location = "http://localhost:3000/profile";
  }

  tickets() {
    if (this.state.return) {
      return this.state.return.map((ticket) => (
        <tr>
          <td>{ticket.title}</td>
          <td>
            {ticket.start} - {ticket.end}
          </td>
          <td>{ticket.day}</td>
          <td>{ticket.theater}</td>
          <td>
            {ticket.type} - ${ticket.price}
          </td>
          <td>
            <button
              className="btn btn-outline-warning btn-lg btn-block"
              onClick={() => this.delete(ticket._id)}
            >
              <span class="h4">Return</span>
            </button>
          </td>
        </tr>
      ));
    }
  }

  render() {
    return (
      <div>
        <div class="d-flex flex-row">
          <div class="p-2 ">
            <img
              src={require("./images/" + this.state.gender + ".png")}
              height="300px"
            />

            <div class="ml-4">
              Name: {this.state.name}
              <br />
              Email: {this.state.email}
              <br />
              Gender: {this.state.gender}
              <br />
              Age: {this.calculate_age()}
              <br />
            </div>
          </div>

          <div class="p-2 ">
            <table class="table p-0 m-0 ">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Showtime</th>
                  <th>Date</th>
                  <th>Theater</th>
                  <th>Price</th>
                  <th>Return</th>
                </tr>
              </thead>
              <tbody>{this.tickets()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
