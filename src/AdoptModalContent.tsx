import React from "react";

const AdoptModalContent = (props: any) => (
  <React.Fragment>
    <h1>Would you like to adopt {props.name} ?</h1>
    <div className="buttons">
      <button onClick={props.toggleModal}>Yes</button>
      <button onClick={props.toggleModal}>Definitely Yes</button>
    </div>
  </React.Fragment>
);

export default AdoptModalContent;
