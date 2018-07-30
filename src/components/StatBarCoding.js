import React, { Component } from 'react';
import StatBarBarGraph from './StatBarBarGraph';

class StatBarCoding extends Component {

  // RENDER OF COMPONENT
  render() {
    return (
      <div className="statBarBlock">
        <h5>Coding</h5>
        {Object.keys(this.props.statCoding).map(key =>
          <StatBarBarGraph
            key={key}
            barIndex={key}
            details={this.props.statCoding[key]}/>
        )}
      </div>
    );
  }

}

export default StatBarCoding;
