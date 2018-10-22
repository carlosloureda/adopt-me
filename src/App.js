import React, { Component } from "react";
import { Router } from "@reach/router";
import Loadable from "react-loadable";
import pf from "petfinder-client";
import { Provider } from "./SearchContext";
import NavBar from "./NavBar";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

/* Split coding, with Loadable, TODO: make it a HOC*/
const LoadableDetails = Loadable({
  loader: () => import("./Details"),
  loading() {
    return <h1>loading split out code ...</h1>;
  }
});

const LoadableResults = Loadable({
  loader: () => import("./Results"),
  loading() {
    return <h1>loading split out code ...</h1>;
  }
});

const LoadableSearchParams = Loadable({
  loader: () => import("./SearchParams"),
  loading() {
    return <h1>loading split out code ...</h1>;
  }
});

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "Seattle, WA",
      animal: "",
      breed: "",
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    };
  }
  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    });
  };
  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value
      },
      () => {
        this.getBreeds();
      }
    );
  };
  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    });
  };
  getBreeds() {
    let breeds = [];
    if (this.state.animal) {
      petfinder.breed.list({ animal: this.state.animal }).then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({
            breeds: data.petfinder.breeds.breed
          });
        } else {
          this.setState({
            breeds: breeds
          });
        }
      });
    } else {
      this.setState({
        breeds: breeds
      });
    }
  }
  render() {
    return (
      <div>
        <NavBar />
        <Provider value={this.state}>
          <Router>
            <LoadableResults path="/" />
            <LoadableDetails path="/details/:id" />
            <LoadableSearchParams path="/search-params" />
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
