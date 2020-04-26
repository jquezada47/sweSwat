import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeBirth = this.onChangeBirth.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: "",
      password: "",
      name: "",
      birth: new Date(),
      valid: false,
      redirect: "http://localhost:3000/register",
      gender: "",
    };
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeBirth(e) {
    this.setState({ birth: e });
    //console.log(this.state.birth)
  }
  onChangeGender(e) {
    this.setState({ gender: e.target.value });
    console.log(this.state.gender);
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      birth: this.state.birth,
      gender: this.state.gender,
    };

    let currentDate = new Date(Date.now());
    let yearMinus120 = currentDate.getFullYear() - 120;

    let temp = new Date(Date.now());
    let date120ago = new Date(temp.setFullYear(yearMinus120));

    let yearMinus18 = currentDate.getFullYear() - 18;
    temp = new Date(Date.now());
    let date18ago = new Date(temp.setFullYear(yearMinus18));

    if (
      this.state.birth > date120ago &&
      this.state.birth < date18ago &&
      this.state.gender
    ) {
      axios.post("http://localhost:5000/users/add", user).then((res) => {
        console.log(res.data);
        this.setState({
          valid: res.data,
        });

        this.setState({
          email: "",
          password: "",
          name: "",
          birth: "",
        });

        if (this.state.valid) {
          this.setState({
            redirect: "http://localhost:3000/",
          });
        } else {
          console.log("Try again");
          this.setState({
            redirect: "http://localhost:3000/register",
          });
        }
        window.location = this.state.redirect;
      });
    }
  }
  handleChange(event) {
    this.setState({
      gender: event.target.value,
    });
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        class="w-75 mx-auto border border-dark rounded bg bg-light"
      >
        <div class="display-4 text-center ">Register</div>

        <div class="w-75 mx-auto">
          <div class=" h4 m-0 w-75">Email Address </div>
          <input
            type="text"
            class="form-control"
            placeholder="E-mail"
            required
            value={this.state.email}
            onChange={this.onChangeEmail}
          />
        </div>

        <div class="w-75 mx-auto">
          <div class="h4 m-0 mt-2">Password </div>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            required
            value={this.state.password}
            onChange={this.onChangePassword}
          />
        </div>

        <div class="w-75 mx-auto">
          <div class="h4 m-0 mt-2">Name </div>
          <input
            class="form-control"
            placeholder="Name"
            required
            value={this.state.name}
            onChange={this.onChangeName}
          />
        </div>

        <div class="w-75 mx-auto">
          <div class="h4 m-0 mt-2">Birthdate </div>
          <DatePicker
            selected={this.state.birth}
            onChange={this.onChangeBirth}
          />

          <div class="d-inline ">
            <label class="h3 pl-5 pr-2">
              <input
                required="true"
                type="radio"
                value="male"
                checked={this.state.gender === "male"}
                onChange={this.handleChange}
              />
              Male
            </label>

            <label class="h3 ">
              <input
                required="true"
                type="radio"
                value="female"
                checked={this.state.gender === "female"}
                onChange={this.handleChange}
              />
              Female
            </label>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Register"
              className="btn btn-primary btn-lg btn-block mt-4  mx-auto"
            />
          </div>
        </div>
      </form>
    );
  }
}
