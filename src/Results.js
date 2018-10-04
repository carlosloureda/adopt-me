import React from "react";
import pf from "petfinder-client";
import Pet from "./Pet";

// Esto debería de ir en el server porque hacemos el build en el cliente y es
// un error de seguridad pero para este caso es seguro usarlo
const petfinder = pf({
  key: process.env.API_KEY, // parcel knows how to find the .env
  secret: process.env.API_SECRET
});

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: []
    };
  }
  /*async componentDidMount() {
    const result = await petfinder.breed.list({ animal: "dog" });
  }*/
  componentDidMount() {
    petfinder.pet
      .find({ output: "full", location: "Seattle, WA" })
      .then(data => {
        let pets = [];
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets];
          }
        }

        this.setState({
          pets: pets
        });
      });
  }
  render() {
    return (
      <div className="search">
        {this.state.pets.map(pet => {
          let breed = pet.breeds.breed;
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(", ");
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

export default Results;
