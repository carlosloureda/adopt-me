import React, { Component } from "react";
import pf, { PetResponse, PetMedia } from "petfinder-client";
import Carousel from "./Carousel";
import Modal from "./Modal";
import Loadable from "react-loadable";
import { RouteComponentProps, navigate } from "@reach/router";

if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("no API keys");
}

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

const LoadableContent = Loadable({
  loader: () => import("./AdoptModalContent"),
  loading() {
    return <h1>loading content ...</h1>;
  }
});

export class Details extends React.Component<
  RouteComponentProps<{ id: string }>
> {
  public state = {
    loading: true,
    showModal: false,
    name: "",
    animal: "",
    location: "",
    description: "",
    media: {} as PetMedia,
    breed: ""
  };
  private toggleModal = () =>
    this.setState({ showModal: !this.state.showModal });
  public componentDidMount() {
    if (!this.props.id) {
      return;
    }
    petfinder.pet
      .get({
        id: this.props.id,
        output: "full"
      })
      .then(data => {
        if (!data.petfinder.pet) {
          navigate("/");
          return;
        }
        const pet = data.petfinder.pet;
        let breed = pet.breeds.breed;
        if (Array.isArray(pet.breeds.breed)) {
          breed = pet.breeds.breed.join(", ");
        }
        this.setState({
          animal: pet.animal,
          breed,
          description: pet.description,
          loading: false,
          location: `${pet.contact.city}, ${pet.contact.state}`,
          media: pet.media,
          name: pet.name
        });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  }
  public render() {
    if (this.state.loading) {
      return <h1>loading ...</h1>;
    }
    const {
      animal,
      breed,
      location,
      description,
      media,
      name,
      showModal
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <button onClick={this.toggleModal}>Adopt {name}</button>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <LoadableContent toggleModal={this.toggleModal} name={name} />
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Details;
