import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = { days: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/movie/")
      .then((response) => {
        console.log(response.data);
        this.setState({ days: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
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

  render() {
    return (
      <table className="table ">
        <tbody>
          {this.state.days.map((days) => (
            <div>
              {days.movies_array.map((movies) => (
                <>
                  <tr class="border border-dark rounded">
                    <td class="p-0">
                      <img
                        src={require("./images/" + movies.title + ".jpg")}
                        width="140"
                      />
                      ;
                    </td>
                    <table className="table m-0">
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
                                title: movies.title,
                                genre: movies.genre,
                                age: movies.age,
                                length: movies.length,
                                released: movies.released,
                                day: days.day,
                                days: this.state.days,
                              },
                            }}
                          >
                            <div class="btn btn-outline-dark">
                              <h5>{movies.title} </h5>
                            </div>
                          </Link>
                          <div> {movies.genre}</div>
                          <div>
                            [{movies.age}] - {movies.length}
                          </div>
                          <div>{movies.released}</div>
                        </td>
                        <td width="40%">
                          <div class="display-4 p-0 h2 mb-0 pl-4 ">
                            {days.day}
                          </div>

                          {movies.times.map((time) => (
                            <Link
                              to={{
                                pathname: "purchase",
                                state: {
                                  title: movies.title,
                                  theater: days.theater,
                                  address: days.address,
                                  start: this.toTime(time.start),
                                  end: this.toTime(time.end),
                                  day: days.day,
                                },
                              }}
                            >
                              <button class="btn btn-info mt-1 mr-2">
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
                            onClick={() => window.open("https://www.amctheatres.com/", "_blank")}
                          >
                            Purchase with AMC
                          </button>
                          <br />
                          <button
                            type="button"
                            class="btn btn-secondary"
                            onClick={() => window.open("https://www.regmovies.com/", "_blank")}
                          >
                            Purchase with Regal
                          </button>
                        </td>
                      </tr>
                    </table>
                  </tr>
                  <div class="bg-light pb-0"></div>
                </>
              ))}

              <div class="bg-dark pb-1"></div>
            </div>
          ))}
        </tbody>
      </table>
    );
  }
}
