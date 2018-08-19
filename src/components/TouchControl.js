import React, { Component } from 'react';

class TouchControl extends Component {

  // RENDER OF COMPONENT
  render() {
    return (
      <div id="touchControl">
        <div data-name="left" onTouchStart={this.handleTouch}>
          <i className="fas fa-arrow-alt-circle-left"></i>
        </div>
        <div data-name="right" onTouchStart={this.handleTouch}>
          <i className="fas fa-arrow-alt-circle-right"></i>
        </div>
      </div>
    );
  }

  // FUNCTION THAT HANDLES TOUCH EVENT FOR THE BUTTONS
  // - These buttons cater for touch devices.
  handleTouch = (e) => {
    // console.log('handleTouch');
    const app = document.querySelector('#app');
    let scrollDirection = e.currentTarget.dataset.name;
    if (scrollDirection === 'left') {
      scrollDirection = false;
    } else if (scrollDirection === 'right') {
      scrollDirection = true;
    } else {
      return;
    };
    this.props.scrollAnimate(app, scrollDirection)
  };

}

export default TouchControl;
