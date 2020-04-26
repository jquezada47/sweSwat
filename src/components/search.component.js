import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeStartMin = this.onChangeStartMin.bind(this);
    this.onChangeStartHour = this.onChangeStartHour.bind(this);
    this.onChangeEndHour = this.onChangeEndHour.bind(this);
    this.onChangeEndMin = this.onChangeEndMin.bind(this);
    this.onChangeStartAP = this.onChangeStartAP.bind(this);
    this.onChangeEndAP = this.onChangeEndAP.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { days: [] };
    this.setState({
      title: "",
      location: "",
      date: "",
      startHour: "",
      startMin: "",
      endHour: "",
      endMin: "",
      startAP: "",
      endAP: "",
    });
  }
  componentDidMount() {
    this.setState({
      title: "",
      location: "",
      date: "",
      startHour: "",
      startMin: "",
      endHour: "",
      endMin: "",
      startAP: "",
      endAP: "",
    });
    let a = 7.3 + "";

    let b = a.substring(a.indexOf(".") + 1, a.length);
    if (b.length < 2) b = b + "0";

    let c = a.substring(0, a.indexOf("."));
    if (c.length < 2) c = "0" + c;

    a = c + ":" + b;

    console.log(a);
  }

  toTime(a) {
    a = a + "";
    if (!a.includes(".")) a = a + ".0";

    let b = a.substring(a.indexOf(".") + 1, a.length);
    if (b.length < 2) b = b + "0";

    let c = a.substring(0, a.indexOf("."));
    if (c.length < 2) {
      c = "0" + c;
      b = b + "am";
    } else if (c * 1 <= 12) {
      b = b + "am";
    } else if (c * 1 > 12) {
      c = c - 12;
      c = "0" + c;
      b = b + "pm";
    }

    a = c + ":" + b;
    return a;
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value,
    });
  }
  onChangeDate(e) {
    this.setState({ date: e });
    //console.log(this.state.birth)
  }
  onChangeStartHour(e) {
    this.setState({ startHour: e.target.value });
    console.log(this.state.startHour);
  }
  onChangeStartMin(e) {
    this.setState({ startMin: e.target.value });
    console.log(this.state.startMin);
  }
  onChangeEndHour(e) {
    this.setState({ endHour: e.target.value });
  }
  onChangeEndMin(e) {
    this.setState({ endMin: e.target.value });
  }
  onChangeStartAP(e) {
    this.setState({ startAP: e.target.value });
  }

  onChangeEndAP(e) {
    this.setState({ endAP: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    let start = this.state.startHour * 1 + this.state.startMin * 0.01;
    if (this.state.startAP == "PM") start = start + 12;

    let end = this.state.endHour * 1 + this.state.endMin * 0.01;
    if (this.state.endAP == "PM") end = end + 12;

    if (start == 0 && end == 0) {
      start = "";
      end = "";
    }

    const search = {
      title: this.state.title,
      location: this.state.location,
      date: this.state.date,
      start: start,
      end: end,
    };

    axios.post("http://localhost:5000/movie/search", search).then((res) => {
      this.setState({ days: res.data });
    });
  }

  render() {
    return (
      <div>
        <div class=" display-4 text-center p-0 m-0 ">Search by</div>
        <div class="h3 font-weight-normal text-center p-0 m-0">
          -search faster, watch faster-
        </div>
        <form
          onSubmit={this.onSubmit}
          class="w-75 mx-auto border border-dark rounded bg bg-light mb-1"
        >
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="text-center h3 m-0 ">Movie Title</div>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div class="col">
                <div class="text-center h3 m-0 ">Theater Address</div>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.location}
                  onChange={this.onChangeLocation}
                />
              </div>
            </div>
            <div class="row mt-4">
              <div class="col">
                <div class="text-center h3 m-0 ">Show Date</div>
                <div class="mx-auto text-center ">
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                  />
                </div>
              </div>
              <div class="col">
                <div class="row">
                  <div class="col">
                    <div class="text-center h3 m-0 ">Start Time</div>
                    <div class="row">
                      <div class="col p-0">
                        <select
                          class="form-control"
                          width="100px"
                          value={this.state.startHour}
                          onChange={this.onChangeStartHour}
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                          <option>11</option>
                          <option>12</option>
                        </select>
                      </div>
                      <div class="col p-0">
                        <select
                          class="form-control"
                          value={this.state.startMin}
                          onChange={this.onChangeStartMin}
                        >
                          <option>0</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                          <option>25</option>
                          <option>30</option>
                          <option>35</option>
                          <option>40</option>
                          <option>45</option>
                          <option>55</option>
                        </select>
                      </div>
                      <div class="col p-0">
                        <select
                          class="form-control"
                          value={this.state.startAP}
                          onChange={this.onChangeStartAP}
                        >
                          <option>AM</option>
                          <option>PM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="p-1"> </div>
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <div class="text-center h3 m-0 ">End Time</div>
                        <div class="row">
                          <div class="col p-0">
                            <select
                              class="form-control"
                              width="100px"
                              value={this.state.endHour}
                              onChange={this.onChangeEndHour}
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                              <option>11</option>
                              <option>12</option>
                            </select>
                          </div>
                          <div class="col p-0">
                            <select
                              class="form-control"
                              value={this.state.endMin}
                              onChange={this.onChangeEndMin}
                            >
                              <option>0</option>
                              <option>5</option>
                              <option>10</option>
                              <option>15</option>
                              <option>20</option>
                              <option>25</option>
                              <option>30</option>
                              <option>35</option>
                              <option>40</option>
                              <option>45</option>
                              <option>55</option>
                            </select>
                          </div>
                          <div class="col p-0">
                            <select
                              class="form-control"
                              value={this.state.endAP}
                              onChange={this.onChangeEndAP}
                            >
                              <option>AM</option>
                              <option>PM</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Search"
              className="btn btn-success btn-lg btn-block mt-4 w-75 mx-auto"
            />
          </div>
        </form>
        <table className="table d-flex justify-content-center">
          <tbody>
            {this.state.days.map((days) => (
              <div>
                <>
                  <tr class="border border-dark rounded">
                    <td class="p-0">
                      <img
                        src={require("./images/" +
                          days.movies_array.title +
                          ".jpg")}
                        alt="sonic"
                        width="150"
                      />
                    </td>
                    <table className="table">
                      <th class="pt-0 pb-0 bg-light" colspan="3">
                        <span class="h4">{days.theater}</span>
                        <span class="h5"> ({days.address}) </span>
                      </th>
                      <tr>
                        <td width="350px">
                          <Link
                            to={{
                              pathname: "select",
                              state: {
                                title: days.movies_array.title,
                                genre: days.movies_array.genre,
                                age: days.movies_array.age,
                                length: days.movies_array.length,
                                released: days.movies_array.released,
                                day: days.day,
                              },
                            }}
                          >
                            <div class="btn btn-outline-dark">
                              <h5>{days.movies_array.title} </h5>
                            </div>
                          </Link>
                          <div>{days.movies_array.genre}</div>
                          <div>
                            [{days.movies_array.age}] -{" "}
                            {days.movies_array.length}
                          </div>
                          <div>{days.movies_array.released}</div>
                        </td>
                        <td width="40%">
                          <div class="display-4 p-0 h2 mb-0 pl-4">
                            {days.day}
                          </div>
                          {days.movies_array.times.map((time) => (
                            <Link
                              to={{
                                pathname: "purchase",
                                state: {
                                  title: days.movies_array.title,
                                  theater: days.theater,
                                  address: days.address,
                                  start: this.toTime(time.start),
                                  end: this.toTime(time.end),
                                  date: days.day,
                                },
                              }}
                            >
                              <button class="btn btn-primary mt-1 mr-2">
                                {this.toTime(time.start)}-
                                {this.toTime(time.end)}{" "}
                              </button>
                            </Link>
                          ))}
                        </td>
                        <td>
                          <br />
                          <button
                            type="button"
                            class="btn btn-dark"
                            onClick={() =>
                              window.open(
                                "https://www.amctheatres.com/",
                                "_blank"
                              )
                            }
                          >
                            Purchase with AMC
                          </button>
                          <br />
                          <button
                            type="button"
                            class="btn btn-secondary"
                            onClick={() =>
                              window.open(
                                "https://www.regmovies.com/",
                                "_blank"
                              )
                            }
                          >
                            Purchase with Regal
                          </button>
                        </td>
                      </tr>
                    </table>
                  </tr>
                  <div class="bg-light pb-1"></div>
                </>
              </div>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
