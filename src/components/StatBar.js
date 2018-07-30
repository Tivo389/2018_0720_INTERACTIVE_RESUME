import React, { Component } from 'react';
import StatBarRadarGraph from './StatBarRadarGraph';
import StatBarApplications from './StatBarApplications';
import StatBarCoding from './StatBarCoding';
import StatBarTools from './StatBarTools';

class StatBar extends Component {

  // RENDER OF COMPONENT
  render() {
    const isActive = this.props.statBarActive;
    const classValue = isActive ? 'active' : '';
    return (
      <div id="statBar" className={ classValue }>
        <StatBarRadarGraph/>
        <StatBarCoding statCoding={this.props.statCoding}/>
        <StatBarApplications statApplications={this.props.statApplications}/>
        <StatBarTools statTools={this.props.statTools}/>
      </div>
    );
  }

}

export default StatBar;
