import isDomValid from "helpers/isDomValid";
import React, { useEffect, useRef } from "react";
import ReactDOM, { render } from "react-dom";

export interface PortalProps {
  children: React.ReactNode;
}

var blluPortal: HTMLDivElement;

export class Portal extends React.Component {
  container: HTMLDivElement;

  constructor(props: {} | Readonly<{}>) {
    super(props);

    if (!isDomValid) return;

    if (!blluPortal) {
      blluPortal = document.createElement("div");
      blluPortal.setAttribute("id", "bllu-portal");
      document.body.appendChild(blluPortal);
    }

    this.container = document.createElement("div");
    blluPortal.appendChild(this.container);
  }

  // useEffect(() => {
  //   if (isDomValid) {
  //     if (!blluPortal) {
  //       blluPortal = document.createElement("div");
  //       blluPortal.setAttribute("id", "bllu-portal");
  //       document.body.appendChild(blluPortal);
  //     }

  //     portalRef.current = document.createElement("div");
  //     blluPortal.appendChild(portalRef.current);
  //   }

  //   return () => {
  //     if (isDomValid && portalRef.current) {
  //       blluPortal.removeChild(portalRef.current);
  //     }
  //   };
  // }, []);

  componentWillUnmount() {
    if (isDomValid && this.container)
      blluPortal.removeChild(this.container);
  }

  render() {
    if (!isDomValid) return null;
    return ReactDOM.createPortal(this.props.children, this.container);
  }
}
