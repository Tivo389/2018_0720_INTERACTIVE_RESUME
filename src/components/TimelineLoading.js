import React, { Component } from 'react';

class LoadingTimeline extends Component {

  // RENDER OF COMPONENT
  render() {
    const isActive = this.props.activeTimeline;
    const loadProgress = isActive ? 1 : this.props.loadProgress;
    return (
      <div
        id="loadingTimeline"
        style={{ transform:`scaleX(${loadProgress})` }}>
      </div>
    );
  }

}

export default LoadingTimeline;
