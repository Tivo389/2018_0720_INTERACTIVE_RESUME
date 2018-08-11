import React, { Component } from 'react';

class LoadingStatBar extends Component {

  // RENDER OF COMPONENT
  render() {
    const isActive = this.props.activeStatBar;
    const loadProgress = isActive ? 1 : this.props.loadProgress;
    return (
      <div
        id="loadingStatBar"
        style={{ transform:`scaleX(${loadProgress})` }}>
      </div>
    );
  }

}

export default LoadingStatBar;
