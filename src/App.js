import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";

class App extends React.Component {
  handleTitleClick() {
    alert("you clicked the button");
  }
  render() {
    return (
      <div>
        <h1>Rescue Me!</h1>
        <button onClick={this.handleTitleClick}>Click me!</button>
        <Pet name="Luna" animal="dog" breed="Havanese" />
        <Pet name="Pepper" animal="bird" breed="Cockatiel" />
        <Pet name="Doink" animal="cat" breed="Mixed" />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
