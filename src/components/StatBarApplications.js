import React, { Component } from 'react';
import StatBarBarGraph from './StatBarBarGraph';

class StatBarApplications extends Component {

  // RENDER OF COMPONENT
  render() {
    return (
      <div className="statBarBlock">
        <h5>Applications</h5>
        {Object.keys(this.props.statApplications).map(key =>
          <StatBarBarGraph
            key={key}
            barIndex={key}
            details={this.props.statApplications[key]}/>
        )}
      </div>
    );
  }

}

export default StatBarApplications;
