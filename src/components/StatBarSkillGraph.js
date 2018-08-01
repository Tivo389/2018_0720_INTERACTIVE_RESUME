import React, { Component } from 'react';
import StatBarBarGraph from './StatBarBarGraph';

class StatBarSkillGraph extends Component {

  // RENDER OF COMPONENT
  render() {
    const {j, path, title} = this.props;
    return (
      <div className="statBarBlock">
        <h6>{title}</h6>
        {
          Object.keys(j.stats[path]).map(key =>
            <StatBarBarGraph
              key={key}
              barIndex={key}
              details={j.stats[path][key]}/>
          )
        }
      </div>
    );
  }

}

export default StatBarSkillGraph;
