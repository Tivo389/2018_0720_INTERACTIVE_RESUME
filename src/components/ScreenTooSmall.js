import React, { Component } from 'react';

class ScreenTooSmall extends Component {

  // RENDER OF COMPONENT
  render() {
    return (
      <div id="screenTooSmall">
        <div>
          <p>Everything doesn't need to be mobile in our busy life.</p>
          <p>Take a seat, relax, and enjoy this on a bigger screen.</p>
        </div>
        <img src={require('../images/screenTooSmall.svg')} alt="Screen too small"/>
      </div>
    );
  }

}

export default ScreenTooSmall;
