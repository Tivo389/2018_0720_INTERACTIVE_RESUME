import React, { Component } from 'react';
import Snap from 'snapsvg-cjs';

class StatBarRadarGraph extends Component {

  // LIFECYCLE METHODS
  componentDidMount() {
    const object = document.querySelector("#radarGraphObject");
    object.addEventListener("load", () => {
      const svg = object.contentDocument.querySelector("#radarGraphSvg");
      const snap = Snap(svg);
      const mina = window.mina;
      const rPath = snap.select('#radarLine');
      const rPoints = rPath.node.getAttribute('points');
      const s1Tos2 = function() {
        rPath.animate({ points: '90.2 0 179.68 156.82 .531 156.82' }, 1000, mina.bounce, s2Tos1);
      }
      const s2Tos1 = function() {
        rPath.animate({ points: '90.58 25.748 133.689 128.636 .531 155.82' }, 1000, mina.bounce, s1Tos2);
      }
      s1Tos2();
    });
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
