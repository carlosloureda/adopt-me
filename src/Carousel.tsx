import React, { Component } from "react";
import { PetMedia, PetPhoto } from "petfinder-client";

interface Props {
  media: PetMedia;
}

interface State {
  active: number;
  photos: PetPhoto[];
}

export class Carousel extends Component<Props, State> {
  public state = {
    photos: [] as PetPhoto[],
    active: 0
  };
  // React 16
  public static getDerivedStateFromProps({ media }: Props) {
    let photos: PetPhoto[] = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }
    return { photos };
  }

  public handleIndexClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    if (event.target.dataset.index) {
      this.setState({
        active: +event.target.dataset.index // + is for coarcing it to a number (comes as a string)
      });
    }
  };

  public render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active].value} alt="primary animal" />
        <div className="carousel-smaller">
          {photos.map((photo: PetPhoto, index: number) => (
            /* TODO: Should be refactored to be a button with an image inside the button*/
            /* eslint-disable-next-line*/
            <img
              onClick={this.handleIndexClick}
              key={photo.value}
              src={photo.value}
              data-index={index}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
