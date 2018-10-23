import React from "react";
import pf, { Pet as PetType } from "petfinder-client";
import { RouteComponentProps } from "@reach/router";
import Pet from "./Pet";
import { SearchBox } from "./SearchBox";
import { Consumer } from "./SearchContext";

if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("no API keys");
}

const petfinder = pf({
  key: process.env.API_KEY, // parcel knows how to find the .env
  secret: process.env.API_SECRET
});

interface Props {
  searchParams: {
    location: string;
    animal: string;
    breed: string;
  };
}

interface State {
  pets: PetType[];
}

class Results extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pets: []
    };
  }
  /*async componentDidMount() {
    const result = await petfinder.breed.list({ animal: "dog" });
  }*/

  public componentDidMount() {
    this.search();
  }
  public search = () => {
    petfinder.pet
      .find({
        output: "full",
        location: "Seattle, WA",
        animal: this.props.searchParams.animal,
        breed: this.props.searchParams.breed
      })
      .then(data => {
        let pets: PetType[] = [];
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        }

        this.setState({
          pets
        });
      });
  };
  public render() {
    return (
      <div className="search">
        <SearchBox search={this.search} />
        {this.state.pets.map(pet => {
          let breed;
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(", ");
          } else {
            breed = pet.breeds.breed;
          }
          return (
            <Pet
              animal={pet.animal}
              key={pet.id}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
              id={pet.id}
            />
          );
        })}
      </div>
    );
  }
}

export default function ResultsWithContext(props: RouteComponentProps) {
  return (
    <Consumer>
      {context => <Results {...props} searchParams={context} />}
    </Consumer>
  );
}
