import React, { Component } from 'react';
import StatBarRadarGraph from './StatBarRadarGraph';
import StatBarSkillGraph from './StatBarSkillGraph';
import StatBarTools from './StatBarTools';

class StatBar extends Component {

  // RENDER OF COMPONENT
  render() {
    const isActive = this.props.activeStatBar;
    const classValue = isActive ? 'statBar active' : 'statBar';
    const jData = this.props.database;
    const jNum = `j${this.props.currentJourneySlideNum}`;
    const radarPoints = jData[jNum].stats.radar;
    const statTools = jData[jNum].stats.tools;
    return (
      <div
        id="statBar"
        className={classValue}>
        <StatBarRadarGraph radarPoints={radarPoints}/>
        <StatBarSkillGraph
          title="Coding"
          path="codes"
          j={jData[jNum]}/>
        <StatBarSkillGraph
          title="Applications"
          path="apps"
          j={jData[jNum]}/>
        <StatBarTools statTools={statTools}/>
      </div>
    );
  }

}

export default StatBar;
