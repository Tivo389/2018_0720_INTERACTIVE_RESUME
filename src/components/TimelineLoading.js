import React, { Component } from 'react';

class LoadingTimeline extends Component {

  // RENDER OF COMPONENT
  render() {
    const isActive = this.props.timelineActive;
    const scaleValue = isActive ? 1 : this.props.loadingStat;
    return (
      <div
        id="loadingTimeline"
        style={{ transform:`scaleX(${scaleValue})` }}>
      </div>
    );
  }

}

export default LoadingTimeline;
