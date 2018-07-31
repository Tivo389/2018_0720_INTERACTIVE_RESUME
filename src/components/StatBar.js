import React, { Component } from 'react';
import StatBarRadarGraph from './StatBarRadarGraph';
import StatBarSkillGraph from './StatBarSkillGraph';
import StatBarTools from './StatBarTools';

class StatBar extends Component {

  // RENDER OF COMPONENT
  render() {
    const isActive = this.props.statBarActive;
    const classValue = isActive ? 'active' : '';
    return (
      <div id="statBar" className={ classValue }>
        <StatBarRadarGraph/>
        <StatBarSkillGraph title="Coding" stat={this.props.statCoding}/>
        <StatBarSkillGraph title="Applications" stat={this.props.statApplications}/>
        <StatBarTools statTools={this.props.statTools}/>
      </div>
    );
  }

}

export default StatBar;
