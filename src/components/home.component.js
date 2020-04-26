import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

class Gallery2 extends React.Component {
  state = {
    galleryItems: [
      <img class="w-100" src={require("./images/amc.jpg")} />,
      <img class="w-100" src={require("./images/regal.jpg")} />,
      <img class="w-100" src={require("./images/tavern.jpg")} />,
      <img class="w-100" src={require("./images/amc2.jpg")} />,
      <img class="w-100" src={require("./images/regal2.jpg")} />,
    ].map((i) => <h2 key={i}>{i}</h2>),
  };

  responsive = {
    0: { items: 1 },
    100: { items: 2 },
  };

  onSlideChange(e) {
    console.debug("Item`s position during a change: ", e.item);
    console.debug("Slide`s position during a change: ", e.slide);
  }

  onSlideChanged(e) {
    console.debug("Item`s position after changes: ", e.item);
    console.debug("Slide`s position after changes: ", e.slide);
  }

  render() {
    return (
      <AliceCarousel
        items={this.state.galleryItems}
        responsive={this.responsive}
        autoPlayInterval={3000}
        autoPlayDirection="ltl"
        autoPlay={true}
        fadeOutAnimation={true}
        mouseTrackingEnabled={true}
        playButtonEnabled={true}
        disableAutoPlayOnAction={true}
        onSlideChange={this.onSlideChange}
        onSlideChanged={this.onSlideChanged}
      />
    );
  }
}

class Gallery extends React.Component {
  state = {
    galleryItems: [
      <img src={require("./images/Star Wars; The Rise of Skywalker.jpg")} />,
      <img src={require("./images/Onward.jpg")} />,
      <img src={require("./images/Frozen II.jpg")} />,
      <img src={require("./images/Sonic the Hedgehog.jpg")} />,
      <img src={require("./images/Harley Quinn; Birds of Prey.jpg")} />,
      <img src={require("./images/Jumanji; The Next Level.jpg")} />,
      <img src={require("./images/Bad Boys For Life.jpg")} />,
      <img src={require("./images/The Call Of The Wild.jpg")} />,
    ].map((i) => <h2 key={i}>{i}</h2>),
  };

  responsive = {
    0: { items: 1 },
    100: { items: 2 },
    200: { items: 3 },
  };

  onSlideChange(e) {
    console.debug("Item`s position during a change: ", e.item);
    console.debug("Slide`s position during a change: ", e.slide);
  }

  onSlideChanged(e) {
    console.debug("Item`s position after changes: ", e.item);
    console.debug("Slide`s position after changes: ", e.slide);
  }

  render() {
    return (
      <AliceCarousel
        items={this.state.galleryItems}
        responsive={this.responsive}
        autoPlayInterval={2500}
        autoPlayDirection="ltl"
        autoPlay={true}
        fadeOutAnimation={true}
        mouseTrackingEnabled={true}
        playButtonEnabled={true}
        disableAutoPlayOnAction={true}
        onSlideChange={this.onSlideChange}
        onSlideChanged={this.onSlideChanged}
      />
    );
  }
}

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { days: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/movie/")
      .then((response) => {
        this.setState({ days: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  user() {
    if (Cookies.get("user")) {
      return <>, {Cookies.get("user")} </>;
    }
  }
  render() {
    return (
      <div>
        <div class="border border-dark rounded w-75 mx-auto bg bg-light pb-1">
          <div class=" display-4 text-center p-0 m-0 ">
            Welcome to MovieFinder{this.user()}{" "}
          </div>
          <div class="h2 font-weight-normal text-center p-0 m-0">
            -less finding, more watching-
          </div>
        </div>
        <span class="h3">Hot movies</span>
        <Gallery></Gallery>
        <span class="h3">Popular theaters</span>
        <Gallery2></Gallery2>

        <div class="container">
          <div class="row"></div>
        </div>
      </div>
    );
  }
}
