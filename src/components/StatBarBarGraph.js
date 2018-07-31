import React, { Component } from 'react';

class StatBarBarGraph extends Component {

  // RENDER OF COMPONENT
  render() {
    return (
      <div className="barGraphWrapper">
        <p className="barTitle">{this.props.details.appName}</p>
        <div className="barGraph">
          <div
            className="barWhite"
            style={{ maxWidth: `${this.props.details.appStat}%` }}>
          </div>
          <div className="barDark"></div>
        </div>
      </div>
    );
  }

}

export default StatBarBarGraph;
