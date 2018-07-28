import React, { Component } from 'react';

class LoadingTimeline extends Component {

  // RENDER OF COMPONENT
  render() {
    return (
      <div
        id="loadingTimeline"
        style={{ transform:`scaleX(${this.props.loadingProgress})` }}>
      </div>
    );
  }

}

export default LoadingTimeline;
