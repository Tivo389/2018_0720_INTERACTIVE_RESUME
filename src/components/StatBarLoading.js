import React, { Component } from 'react';

class LoadingStatBar extends Component {

  // RENDER OF COMPONENT
  render() {
    const isActive = this.props.statBarActive;
    const scaleValue = isActive ? 1 : this.props.loadingStat;
    return (
      <div
        id="loadingStatBar"
        style={{ transform:`scaleX(${scaleValue})` }}>
      </div>
    );
  }

}

export default LoadingStatBar;
