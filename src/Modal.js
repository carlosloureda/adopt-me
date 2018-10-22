import { Component } from "react";
import { createPortal } from "react-dom";

export class Modal extends Component {
  constructor(props) {
    super(props);
  }
  //In Node won´t be called as it is browser context
  componentDidMount() {
    this.el = document.createElement("div");
    this.modalRoot = document.getElementById("modal");
    this.modalRoot.appendChild(this.el);
  }
  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
  }
  render() {
    return createPortal(this.props.children, this.el);
  }
}

export default Modal;
