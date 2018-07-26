import React, { Component } from 'react';

class LoadingStatBar extends Component {

  // RENDER OF COMPONENT
  render() {
    return (
      <div
        id="loadingStatBar"
        style={{ transform:`scaleX(${this.props.loadingProgress})` }}>
      </div>
    );
  }

}

export default LoadingStatBar;
