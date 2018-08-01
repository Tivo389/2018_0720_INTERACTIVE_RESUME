import React, { Component } from 'react';
import Snap from 'snapsvg-cjs';

class StatBarRadarGraph extends Component {

  // PROPERTIES OF COMPONENT
  svg = null;
  snap = null;
  mina = null;
  rPath = null;

  // LIFECYCLE METHODS
  componentDidMount() {
    const object = document.querySelector("#radarGraphObject");
    object.addEventListener("load", () => {
      this.svg = object.contentDocument.querySelector("#radarGraphSvg");
      this.snap = Snap(this.svg);
      this.mina = window.mina;
    });
  }
  componentWillUpdate() {
    this.rPath = this.snap.select('#radarLine');
    const rPoints = this.props.radarPoints;
    const radarAnimate = () => {
      this.rPath.animate({points:rPoints}, 300, this.mina.bounce);
    }
    radarAnimate();
  }

  // RENDER OF COMPONENT
  render() {
    return (
      <div className="radarGraphContainer">
        <p className="top">Front-end</p>
        <object
          id="radarGraphObject"
          data={require('../images/radarGraph.svg')}
          type="image/svg+xml"
          alt="Radar graph of skillset">
        </object>
        <div>
          <p className="bl">Graphic Design</p>
          <p className="br">UI & UX</p>
        </div>
      </div>
    );
  }

}

export default StatBarRadarGraph;
