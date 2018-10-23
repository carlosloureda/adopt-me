import React, { Component } from "react";
import { Router } from "@reach/router";
import Loadable from "react-loadable";
import pf from "petfinder-client";
import { Provider } from "./SearchContext";
import NavBar from "./NavBar";
import { locationsAreEqual } from "history";
import { string } from "prop-types";

if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("no API keys");
}

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

interface State {
  location: string;
  animal: string;
  breed: string;
  breeds: string[];
  handleAnimalChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleBreedChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleLocationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  getBreeds: () => void;
}

export class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      location: "Seattle, WA",
      animal: "",
      breed: "",
      breeds: [] as string[],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    };
  }

  public handleLocationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({
        location: event.target.value
      });
    }
  };
  public handleAnimalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState(
        {
          animal: event.target.value
        },
        () => {
          this.getBreeds();
        }
      );
    }
  };

  public handleBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target instanceof HTMLSelectElement) {
      this.setState({
        breed: event.target.value
      });
    }
  };
  public getBreeds() {
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
            breeds: []
          });
        }
      });
    } else {
      this.setState({
        breeds: []
      });
    }
  }
  public render() {
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
