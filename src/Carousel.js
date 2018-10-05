import React, { Component } from "react";

export class Carousel extends Component {
  state = {
    photos: [],
    active: 0
  };
  // React 16
  static getDerivedStateFromProps({ media }) {
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }
    return { photos };
  }
  handleIndexClick = event => {
    this.setState({
      active: +event.target.dataset.index // + is for coarcing it to a number (comes as a string)
    });
  };
  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active].value} alt="primary animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
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
