import isDomValid from "helpers/isDomValid";
import React from "react";
import ReactDOM from "react-dom";

export interface PortalProps {
  children: React.ReactNode;
}

var blluPortal: HTMLDivElement;

export class Portal extends React.Component<PortalProps> {
  container: HTMLDivElement;

  constructor(props: PortalProps | Readonly<PortalProps>) {
    super(props);

    if (!isDomValid) return;

    blluPortal =
      blluPortal ||
      (document.getElementById("bllu-portal") as HTMLDivElement);

    if (!blluPortal) {
      blluPortal = document.createElement("div");
      blluPortal.setAttribute("id", "bllu-portal");
      document.body.appendChild(blluPortal);
    }

    this.container = document.createElement("div");
    blluPortal.appendChild(this.container);
  }

  componentWillUnmount() {
    if (isDomValid && this.container)
      blluPortal.removeChild(this.container);
  }

  render() {
    if (!isDomValid) return null;
    return ReactDOM.createPortal(this.props.children, this.container);
  }
}
