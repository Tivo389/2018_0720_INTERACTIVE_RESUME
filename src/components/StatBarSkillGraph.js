import React, { Component } from 'react';
import StatBarBarGraph from './StatBarBarGraph';

class StatBarSkillGraph extends Component {

  // RENDER OF COMPONENT
  render() {
    return (
      <div className="statBarBlock">
        <h6>{this.props.title}</h6>
        {Object.keys(this.props.stat).map(key =>
          <StatBarBarGraph
            key={key}
            barIndex={key}
            details={this.props.stat[key]}/>
        )}
      </div>
    );
  }

}

export default StatBarSkillGraph;