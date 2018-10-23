import { Component } from "react";
import { createPortal } from "react-dom";

export class Modal extends Component {
  private el: HTMLDivElement | null = null;
  private modalRoot: HTMLElement | null = null;

  constructor(props: any) {
    super(props);
  }
  // In Node won´t be called as it is browser context
  public componentDidMount() {
    this.el = document.createElement("div");
    this.modalRoot = document.getElementById("modal");
    if (this.modalRoot) {
      this.modalRoot.appendChild(this.el);
    }
  }
  public componentWillUnmount() {
    if (this.modalRoot && this.el) {
      this.modalRoot.removeChild(this.el);
    }
  }
  public render() {
    if (this.el) {
      return createPortal(this.props.children, this.el);
    }
  }
}

export default Modal;
