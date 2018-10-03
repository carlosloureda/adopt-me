import React from "react";

const Pet = props => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.name),
    React.createElement("h2", {}, props.name)
  ]);
};

export default Pet;
